const router = require('koa-router')();
const path = require('path');
const fs = require('mz/fs');
const serverLogger = require('../utils/log4js-config').getLogger('server');

const addMapping = async (router, mapping) => {
   for (const url in mapping) {
       if (url.startsWith('GET ')) {
           const path = url.slice(4);
           router.get(path, mapping[url]);
           serverLogger.info(`Register URL mapping: GET ${path}`);
       } else if (url.startsWith('POST ')) {
           const path = url.slice(5);
           router.post(path, mapping[url]);
           serverLogger.info(`Register URL mapping: POST ${path}`);
       } else {
           serverLogger.info(`Can't route url: ${url}, please check the mapping ${JSON.stringify(mapping)}`)
       }
   }
}

const addControllers = async (router, controllers_dir) => {
    serverLogger.warn(`Process controller under directory: ${controllers_dir}...`);
    const files = await fs.readdir(controllers_dir);
    const js_files = files.filter(file => file.endsWith('.js'));

    js_files.forEach(file => {
        serverLogger.info(`Process controller: ${file}...`);
        let mapping = require(path.join(controllers_dir, file));
        addMapping(router, mapping)
    })
}

module.exports = (controllers_dir='./controllers/') => {
    addControllers(router, controllers_dir);
    return router.routes();
}