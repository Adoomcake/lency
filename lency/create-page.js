let fs = require('fs');
let path = require('path');
let child_process = require('child_process');
let utilApi = require("./util/util");
let moduleType = utilApi.args.moduleType;
let usrName = child_process.execSync('git config user.name').toString('utf-8');
let usrEmail = child_process.execSync('git config user.email').toString('utf-8');
class CreatePage {
    constructor() {
        this.init();
    }
    checkParams() {
        if (!utilApi.args.moduleName || !fs.existsSync(utilApi.modulePath)) {
            utilApi.errorNotify({'message': '--module字段未输入或module未匹配到，请确认填入正确的module'});
            console.log('--module字段未输入或module未匹配到，请确认填入正确的module');
            process.exit(0);
        }
        if (fs.existsSync(path.join(utilApi.modulePath, 'page', utilApi.args.pageName)) || !utilApi.args.pageName) {
            utilApi.errorNotify({'message': '--pname字段未输入或pname输入的名称重复，请确认--pname字段'});
            console.log('--pname字段未输入或pname输入的名称重复，请确认--pname字段');
            process.exit(0);
        }
    }
    buildJsTemplate() {
        let moduleType = utilApi.args.moduleType;
        let pageTemplatePath;
        if (moduleType == 'react') {
            pageTemplatePath = 'util/template/react-template/page.js';
        } else if (moduleType == 'vue') {
            pageTemplatePath = 'util/template/vue-template/page.js';
        } else {
            utilApi.errorNotify({'message': '创建project指定的模板暂不支持!'});
            console.log('创建project指定的模板暂不支持!');
            process.exit(0);
        }
        let templateData = fs.readFileSync(path.join(__dirname, pageTemplatePath), 'utf-8');
        let buildTmpl = templateData.replace(/%pagename%/g, utilApi.args.pageName)
        .replace(/%description%/g, utilApi.args.fileDesc)
        .replace(/%author%/g, usrName)
        .replace(/%dateTime%/g, utilApi.getYmd());
        this.buildPage(buildTmpl);
    }
    buildPage(tpd) {
        try {
            let p = path.join(utilApi.modulePath, 'page', utilApi.args.pageName);
            fs.mkdirSync(p);
            fs.writeFileSync(path.join(p, utilApi.args.pageName + '.js'), tpd);
            fs.writeFileSync(path.join(p, utilApi.args.pageName + '.less'));
        } catch (e) {

        }

    }
    init() {
        this.checkParams();
        this.buildJsTemplate();
    }
}
new CreatePage();