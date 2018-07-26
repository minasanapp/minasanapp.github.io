//Global Variables
var she;

// Detect Mobile
const isMobileDevice = window.navigator.userAgent.toLowerCase().includes("mobi");
if (isMobileDevice) {
    document.getElementsByClassName('mdl-layout-title')[0].innerHTML = 'Minasan';
    document.getElementsByClassName('mdl-navigation')[0].innerHTML = '';
}

// Fetch from GitHub
function apiFetch(cond) {
    fetchBuffer(cond);
    var api = 'https://api.github.com/repos/minasanapp/src/releases/tags/';
    var res = false;

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var respond = JSON.parse(this.responseText);
            var fileVersion = respond.name;
            var fileSize = respond.assets[0].size;
            var filePath = respond.assets[0].browser_download_url;
            she = '{"fileVersion":"' + fileVersion + '", "fileSize":"' + fileSize + '", "filePath":"' + filePath + '"}';
            fileInfo(she, cond);
        } else if (this.readyState == 4 && this.status == 403) {
            fetchFailed(cond);
        }
    };
    xmlhttp.open("GET", api + cond, true);
    xmlhttp.send();
}

function fileInfo(cond, cond2) {
    var file;
    if (file = JSON.parse(cond)) {
        var html = '<div>Minasan Version : ' + file.fileVersion + '</div><div>File Size : ' + bytesToSize(file.fileSize) + '</div>';
        var download = file.filePath;
        fetchInject(html, download, cond2);
    }
}


// Fetch Status
function fetchBuffer(cond) {
    document.getElementById('p2').style.opacity = '1';
    if (cond == 'minasan') {
        document.getElementById('fetch-status').style.display = 'none';
        document.getElementById('fetch-status').innerHTML = '';
        document.getElementById('appdl').innerHTML = 'Fetching latest release';
        document.getElementById('appdl').setAttribute('disabled', '');
    } else if (cond == 'minasan2') {
        document.getElementById('fetch-status-2').style.display = 'none';
        document.getElementById('fetch-status-2').innerHTML = '';
        document.getElementById('appdl-2').innerHTML = 'Fetching latest release';
        document.getElementById('appdl-2').setAttribute('disabled', '');
    }
    componentHandler.upgradeAllRegistered();
}

function fetchInject(cond, cond1, cond2) {
    document.getElementById('p2').style.opacity = '0';
    if (cond2 == 'minasan') {
        document.getElementById('fetch-status').innerHTML = cond;
        document.getElementById('fetch-status').style.display = 'block';
        document.getElementById('appdl').innerHTML = 'Download';
        document.getElementById('appdl').removeAttribute('disabled');
        document.getElementById('appdl').setAttribute('onclick', 'window.open("' + cond1 + '","_self")');
    } else if (cond2 == 'minasan2') {
        document.getElementById('fetch-status-2').innerHTML = cond;
        document.getElementById('fetch-status-2').style.display = 'block';
        document.getElementById('appdl-2').innerHTML = 'Download';
        document.getElementById('appdl-2').removeAttribute('disabled');
        document.getElementById('appdl-2').setAttribute('onclick', 'window.open("' + cond1 + '","_self")');
    }
    componentHandler.upgradeAllRegistered();
}

function fetchFailed(cond) {
    document.getElementById('p2').style.opacity = '0';
    if (cond == 'minasan') {
        document.getElementById('appdl').innerHTML = 'Fetch failed';
    } else if (cond == 'minasan2') {
        document.getElementById('appdl-2').innerHTML = 'Fetch Failed';
    }
    componentHandler.upgradeAllRegistered();
}


// KB to MB conversion
function bytesToSize(bytes) {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return 'n/a';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    if (i == 0) return bytes + ' ' + sizes[i];
    return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i];
};