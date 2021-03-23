// Initialize butotn with users's prefered color
let start = document.getElementById("start");

chrome.storage.sync.get("checked", (data) => {
    start.checked = data.checked;
})
// When the button is clicked, inject startAction into current page
start.addEventListener("change", (a) => {
    chrome.runtime.sendMessage({command: "start"}, function (response) {
        alert(response.msg)
    });
    chrome.storage.sync.set({checked: start.checked});
});