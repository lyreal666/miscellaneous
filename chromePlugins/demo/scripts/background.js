// 监听来自content-script的消息
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
{
    if (request.action === "isOnline") {
        $.get("https://baike.baidu.com", {})
            .done(
                (data) => {
                    sendResponse(JSON.stringify({isOnline: true, data: data}))
                }
            )
            .fail(
                () => sendResponse(JSON.stringify({isOnline: false}))
            )
    } else {
        alert("未识别的message")
    }

    return true
});

