const requests = require('superagent');

let test = async () => {
    const { text:html, body } = await requests.get('https://api.weixin.qq.com/sns/jscode2session?appid=wxcd3c0187d1067210&secret=wxcd3c0187d1067210&js_code=undefined&grant_type=authorization_code')
    console.log(html);
}

test();