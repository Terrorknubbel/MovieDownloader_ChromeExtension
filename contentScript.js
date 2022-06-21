(() => {
    let header, youtubePlayer;
    let currentVideo = "";

    chrome.runtime.onMessage.addListener((obj, sender, response) => {
        const { type, value, videoId } = obj;

        if (type === "NEW"){
            currentVideo = videoId;
            newVideoLoaded();
        }
    })

    const newVideoLoaded = () => {
        const bookmarkBtnExists = document.getElementsByClassName("bookmark-btn")[0];
        
        if(!bookmarkBtnExists){
            const downloadBtn = document.createElement("button");
            downloadBtn.className = "download-btn";
            downloadBtn.innerText = "Download amk";

            header = document.getElementsByClassName("actions")[0];

            header.append(downloadBtn);
            downloadBtn.addEventListener("click", downloadImage);
        }
    }

    function downloadImage() {
        let videoTag = document.querySelector("video");
        let videoSrc = videoTag.src;
        let videoTitle = document.getElementsByClassName("breadcrumb-item")[2].childNodes[1].title;

        let xhr = new XMLHttpRequest();
        xhr.open("POST", "https://192.168.2.108:3000/download");

        xhr.setRequestHeader("Accept", "application/json");
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onload = () => alert(xhr.responseText);

        let data = `{
        "videoSrc": "${videoSrc}",
        "videoTitle": "${videoTitle}"
        }`;

        xhr.send(data);
    }

    newVideoLoaded();
})();