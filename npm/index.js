/**
 * npm 包管理工具
 * npm init 初始化 package.json 文件，生成项目描述信息 name version description ...
 * npm init --yes 默认执行行为
 * 
 * npm install packageName 默认追加到生产依赖中
 * npm install packageName -D 将包安装至开发依赖中
 * npm install packageName --save-dev 安装开发和生产依赖中
 * 
 * 通过 npm config ls -l 可查看 npm 的所有配置，修改配置的命令为 npm config set
 * 查看全局安装的包 npm list -g --depth 0
 * 
 * 配置淘宝镜像地址
 * npm config set registry https://registry.npm.taobao.org
 * yarn config set registry https://registry.npm.taobao.org
 * 
 */
