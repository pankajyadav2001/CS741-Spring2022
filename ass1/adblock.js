
function adblocker(details){
    return {cancel: true};
}

chrome.webRequest.onBeforeRequest.addListener(
    adblocker,
    {urls: ["*://googleads.g.doubleclick.net/*"]},
    ["blocking"]
);