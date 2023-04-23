function saveToFile() {
  chrome.tabs.query({}, function (tabs) {
    var tabData = '';
    for (var i = 0; i < tabs.length; i++) {
      tabData += tabs[i].title + '\t' + tabs[i].url + '\n';
    }

    var blob = new Blob([tabData], { type: 'text/plain;charset=utf-8' });
    var url = URL.createObjectURL(blob);
    chrome.downloads.download({
      url: url,
      filename: 'tabs.txt',
      saveAs: true,
    });
  });
}

chrome.tabs.query({}, function (tabs) {
  var tabList = document.getElementById('tabList');

  for (var i = 0; i < tabs.length; i++) {
    var li = document.createElement('li');
    li.textContent = tabs[i].title;
    tabList.appendChild(li);
  }
});

function copyLinks() {
  chrome.tabs.query({}, function (tabs) {
    var links = '';
    for (var i = 0; i < tabs.length; i++) {
      links += tabs[i].url + '\n';
    }

    var dummy = document.createElement('textarea');
    document.body.appendChild(dummy);
    dummy.value = links;
    dummy.select();
    document.execCommand('copy');
    document.body.removeChild(dummy);
  });
}

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('saveToFile').addEventListener('click', saveToFile);
  document.getElementById('copyLinks').addEventListener('click', copyLinks);
});
