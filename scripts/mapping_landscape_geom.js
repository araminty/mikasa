/**
 * Shared Mikasa landscape map geometry (Node + browser).
 * Browser: MappingLandscapeGeom factory(THREE)
 * Node: module.exports = factory(require('three'))
 */
(function (root, factory) {
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = factory(require('three'));
  } else {
    root.MappingLandscapeGeom = factory(root.THREE);
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function (THREE) {
  const SHAPE_SEED = 0x4d494b4153;
  const LANDSCAPE_ARC_DEG = 10;
  const LANDSCAPE_SIZE = 22;
  const LANDSCAPE_SEGMENTS = 36;
  const SURFACE_Z = 0;
  const LAYER_DEPTH = 1.15;
  const SPHEROIDS_PER_DISTRICT = 6;
  const TUBE_RADIUS = 0.1;

  const DISTRICT_LAYOUT = [
    { x: 0, y: 0, layer: 0, role: 'surface', seed: SHAPE_SEED + 10, spread: 1.85, radius: 1.02 },
    { x: -3.2, y: 2.1, layer: 1, role: 'outer', seed: SHAPE_SEED + 20, spread: 1.55, radius: 0.86 },
    { x: 3.0, y: 2.0, layer: 1, role: 'outer', seed: SHAPE_SEED + 30, spread: 1.55, radius: 0.86 },
    { x: -2.8, y: -2.2, layer: 1, role: 'outer', seed: SHAPE_SEED + 40, spread: 1.55, radius: 0.86 },
    { x: 1.2, y: -0.4, layer: 2, role: 'inner', seed: SHAPE_SEED + 50, spread: 1.35, radius: 0.76 },
    { x: -0.8, y: 1.0, layer: 2, role: 'inner', seed: SHAPE_SEED + 60, spread: 1.35, radius: 0.76 },
    { x: 9.8, y: -4.6, layer: 2, role: 'separated', seed: SHAPE_SEED + 70, spread: 1.45, radius: 0.8 },
  ];

  const STRAIGHT_CONNECTIONS = [
    [0, 1], [0, 2], [0, 3], [0, 4], [0, 5],
    [1, 5], [2, 4], [3, 4], [2, 3], [1, 3],
  ];

  const KINKED_CONNECTION = { from: 0, to: 6, seed: SHAPE_SEED + 220, waypoints: 5 };

  function mulberry32(seed) {
    return function () {
      seed |= 0;
      seed = (seed + 0x6d2b79f5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function buildShapeNoise(vertexCount, seed) {
    const rng = mulberry32(seed);
    const noise = new Array(vertexCount);
    for (let i = 0; i < vertexCount; i++) {
      noise[i] = 0.8 + rng() * 0.05;
    }
    return noise;
  }

  function distortLumpySphere(geometry, seed) {
    const position = geometry.attributes.position;
    const noise = buildShapeNoise(position.count, seed);
    for (let i = 0; i < position.count; i++) {
      const n = noise[i];
      position.setXYZ(
        i,
        position.getX(i) * n * 1.18,
        position.getY(i) * n * 1.12,
        position.getZ(i) * n * 1.08
      );
    }
    position.needsUpdate = true;
    geometry.computeBoundingSphere();
    return geometry;
  }

  const arcRad = (LANDSCAPE_ARC_DEG * Math.PI) / 180;
  const curveRadius = LANDSCAPE_SIZE / arcRad;

  function createLandscapeHeightFn(seed) {
    const bumpRng = mulberry32(seed + 91);
    return function landscapeHeight(x, y) {
      const bump =
        (bumpRng() - 0.5) * 0.35 +
        Math.sin(x * 0.55 + y * 0.31) * 0.22 +
        Math.cos(x * 0.23 - y * 0.47) * 0.18;
      const curveDrop = (x * x + y * y) / (2 * curveRadius);
      return SURFACE_Z - curveDrop + bump;
    };
  }

  function createLandscapeGeometry(landscapeHeight) {
    const half = LANDSCAPE_SIZE * 0.5;
    const seg = LANDSCAPE_SEGMENTS;
    const positions = [];
    const indices = [];

    for (let iy = 0; iy <= seg; iy++) {
      for (let ix = 0; ix <= seg; ix++) {
        const x = -half + (ix / seg) * LANDSCAPE_SIZE;
        const y = -half + (iy / seg) * LANDSCAPE_SIZE;
        const z = landscapeHeight(x, y);
        positions.push(x, y, z);
      }
    }

    for (let iy = 0; iy < seg; iy++) {
      for (let ix = 0; ix < seg; ix++) {
        const a = iy * (seg + 1) + ix;
        const b = a + 1;
        const c = a + (seg + 1);
        const d = c + 1;
        indices.push(a, c, b, b, c, d);
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    return geometry;
  }

  function isOnUnionExterior(point, spheroids) {
    let shellHits = 0;
    let coreHits = 0;
    for (let i = 0; i < spheroids.length; i++) {
      const s = spheroids[i];
      const d = point.distanceTo(s.center);
      if (d < s.radius * 0.82) coreHits++;
      if (d >= s.radius * 0.62 && d <= s.radius * 1.06) shellHits++;
    }
    return shellHits > 0 && coreHits <= 1;
  }

  function mergeSpheroidCluster(spheroidSpecs, seedBase) {
    const spheroids = [];
    const parts = [];
    const matrix = new THREE.Matrix4();
    const vertex = new THREE.Vector3();
    const centroid = new THREE.Vector3();

    for (let i = 0; i < spheroidSpecs.length; i++) {
      const spec = spheroidSpecs[i];
      const geom = distortLumpySphere(
        new THREE.IcosahedronGeometry(spec.radius, 1),
        seedBase + i * 131
      );
      matrix.makeTranslation(spec.x, spec.y, spec.z);
      geom.applyMatrix4(matrix);
      spheroids.push({
        center: new THREE.Vector3(spec.x, spec.y, spec.z),
        radius: spec.radius * 1.06,
      });
      parts.push(geom);
    }

    const kept = [];
    for (let p = 0; p < parts.length; p++) {
      const pos = parts[p].attributes.position;
      for (let t = 0; t < pos.count; t += 3) {
        centroid.set(0, 0, 0);
        for (let j = 0; j < 3; j++) {
          vertex.fromBufferAttribute(pos, t + j);
          centroid.add(vertex);
        }
        centroid.multiplyScalar(1 / 3);
        if (!isOnUnionExterior(centroid, spheroids)) continue;
        for (let j = 0; j < 3; j++) {
          vertex.fromBufferAttribute(pos, t + j);
          kept.push(vertex.x, vertex.y, vertex.z);
        }
      }
      parts[p].dispose();
    }

    const merged = new THREE.BufferGeometry();
    merged.setAttribute('position', new THREE.Float32BufferAttribute(kept, 3));
    merged.computeBoundingSphere();
    return merged;
  }

  function defaultSpheroidLayout(seed, spread, radius) {
    const rng = mulberry32(seed);
    const specs = [];
    const offsetXY = spread * 0.82;
    const offsetZ = spread * 0.22;
    for (let i = 0; i < SPHEROIDS_PER_DISTRICT; i++) {
      specs.push({
        x: (rng() - 0.5) * offsetXY,
        y: (rng() - 0.5) * offsetXY,
        z: (rng() - 0.5) * offsetZ,
        radius: radius * (0.76 + rng() * 0.42),
      });
    }
    return specs;
  }

  function meshMaxZ(geometry) {
    const pos = geometry.attributes.position;
    let maxZ = -Infinity;
    for (let i = 0; i < pos.count; i++) {
      maxZ = Math.max(maxZ, pos.getZ(i));
    }
    return maxZ;
  }

  function positionsFromGeometry(geometry) {
    return Array.from(geometry.attributes.position.array);
  }

  function createStraightTubeGeometry(from, to, radius) {
    const dir = new THREE.Vector3().subVectors(to, from);
    if (dir.length() < 1e-4) return null;
    const curve = new THREE.LineCurve3(from, to);
    return new THREE.TubeGeometry(curve, 1, radius, 5, false);
  }

  function createKinkedTubeGeometry(from, to, seed, waypointCount, radius) {
    const rng = mulberry32(seed);
    const points = [from.clone()];
    for (let i = 1; i <= waypointCount; i++) {
      const t = i / (waypointCount + 1);
      const point = from.clone().lerp(to, t);
      point.x += (rng() - 0.5) * 2.6;
      point.y += (rng() - 0.5) * 2.6;
      point.z += (rng() - 0.5) * 0.55;
      points.push(point);
    }
    points.push(to.clone());
    const curve = new THREE.CatmullRomCurve3(points);
    return new THREE.TubeGeometry(curve, 18, radius, 5, false);
  }

  function districtWorldCenter(mesh) {
    if (!mesh.geometry.boundingSphere) mesh.geometry.computeBoundingSphere();
    const center = mesh.geometry.boundingSphere.center.clone();
    return mesh.localToWorld(center);
  }

  /** Build serializable vertex data for the landscape map. */
  function buildLandscapeMapData() {
    const landscapeHeight = createLandscapeHeightFn(SHAPE_SEED);
    const landscapeGeometry = createLandscapeGeometry(landscapeHeight);
    const landscapeWireframe = new THREE.WireframeGeometry(landscapeGeometry);
    landscapeGeometry.dispose();

    const mapGroup = new THREE.Group();
    mapGroup.rotation.x = -0.42;

    const districtRecords = [];
    const districtMeshes = [];

    for (let d = 0; d < DISTRICT_LAYOUT.length; d++) {
      const layout = DISTRICT_LAYOUT[d];
      const specs = defaultSpheroidLayout(layout.seed, layout.spread, layout.radius);
      const geometry = mergeSpheroidCluster(specs, layout.seed);
      const mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial());
      mesh.userData.districtIndex = d;
      mesh.name = 'district_' + (d + 1);

      const surfaceHere = landscapeHeight(layout.x, layout.y);
      let posZ;
      if (layout.role === 'surface') {
        posZ = surfaceHere - meshMaxZ(geometry);
      } else {
        posZ = surfaceHere - LAYER_DEPTH * layout.layer - layout.radius * 0.85;
      }

      mesh.position.set(layout.x, layout.y, posZ);
      mapGroup.add(mesh);
      districtMeshes.push(mesh);

      districtRecords.push({
        name: mesh.name,
        index: d,
        position: [layout.x, layout.y, posZ],
        positions: positionsFromGeometry(geometry),
      });
      geometry.dispose();
    }

    mapGroup.updateMatrixWorld(true);

    const districtCenters = districtMeshes.map(districtWorldCenter).map(function (v) {
      return [v.x, v.y, v.z];
    });

    const straightTubes = [];
    for (let i = 0; i < STRAIGHT_CONNECTIONS.length; i++) {
      const pair = STRAIGHT_CONNECTIONS[i];
      const from = new THREE.Vector3().fromArray(districtCenters[pair[0]]);
      const to = new THREE.Vector3().fromArray(districtCenters[pair[1]]);
      const tubeGeometry = createStraightTubeGeometry(from, to, TUBE_RADIUS);
      if (tubeGeometry) {
        straightTubes.push({ positions: positionsFromGeometry(tubeGeometry) });
        tubeGeometry.dispose();
      }
    }

    const kinkFrom = new THREE.Vector3().fromArray(districtCenters[KINKED_CONNECTION.from]);
    const kinkTo = new THREE.Vector3().fromArray(districtCenters[KINKED_CONNECTION.to]);
    const kinkedGeometry = createKinkedTubeGeometry(
      kinkFrom,
      kinkTo,
      KINKED_CONNECTION.seed,
      KINKED_CONNECTION.waypoints,
      TUBE_RADIUS
    );
    const kinkedTube = { positions: positionsFromGeometry(kinkedGeometry) };
    kinkedGeometry.dispose();

    for (let i = 0; i < districtMeshes.length; i++) {
      districtMeshes[i].geometry.dispose();
    }

    return {
      version: 1,
      seed: SHAPE_SEED,
      landscape: { positions: positionsFromGeometry(landscapeWireframe) },
      districts: districtRecords,
      districtCenters: districtCenters,
      straightTubes: straightTubes,
      kinkedTube: kinkedTube,
    };
  }

  return {
    SHAPE_SEED: SHAPE_SEED,
    DISTRICT_LAYOUT: DISTRICT_LAYOUT,
    buildLandscapeMapData: buildLandscapeMapData,
  };
});
