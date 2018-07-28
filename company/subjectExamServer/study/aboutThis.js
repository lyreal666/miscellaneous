function request(options) {
    console.log('Send a request');
    console.log(`${options.method} ${options.url} data: ${JSON.stringify(options.data)}`);
}

function onLaunch() {
    console.log(this.name);
    request({
        url: 'http://example.com',
        method: 'POST',
        data: {
            code: this.code
        }
    })

}

const app = {
    name: 'tjx',
    code: 'bbabbab123456'
};

onLaunch.call(app);