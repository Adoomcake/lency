let env = process.env;
let notifier = require('node-notifier');
let path = require('path');
let args = {
    moduleName: env.npm_config_module || '',
    moduleType: env.npm_config_type || 'react',
    pageName: env.npm_config_pname || '',
    fileDesc: env.npm_config_filedesc || '这家伙很懒，什么都没有留下'
}
if (!args.moduleName) {
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
        message: msg.message || ''
    });
}
function getYmd() {
    let time = new Date();
    return time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate();
}
module.exports = {
    args: args,
    modulePath: path.join(getAbsolutePath('src'), args.moduleName),
    errorNotify: errorNotify,
    getYmd: getYmd
}