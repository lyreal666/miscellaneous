
let autoLogin = () => {
    let keys = ['account', "passwd", "domain", "isSave"];

    new Promise(((resolve, reject) => {
        chrome.storage.local.get(keys, function(data) {
            resolve(data);
        });
    })).then((data) => {
        if (data.account) {
            for (let key in data) {
                if (typeof data[key] === "string") {
                    data[key] = Base64.decode(data[key]);
                    console.log(data[key])
                }
            }

            let accountInput = document.querySelector("#loginname");
            let passwdInput = document.querySelector("#password");
            let isSaveCBox = document.querySelector("body > div.W_login > div.W_login_main > div.W_login_info > div.loginbox > form > div > div.info_list.auto_login.clearfix > input[type=\"checkbox\"]");
            let domainSelect = document.querySelector("body > div.W_login > div.W_login_main > div.W_login_info > div.loginbox > form > div > div.info_list.auto_login.clearfix > select");

            accountInput.value = data.account;
            passwdInput.value = data.passwd;
            isSaveCBox.checked = data.isSave;
            domainSelect.value = data.domain;

            let submitBut = document.querySelector("body > div.W_login > div.W_login_main > div.W_login_info > div.loginbox > form > div > div.info_list.auto_login.clearfix > div.info_list.login_btn > div > input.W_btn_g");
            submitBut.click();
        }
    });
};


$(() => {
    new Promise((resolve, reject) => {
        chrome.runtime.sendMessage({action: "isOnline"}, function(response) {
            resolve(JSON.parse(response));
        });
    }).then((result) => {
        if (result.isOnline === false) {
            console.log("无法跨域请求");
            autoLogin()
        } else {
            new Promise(((resolve, reject) => {
                let keys = ["autoClose"];
                chrome.storage.local.get(keys, function(data) {
                    resolve(data);
                });
            })).then((data) => {
                if (data.autoClose) {
                    setTimeout(() => {
                        window.opener = null;
                        window.open("", '_self');
                        window.close()
                    }, 3000)
                }
            });

        }
    });
});
