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
* 下載並解壓縮
* 打開 Chrome 瀏覽器，進入 `chrome://extensions/`
* 點擊`載入未封裝項目`，選擇此資料夾
* 在 Threads 頁面上就可以打開擴充功能`Threads Video Controls`
* 調整音量大小就可以將頁面所有的影片音量調整為相同大小
