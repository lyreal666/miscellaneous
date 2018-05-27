$(() => {
    let accountInput = document.getElementById("account");
    let passwdInput = document.getElementById("passwd");
    let domainSelect = document.getElementById("domain");
    let isSaveCBox = document.getElementById("isSave");
    let submitBut = document.getElementById("submit");

    submitBut.addEventListener("click", () => {
        let data = {};
        data.account = accountInput.value;
        data.passwd = passwdInput.value;
        data.domain = domainSelect.value;
        data.isSave = isSaveCBox.checked;
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

