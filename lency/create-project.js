let fs = require('fs');
let path = require('path');
let child_process = require('child_process');
let utilApi = require('./util/util');
let modulePath = utilApi.modulePath;

class CreateProject {
    constructor () {
        this.createModulePath();
        this.projectInit();
    }
    createModulePath () {
        if (fs.existsSync(modulePath)) {
            console.log('project目录已经存在');
            utilApi.errorNotify('project目录已经存在');
            process.exit(0);
        } else {
            fs.mkdirSync(modulePath);
            
        }
    }
    projectInit() {
        console.log('开始构建公共模块');
        let initCli = 'cd ' + path.join(__dirname, 'util') + ' && cp -r ./project-init/* ' + modulePath;
        child_process.exec(initCli, (err, stdout, stderr) => {
            err ? utilApi.errorNotify(err) : console.log('构建公共模块完成!')
        });
    }
}
new CreateProject();