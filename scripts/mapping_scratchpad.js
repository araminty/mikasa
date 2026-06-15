// Creates a rough sphere with 20 triangular faces
const baseGeometry = new THREE.IcosahedronGeometry(radius, 1); 

const positionAttribute = geometry.attributes.position;

for (let i = 0; i < positionAttribute.count; i++) {
    // 1. Get the current x, y, z coordinates of the vertex
    let x = positionAttribute.getX(i);
    let y = positionAttribute.getY(i);
    let z = positionAttribute.getZ(i);

    // 2. Generate a small, deterministic random modifier (e.g., between 0.8 and 1.2)
    // For a more natural look, you would use a math library like Perlin Noise here
    let noise = 0.8 + Math.random() * 0.4; 

    // 3. Multiply the coordinates to distort the sphere into a lump
    positionAttribute.setXYZ(i, x * noise, y * noise, z * noise);
}

const wireframeMaterial = new THREE.MeshBasicMaterial({
    color: 0x00ff00,    // Green wireframe
    wireframe: true     // This single line converts the lump to a wireframe
});


// 1. Target the HTML container
const container = document.getElementById('asteroid-map-container');
const width = container.clientWidth;
const height = container.clientHeight;

// 2. Create the Scene (The 3D Space)
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000); // Black background for space

// 3. Create the Camera (Perspective View)
// Fields: Field of View (75 deg), Aspect Ratio, Near Clip, Far Clip
const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
// Move the camera back on the Z-axis so it isn't sitting inside the asteroid
camera.position.set(0, 0, 10); 

// 4. Create the WebGL Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
// Inject the automatically generated <canvas> element into your container div
container.appendChild(renderer.domElement);

// 5. Build your wireframe material
const wireframeMaterial = new THREE.MeshBasicMaterial({
    color: 0x00ff00, // Classic retro green wireframe
    wireframe: true
});

// 6. ADD GEOMETRIES (Insert your procedural shape logic here)
// Make the main outer asteroid
const asteroidGeom = new THREE.IcosahedronGeometry(4, 1); 
/* ... Apply your noise loop here to distort asteroidGeom vertices ... */
const asteroidMesh = new THREE.Mesh(asteroidGeom, wireframeMaterial);
scene.add(asteroidMesh);

// Make one of your districts
const district1Geom = new THREE.IcosahedronGeometry(1, 1);
/* ... Apply your noise loop here to distort district1Geom vertices ... */
const district1Mesh = new THREE.Mesh(district1Geom, wireframeMaterial);
district1Mesh.position.set(-1.5, 1, 0); // Position it within the asteroid shell
scene.add(district1Mesh);

// [Repeat for districts 2 through 7 with different positions]

// 7. DISPLAY THE IMAGE
// This single line takes a snapshot of the 3D scene and draws it to the screen
renderer.render(scene, camera);


// Convert the rendered canvas frame to a base64 PNG URL
const imgDataUrl = renderer.domElement.toDataURL("image/png");

// Now you can feed 'imgDataUrl' into a standard HTML <img> tag src attribute
document.getElementById('my-static-map-image').src = imgDataUrl;


const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();


const districtsArray = [district1Mesh, district2Mesh, district3Mesh /* ... up to 7 */];


window.addEventListener('click', onMouseClick, false);

function onMouseClick(event) {
    // 1. Calculate mouse position in normalized device coordinates (-1 to +1)
    // This maps the pixel coordinates to Three.js's 3D coordinate system
    const rect = renderer.domElement.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    // 2. Point the raycaster laser from the camera to the mouse position
    raycaster.setFromCamera(mouse, camera);

    // 3. Calculate objects intersecting the picking ray
    // Setting the second parameter to 'true' ensures it checks deep inside groups
    const intersects = raycaster.intersectObjects(districtsArray, true);

    // 4. Check if we hit anything
    if (intersects.length > 0) {
        // The first object in the array is always the closest one hit
        const clickedDistrict = intersects[0].object;
        
        console.log("You clicked a district!", clickedDistrict);
        
        // Example action: Trigger a specific function based on the mesh name
        handleDistrictSelection(clickedDistrict.name);
    }
}
