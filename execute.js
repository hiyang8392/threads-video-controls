const SPOILER_DIV = 'span.x1lliihq';
const SPOILER_COLOR = '#4d4d4d';

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.volume) {
    const videos = document.querySelectorAll('video');
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

  chrome.storage.local.get('volume', function (data) {
    const volume = data.volume;
    const videos = document.querySelectorAll('video');
    videos.forEach(function (video) {
      // add <video> element controls attribute
      if (!video.hasAttribute('controls')) {
        video.setAttribute('controls', true);
        // modify <video> element fullscreen size
        video.style.objectFit = 'contain';
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
        video.dataset.videoListener = 'true';
        video.addEventListener('volumechange', () => {
          chrome.storage.local.set({ volume: video.volume });
        });
      }
    });
  });
  // remove threads original video click element
  const elementsWithDataInstanceKey =
    document.querySelectorAll('[data-instancekey]');
  elementsWithDataInstanceKey.forEach(function (element) {
    element.remove();
  });
}

function autoClickTextSpoilerButtons() {
  const buttons = document.querySelectorAll(
    '[role="button"]:not([data-auto-clicked])',
  );
  buttons.forEach(function (button) {
    const parentSpan = button.closest(SPOILER_DIV);
    if (!parentSpan) return;

    parentSpan.querySelectorAll('span').forEach(function (span) {
      span.setAttribute('data-original-visible', 'true');
    });

    button.setAttribute('data-auto-clicked', 'true');
    parentSpan.setAttribute('data-bg-styled', 'true');
    button.click();
  });

  document
    .querySelectorAll('[data-bg-styled] span:not([data-original-visible])')
    .forEach(function (span) {
      if (span.closest('[role="button"]')) return;
      span.style.backgroundColor = SPOILER_COLOR;
    });
}

function autoClickMediaSpoilerButtons() {
  const buttons = document.querySelectorAll(
    '[role="button"]:not([data-auto-clicked])',
  );
  buttons.forEach(function (button) {
    if (button.closest(SPOILER_DIV)) return;
    if (!button.querySelector('img, video')) return;
    if (!button.querySelector('[style*="--x-opacity"]')) return;

    button.setAttribute('data-auto-clicked', 'true');
    button.click();
  });
}

const observer = new MutationObserver(function (mutationsList, observer) {
  mutationsList.forEach(function (mutation) {
    if (mutation.type === 'childList') {
      handleVideoElement();
      autoClickTextSpoilerButtons();
      autoClickMediaSpoilerButtons();
    }
  });
});
observer.observe(document.body, { childList: true, subtree: true });

handleVideoElement();
autoClickTextSpoilerButtons();
autoClickMediaSpoilerButtons();
