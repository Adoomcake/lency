let env = process.env;
let notifier = require('node-notifier');
let path = require('path');
let args = {
    module: env.npm_config_module,
    moduleType: env.npm_config_type || 'react'
}
if (!args.module) {
    console.log("请输入工程名称 --project=\"XX\"");
    notifier.notify({
        title: '构建出错',
        message: '请输入工程名称'
    });
}

function getAbsolutePath(p) {
    return path.join(__dirname, '../../', p);
}
function errorNotify(msg) {
    notifier.notify({
        title: '构建出错',
        message: msg || ''
    });
}
module.exports = {
    args: args,
    modulePath: path.join(getAbsolutePath('src'), args.module),
    errorNotify: errorNotify
}