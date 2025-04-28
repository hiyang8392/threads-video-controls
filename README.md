# Threads 電腦版影片播放器

### demo
![demo image1](https://i.imgur.com/qQ3dkmH.png)
![demo image2](https://i.imgur.com/A69prUF.png)
![demo image3](https://i.imgur.com/5wfKZSm.png)

### 說明
在 FB、IG、Threads 上，電腦版的播放器都是預設 100% 的音量且不給使用者自行調整播放器的音量大小，這樣每次看影片的時候都要自己調整電腦的音量太麻煩了，所以寫了一個 Chrome Extension 來控制播放器的音量大小。

做法是將 video 標籤加上 controls 屬性就可以將控制條打開，然後把指定的音量寫進去，並且把音量存在 storage 裡，就不用每次打開網頁都要重新設定。

因為 threads 會在 video 上蓋一層 div，是讓使用者點擊後就會放大為滿版，所以還要移除掉這層 div 就可以控制該播放器了，因為 video controls 本來就有全螢幕功能，所以也不會影響。

而且因為目前 threads 上的影片格式是 mp4，所以可以直接下載影片。

### 安裝及使用

https://chromewebstore.google.com/detail/ecjnecoekckohdliinndojalaakmkcld?utm_source=item-share-cb

1. 進入網址點擊 `加到 Chrome`
2. 在瀏覽器上的擴充功能，點選剛加入的 `Threads Video Controls`
3. 調整音量大小即可將 Threads 所有的影片音量調整為相同大小

若遇到問題，例如影片播不出來或網頁讀不出東西，可能原因會是 Threads 有做改版更新，請直接移除該擴充功能即可。
