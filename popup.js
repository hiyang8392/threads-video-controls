document.addEventListener('DOMContentLoaded', function () {
  const volumeInputEl = document.querySelector('#volumeInput');
  const volumeDisplayEl = document.querySelector('#volumeDisplay');
  const autoClickSpoilerEl = document.querySelector('#autoClickSpoiler');

  if (chrome.runtime && chrome.runtime.id) {
    chrome.storage.local.get(['volume', 'autoClickSpoiler'], function (data) {
      const volume = data.volume;
      volumeDisplayEl.textContent = '0%';
      if (!isNaN(volume)) {
        volumeInputEl.value = volume;
        volumeDisplayEl.textContent = `${(volume * 100).toFixed()}%`;
      }

      if (data.autoClickSpoiler === false) {
        autoClickSpoilerEl.checked = false;
      }
    });

    volumeInputEl.addEventListener('input', function () {
      const volumeValue = volumeInputEl.value;
      volumeDisplayEl.textContent = `${(volumeValue * 100).toFixed()}%`;
      chrome.storage.local.set({ volume: volumeValue });
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { volume: volumeValue });
      });
    });

    autoClickSpoilerEl.addEventListener('change', function () {
      chrome.storage.local.set({
        autoClickSpoiler: autoClickSpoilerEl.checked,
      });
    });
  }
});
