// 监听来自content-script的消息
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
{
    switch (request.action) {
        case "isOnline":
            $.get("https://baike.baidu.com", {})
                .done(
                    (data) => {
                        let keys = ["isNotice"];
                        new Promise(((resolve, reject) => {
                            chrome.storage.local.get(keys, function(data) {
                                resolve(data);
                            });
                        })).then((data) => {
                            if (data.isNotice) {
                                chrome.notifications.create(null, {
                                    type: 'basic',
                                    iconUrl: 'imgs/ly_avatar.png',
                                    title: '网络已连接',
                                    message: 'WiFi认证页面自动关闭\n点击插件,可以设置是否连接网络后弹出改通知'
                                });
                            }
                        });
                        sendResponse(JSON.stringify({isOnline: true, data: data}))
                    }
                )
                .fail(
                    () => sendResponse(JSON.stringify({isOnline: false}))
                );
            break;
        default:
            chrome.notifications.create(null, {
                type: 'basic',
                iconUrl: 'imgs/human.pn_skeleton.png',
                title: '脚本出问题了',
                message: '后台未识别发送过来的信息'
            });
    }
    return true
});

