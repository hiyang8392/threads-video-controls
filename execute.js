chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.volume) {
    const videos = document.querySelectorAll("video");
    videos.forEach(function (video) {
      video.volume = message.volume;
      video.muted = message.volume < 0.01;
    });
  }
});

function handleVideoElement() {
  if (!chrome || !chrome.storage || !chrome.storage.local) {
    return;
  }

  chrome.storage.local.get("volume", function (data) {
    const volume = data.volume;
    const videos = document.querySelectorAll("video");
    videos.forEach(function (video) {
      // add threads<video> controls
      if (!video.hasAttribute("controls")) {
        video.setAttribute("controls", true);
        // modify threads<video> fullscreen size
        video.style.objectFit = "contain";
      }
      if (!isNaN(volume)) {
        video.volume = volume;
        video.muted = false;
      }
      if (volume < 0.01) {
        video.volume = 0;
        video.muted = true;
      }

      if (!video.dataset.videoListener) {
        video.dataset.videoListener = "true";
        video.addEventListener("volumechange", () => {
          chrome.storage.local.set({ volume: video.volume });
        });
      }
    });
  });
  // remove threads video click element
  const elementsWithDataInstanceKey =
    document.querySelectorAll("[data-instancekey]");
  elementsWithDataInstanceKey.forEach(function (element) {
    element.remove();
  });
}

const observer = new MutationObserver(function (mutationsList, observer) {
  mutationsList.forEach(function (mutation) {
    if (mutation.type === "childList") {
      handleVideoElement();
    }
  });
});
observer.observe(document.body, { childList: true, subtree: true });

handleVideoElement();
