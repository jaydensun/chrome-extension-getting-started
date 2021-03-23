chrome.runtime.onInstalled.addListener(() => {
});

let interval;

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    function stopRefresh() {
        if (interval) {
            clearInterval(interval);
            sendResponse({msg: "Refreshing stopped!"})
        } else {
            sendResponse({msg: "Refresh is not running!"})
        }
    }

    function startRefresh() {
        if (interval) {
            sendResponse({msg: "Refresh is already running!"})
            return;
        }
        interval = setInterval(() => {
            chrome.tabs.query({}, tabs => {
                tabs.forEach((tab, i) => {
                    if (tab.url === 'https://console.cloud.tencent.com/tsf/index?rid=1') {
                        chrome.scripting.executeScript({
                            target: {tabId: tab.id},
                            function: refreshPage
                        });
                    }
                })
            });
        }, 1000 * 5);
        sendResponse({msg: "Refreshing started!"});
    }

    if (request.command == "start") {
        startRefresh();
    } else if (request.command == "stop") {
        stopRefresh();
    }
    sendResponse({});
});

function refreshPage() {
    location.reload();
}
