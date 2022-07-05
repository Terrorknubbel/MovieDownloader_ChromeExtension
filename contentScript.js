let div = document.createElement("div");
div.className = "download-container";

let downloadBtn = document.createElement("button");
downloadBtn.className = "download-btn";
downloadBtn.innerText = "Download";
downloadBtn.addEventListener("click", download);

div.appendChild(downloadBtn);

let actionDiv = document.getElementsByClassName("actions")[0];
actionDiv.innerHTML = "";   //clear actionDiv
actionDiv.append(div);

function download() {
    let videoTag = document.querySelector("video");
    let videoSrc = videoTag.src;
    let videoTitle;
    let videoType;

    let datailDivChildren = document.getElementsByClassName("detail")[0].children.length;
    if(datailDivChildren === 6){    //Serie
        titleArr = document.getElementsByClassName("breadcrumb-item")[2].childNodes[1].title.split("-");

        title = titleArr[0];
        season = titleArr[1].match(/\d+/)[0];
        episode = document.getElementsByClassName("breadcrumb-item")[3].childNodes[1].innerText.match(/\d+/)[0];

        videoTitle = title + "- s" + ('0' + season).slice(-2) + "e" + ('0' + episode).slice(-2);
        videoType = "serie";
    }else{ // Film
        videoTitle = document.getElementsByClassName("breadcrumb-item")[2].childNodes[1].title;
        videoType = "film";
    }

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "https://192.168.2.108:3000/download");

    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");

    let message = document.createElement("div");
    message.className = "message";

    xhr.onload = () => {
        message.innerText = "Successfully added to queue.";
        actionDiv.append(message);
    };

    xhr.onerror = () => {
        message.innerText = "Request failed.";
        message.classList.add("error");
        actionDiv.append(message);
    };

    let data = {
        "type": videoType,
        "src": videoSrc,
        "title": videoTitle
    };

    xhr.send(data);
}