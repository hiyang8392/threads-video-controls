document.addEventListener("DOMContentLoaded", function () {
  const volumeInputEl = document.querySelector("#volumeInput");
  const volumeDisplayEl = document.querySelector("#volumeDisplay");

  if (chrome.runtime && chrome.runtime.id) {
    chrome.storage.local.get("volume", function (data) {
      const volume = data.volume;
      volumeDisplayEl.textContent = "0%";
      if (!isNaN(volume)) {
        volumeInputEl.value = volume;
        volumeDisplayEl.textContent = `${(volume * 100).toFixed()}%`;
      }
    });

    volumeInputEl.addEventListener("input", function () {
      const volumeValue = volumeInputEl.value;
      volumeDisplayEl.textContent = `${(volumeValue * 100).toFixed()}%`;
      chrome.storage.local.set({ volume: volumeValue });
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { volume: volumeValue });
      });
    });
  }
});
