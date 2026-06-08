(function() {
  var game;
  var ui;

  var DateOptions = {hour: 'numeric',
                 minute: 'numeric',
                 second: 'numeric',
                 year: 'numeric',
                 month: 'short',
                 day: 'numeric' };

  function sanitizeForJson(value) {
    try {
      JSON.stringify(value);
      return value;
    } catch (e) {
      return undefined;
    }
  }

  function qualitiesForSave(qualities) {
    var out = {};
    var key;
    for (key in qualities) {
      if (!Object.prototype.hasOwnProperty.call(qualities, key)) { continue; }
      if (typeof qualities[key] === 'function') { continue; }
      var v = sanitizeForJson(qualities[key]);
      if (v !== undefined) { out[key] = v; }
    }
    return out;
  }

  function getSerializableState(engine) {
    var state = engine.getExportableState();
    var copy = {};
    var key;
    for (key in state) {
      if (!Object.prototype.hasOwnProperty.call(state, key)) { continue; }
      if (key === 'qualities') {
        copy.qualities = qualitiesForSave(state.qualities);
        continue;
      }
      var v = sanitizeForJson(state[key]);
      if (v !== undefined) { copy[key] = v; }
    }
    return copy;
  }

  function stringifyGameState(engine) {
    return JSON.stringify(getSerializableState(engine));
  }

  function formatExportJson(raw) {
    return JSON.stringify(JSON.parse(raw), null, 2);
  }

  function exportFilename(slot) {
    var ts = localStorage[ui.save_prefix + '_timestamp_' + slot];
    var scene = 'save';
    if (ts) {
      var line = ts.split('\n')[0];
      if (line) {
        scene = line.replace(/[^\w.-]+/g, '_').replace(/_+/g, '_').replace(/^_|_$/g, '');
      }
    }
    if (!scene) { scene = 'save'; }
    return 'mikasa-' + scene + '-' + slot + '.json';
  }

  function mikasaBootstrapAfterLoad() {
    window.justLoaded = true;
    if (typeof Q === 'undefined') { return; }
    Q.mikasa_restore_scene = ui.dendryEngine.state.sceneId;
    ui.dendryEngine.goToScene('setup_functions');
  }

  var main = function(dendryUI) {
    ui = dendryUI;
    game = ui.game;

    ui.autosave = function() {
      var oldData = localStorage[ui.save_prefix + '_a0'];
      if (oldData) {
        localStorage[ui.save_prefix + '_a1'] = oldData;
        localStorage[ui.save_prefix + '_timestamp_a1'] =
            localStorage[ui.save_prefix + '_timestamp_a0'];
      }
      var slot = 'a0';
      try {
        localStorage[ui.save_prefix + '_' + slot] = stringifyGameState(ui.dendryEngine);
      } catch (e) {
        console.error('autosave failed', e);
        return;
      }
      var scene = ui.dendryEngine.state.sceneId;
      var date = new Date(Date.now());
      date = scene + '\n(' + date.toLocaleString(undefined, ui.DateOptions) + ')';
      localStorage[ui.save_prefix + '_timestamp_' + slot] = date;
      ui.populateSaveSlots(slot + 1, 2);
    };

    ui.quickSave = function() {
      try {
        localStorage[ui.save_prefix + '_q'] = stringifyGameState(ui.dendryEngine);
      } catch (e) {
        console.error('quickSave failed', e);
        window.alert('Save failed.');
        return;
      }
      window.alert('Saved.');
    };

    ui.saveSlot = function(slot) {
      try {
        localStorage[ui.save_prefix + '_' + slot] = stringifyGameState(ui.dendryEngine);
      } catch (e) {
        console.error('saveSlot failed', e);
        window.alert('Save failed.');
        return;
      }
      var scene = ui.dendryEngine.state.sceneId;
      var date = new Date(Date.now());
      date = scene + '\n(' + date.toLocaleString(undefined, ui.DateOptions) + ')';
      localStorage[ui.save_prefix + '_timestamp_' + slot] = date;
      ui.populateSaveSlots(slot + 1, 2);
    };

    ui.quickLoad = function() {
      if (localStorage[ui.save_prefix + '_q']) {
        window.justLoaded = true;
        var saveString = localStorage[ui.save_prefix + '_q'];
        ui.dendryEngine.setState(JSON.parse(saveString));
        mikasaBootstrapAfterLoad();
        window.alert('Loaded.');
      } else {
        window.alert('No save available.');
      }
    };

    ui.loadSlot = function(slot) {
      if (localStorage[ui.save_prefix + '_' + slot]) {
        window.justLoaded = true;
        var saveString = localStorage[ui.save_prefix + '_' + slot];
        ui.dendryEngine.setState(JSON.parse(saveString));
        mikasaBootstrapAfterLoad();
        ui.hideSaveSlots();
        window.alert('Loaded.');
      } else {
        window.alert('No save available.');
      }
    };

    ui.importSave = function(doc_id) {
      var that = ui;
      function onFileLoad(e) {
        window.justLoaded = true;
        var data = e.target.result;
        that.dendryEngine.setState(JSON.parse(data));
        mikasaBootstrapAfterLoad();
        that.hideSaveSlots();
        window.alert('Loaded.');
      }
      var uploader = document.getElementById(doc_id);
      var reader = new FileReader();
      var file = uploader.files[0];
      reader.onload = onFileLoad;
      reader.readAsText(file);
    };

    ui.exportSlot = function(slot) {
      var key = ui.save_prefix + '_' + slot;
      if (!localStorage[key]) {
        window.alert('No save available.');
        return;
      }
      var data;
      try {
        data = formatExportJson(localStorage[key]);
      } catch (e) {
        console.error('exportSlot failed', e);
        window.alert('Export failed.');
        return;
      }
      var a = document.createElement('a');
      var file = new Blob([data], {type: 'application/json'});
      a.href = URL.createObjectURL(file);
      a.download = exportFilename(slot);
      a.click();
      URL.revokeObjectURL(a.href);
    };
  };

  var TITLE = "Mikasa Democracy: A future history" + '_' + "Araminty Whitesell";

  // the url is a link to game.json
  // test url: https://aucchen.github.io/social_democracy_mods/v0.1.json
  // TODO; 
  window.loadMod = function(url) {
      ui.loadGame(url);
  };

  window.showStats = function() {
    if (window.dendryUI.dendryEngine.state.sceneId.startsWith('library')) {
        window.dendryUI.dendryEngine.goToScene('backSpecialScene');
    } else {
        window.dendryUI.dendryEngine.goToScene('library');
    }
  };

  window.showDistrictMap = function() {
    if (window.dendryUI.dendryEngine.state.sceneId.startsWith('district_map')) {
        window.dendryUI.dendryEngine.goToScene('backSpecialScene');
    } else {
        window.dendryUI.dendryEngine.goToScene('district_map');
    }
  };

  window.showMods = function() {
    window.hideOptions();
    if (window.dendryUI.dendryEngine.state.sceneId.startsWith('mod_loader')) {
        window.dendryUI.dendryEngine.goToScene('backSpecialScene');
    } else {
        window.dendryUI.dendryEngine.goToScene('mod_loader');
    }
  };
  
  window.showOptions = function() {
      var save_element = document.getElementById('options');
      window.populateOptions();
      save_element.style.display = "block";
      if (!save_element.onclick) {
          save_element.onclick = function(evt) {
              var target = evt.target;
              var save_element = document.getElementById('options');
              if (target == save_element) {
                  window.hideOptions();
              }
          };
      }
  };

  window.hideOptions = function() {
      var save_element = document.getElementById('options');
      save_element.style.display = "none";
  };

  window.disableBg = function() {
      window.dendryUI.disable_bg = true;
      document.body.style.backgroundImage = 'none';
      window.dendryUI.saveSettings();
  };

  window.enableBg = function() {
      window.dendryUI.disable_bg = false;
      window.dendryUI.setBg(window.dendryUI.dendryEngine.state.bg);
      window.dendryUI.saveSettings();
  };

  window.disableAnimate = function() {
      window.dendryUI.animate = false;
      window.dendryUI.saveSettings();
  };

  window.enableAnimate = function() {
      window.dendryUI.animate = true;
      window.dendryUI.saveSettings();
  };

  window.disableAnimateBg = function() {
      window.dendryUI.animate_bg = false;
      window.dendryUI.saveSettings();
  };

  window.enableAnimateBg = function() {
      window.dendryUI.animate_bg = true;
      window.dendryUI.saveSettings();
  };

  window.disableAudio = function() {
      window.dendryUI.toggle_audio(false);
      window.dendryUI.saveSettings();
  };

  window.enableAudio = function() {
      window.dendryUI.toggle_audio(true);
      window.dendryUI.saveSettings();
  };

  window.enableImages = function() {
      window.dendryUI.show_portraits = true;
      window.dendryUI.saveSettings();
      if (typeof Q !== 'undefined' && typeof Q.syncDistrictMapVisibility === 'function') {
          Q.syncDistrictMapVisibility();
          if (window.dendryUI.dendryEngine.state.sceneId.startsWith('district_map')
              && typeof Q.initDistrictMap === 'function') {
              Q.initDistrictMap();
          }
      }
  };

  window.disableImages = function() {
      window.dendryUI.show_portraits = false;
      window.dendryUI.saveSettings();
      if (typeof Q !== 'undefined' && typeof Q.destroyDistrictMap === 'function') {
          Q.destroyDistrictMap();
      }
      if (typeof Q !== 'undefined' && typeof Q.syncDistrictMapVisibility === 'function') {
          Q.syncDistrictMapVisibility();
      }
  };

  window.enableLightMode = function() {
      window.dendryUI.dark_mode = false;
      document.body.classList.remove('dark-mode');
      window.dendryUI.saveSettings();
  };
  window.enableDarkMode = function() {
      window.dendryUI.dark_mode = true;
      document.body.classList.add('dark-mode');
      window.dendryUI.saveSettings();
  };

  // populates the checkboxes in the options view
  window.populateOptions = function() {
    var disable_bg = window.dendryUI.disable_bg;
    var animate = window.dendryUI.animate;
    var disable_audio = window.dendryUI.disable_audio;
    var show_portraits = window.dendryUI.show_portraits;
    if (disable_bg) {
        $('#backgrounds_no')[0].checked = true;
    } else {
        $('#backgrounds_yes')[0].checked = true;
    }
    if (animate) {
        $('#animate_yes')[0].checked = true;
    } else {
        $('#animate_no')[0].checked = true;
    }
    if (disable_audio) {
        $('#audio_no')[0].checked = true;
    } else {
        $('#audio_yes')[0].checked = true;
    }
    if (show_portraits) {
        $('#images_yes')[0].checked = true;
    } else {
        $('#images_no')[0].checked = true;
    }
    if (window.dendryUI.dark_mode) {
        $('#dark_mode')[0].checked = true;
    } else {
        $('#light_mode')[0].checked = true;
    }
  };

  
  // This function allows you to modify the text before it's displayed.
  // E.g. wrapping chat-like messages in spans.
  window.displayText = function(text) {
      return text;
  };

  // This function allows you to do something in response to signals.
  window.handleSignal = function(signal, event, scene_id) {
  };
  
  // This function runs on a new page. Right now, this auto-saves.
  window.onNewPage = function() {
    var scene = window.dendryUI.dendryEngine.state.sceneId;
    if (scene != 'root' && !window.justLoaded) {
        window.dendryUI.autosave();
    }
    if (window.justLoaded) {
        window.justLoaded = false;
    }
    if (!scene.startsWith('district_map') && typeof Q !== 'undefined'
        && typeof Q.destroyDistrictMap === 'function') {
        Q.destroyDistrictMap();
    }
  };

  // TODO: have some code for tabbed sidebar browsing.
  window.updateSidebar = function() {
      $('#qualities').empty();
      var scene = dendryUI.game.scenes[window.statusTab];
      dendryUI.dendryEngine._runActions(scene.onArrival);
      var displayContent = dendryUI.dendryEngine._makeDisplayContent(scene.content, true);
      $('#qualities').append(dendryUI.contentToHTML.convert(displayContent));
  };

  window.changeTab = function(newTab, tabId) {
      if (tabId == 'poll_tab' && dendryUI.dendryEngine.state.qualities.historical_mode) {
          window.alert('Polls are not available in historical mode.');
          return;
      }
      var tabButton = document.getElementById(tabId);
      var tabButtons = document.getElementsByClassName('tab_button');
      for (i = 0; i < tabButtons.length; i++) {
        tabButtons[i].className = tabButtons[i].className.replace(' active', '');
      }
      tabButton.className += ' active';
      window.statusTab = newTab;
      window.updateSidebar();
  };

  window.onDisplayContent = function() {
      window.updateSidebar();
  };

  /*
   * This function copied from the code for Infinite Space Battle Simulator
   *
   * quality - a number between max and min
   * qualityName - the name of the quality
   * max and min - numbers
   * colors - if true/1, will use some color scheme - green to yellow to red for high to low
   * */
  window.generateBar = function(quality, qualityName, max, min, colors) {
      var bar = document.createElement('div');
      bar.className = 'bar';
      var value = document.createElement('div');
      value.className = 'barValue';
      var width = (quality - min)/(max - min);
      if (width > 1) {
          width = 1;
      } else if (width < 0) {
          width = 0;
      }
      value.style.width = Math.round(width*100) + '%';
      if (colors) {
          value.style.backgroundColor = window.probToColor(width*100);
      }
      bar.textContent = qualityName + ': ' + quality;
      if (colors) {
          bar.textContent += '/' + max;
      }
      bar.appendChild(value);
      return bar;
  };


  window.justLoaded = true;
  window.statusTab = "status";
  window.dendryModifyUI = main;
  console.log("Modifying stats: see dendryUI.dendryEngine.state.qualities");

  window.onload = function() {
    window.dendryUI.loadSettings({show_portraits: false});
    if (window.dendryUI.dark_mode) {
        document.body.classList.add('dark-mode');
    }
    window.pinnedCardsDescription = "Advisor cards - actions are only usable once per 6 months.";
  };

}());
