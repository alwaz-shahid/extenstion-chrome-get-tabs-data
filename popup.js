function saveToFile() {
  chrome.tabs.query({}, function(tabs) {
    var tabData = "";
    for (var i = 0; i < tabs.length; i++) {
      tabData += tabs[i].title + "\t" + tabs[i].url + "\n";
    }

    var blob = new Blob([tabData], {type: "text/plain;charset=utf-8"});
    saveAs(blob, "tabs.txt");
  });
}

function copyLinks() {
  chrome.tabs.query({}, function(tabs) {
    var links = "";
    for (var i = 0; i < tabs.length; i++) {
      links += tabs[i].url + "\n";
    }

    var dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = links;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
  });
}

document.getElementById("saveToFile").addEventListener("click", saveToFile);
document.getElementById("copyLinks").addEventListener("click", copyLinks);
