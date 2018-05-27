

$(() => {
    let accountInput = document.getElementById("account");
    let passwdInput = document.getElementById("passwd");
    let domainSelect = document.getElementById("domain");
    let isSaveCBox = document.getElementById("isSave");
    let submitBut = document.getElementById("submit");
    let isNoticeCBox = document.getElementById("isNotice");
    let autoCloseCBox = document.getElementById("autoClose");

    let keys = ['account', "passwd", "domain", "isSave", "isNotice", "autoClose"];

    new Promise(((resolve, reject) => {
        chrome.storage.local.get(keys, function(data) {
            resolve(data);
        });
    })).then((data) => {
        for (let key in data) {
            if (typeof data[key] === "string") {
                data[key] = Base64.decode(data[key]);
                console.log(data[key])
            }
        }
        accountInput.value = data.account;
        passwdInput.value = data.passwd;
        domainSelect.value = data.domain;
        isSaveCBox.checked = data.isSave;
        isNoticeCBox.checked = data.isNotice;
        autoCloseCBox.checked = data.autoClose;
    });

    submitBut.addEventListener("click", () => {
        let data = {};
        data.account = accountInput.value;
        data.passwd = passwdInput.value;
        data.domain = domainSelect.value;
        data.isSave = isSaveCBox.checked;
        data.isNotice = isNoticeCBox.checked;
        data.autoClose = autoCloseCBox.checked;
        if (data.account && data.passwd && data.domain) {
            // 加密
            for (let key in data) {
                if (typeof data[key] === "string") {
                    data[key] = Base64.encode(data[key]);
                }
            }

            new Promise(((resolve, reject) => {
                chrome.storage.local.set(data, function() {
                    resolve()
                });
            })).then(() => {
                document.write("数据已保存")
            })
        }
    });
});

