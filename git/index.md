
### Git 
Git 是一款开源免费的分布式的版本控制系统。
是 linux 之父 Linus Torvalds （**林纳斯·托瓦兹**）为了方便管理 linux 内核代码而开发的。

#### SVN 与 Git 的主要区别
SVN 属于集中式的版本控制系统，而 Git 属于分布式的版本控制系统

|           集中式           |                     分布式                     |
| :------------------------: | :--------------------------------------------: |
|  离线情况下不能提交，更新  |               离线能进行本地提交               |
| 每个开发者保留最新一个版本 |           每个开发者保存所有历史版本           |
|     服务器损坏无法恢复     | 中心服务出现故障，使用某个开发者的代码即可恢复 |

#### Git 的三个区域
* 工作区（修改后的红色文件）
* 暂存区（添加后的绿色文件）
* 版本库（代码版本区非远程）

#### 初始化
```bash
# 列举所有配置
$ git config -l
# 设置提交代码时的用户信息
$ git config [--global] user.name [name]
$ git config [--global] user.email [email address]
```
```bash
# 在当前目录新建一个Git代码库
$ git init
# 下载一个项目和它的整个代码历史 [Git only]
$ git clone [url]
```
- `git status` 监测当前目录文件变化，暂存区与工作区差异，状态红色代表新增或修改原文件
- `git add .` 将文件添加至暂存区，状态绿色已经管理起来
- `git commit -m` 生产一条版本记录，添加至版本库

---

#### 回退
- 查询提交记录的是`commit id`为十六进制的数字，`Git`会保存提交的记录，提供一个`HEAD`指针指向当前版本
- `git reset --hard [commit]` 重置当前分支的 `HEAD` 为指定 `commit` 同时重置暂存区和工作区，与指定 `commit` 一致
- 错误回滚查询记录 `git reflog` 可再次使用 `git reset --hard [commit]` 回退指定版本

```bash
$ git log
# 查看所有操作日志
$ git reflog
# 日志简化图hash记录
$ git log --graph --pretty=format:"%h %s"
# 仓库区回工作区
$ git reset --hard [commit]
# 后悔药，回溯节点保留节点内容
$ git reset --soft [commit]
# 暂存区回工作区，绿色文件回红色文件
$ git reset HEAD
# 仓库区回工作区文件修改后的状态
$ git reset --mix [commit]
# 红色文件恢复原始状态
$ git checkout -- [fileName]
```

```bash
# 生成一条新的记录仅 revert 掉自己提交的 commit
$ git revert [commit]
```

---

#### 分支
- 概念通过指针引用主干，在新分支上只保存修改后的文件，最终只将修改后的文件合并到主干，进一步节省了资源内存
- `main`主干、`dev`开发、`hotfix`修复、`release`生产、`feature`功能

```bash
# 列出所有本地分支
$ git branch
# 列出所有本地分支和远程分支
$ git branch -a
# 列出所有远程分支
$ git branch -r
# 删除本地分支
$ git branch -d [branch-name]
# 新建一个分支，并切换到该分支
$ git checkout -b dev origin/dev
# 创建一个远程分支
$ git push origin main:main
# 切换到指定分支，并更新工作区
$ git checkout dev
# 重命名分支
$ git branch -m [branch-name] [new-branch-name]
# 删除远程分支
$ git push origin:origin/dev
$ git push origin --delete [branch-name]
$ git branch -dr [remote/branch]
```
```bash
# 新命令切换创建分支
$ git switch -c dev
# 切换分支
$ git switch dev
```

```bash
# 当切换分支并不想进行 commit 操作时可以使用
# 将当前的工作区修改进行 "储藏" 压入栈中
$ git stash
$ git stash save '备注缓存'
# 当你进行多次 stash 然后解决了问题，想回到原来工作代码环境，你只需要切换到原分支上
$ git stash pop
$ git stash list
$ git stash clear
$ git stash show -p
```

---

#### 合并
- 切换回主干，将要合并的分支进行 `merge`
```bash
# 合并指定分支到当前分支，别忘记 push 到远端
$ git merge dev
# 选择一个 commit 记录，合并进当前分支
$ git cherry-pick [commit]
# gitlab 冲突
$ git merge --no-ff -m "merge with no-ff" dev
```

---

#### 拉取

```bash
# 捕获文件
$ cat [fileName]
# 进入编辑文件，编辑完毕 esc :wq写入退出 :q!不保存退出
$ vim [fileName]
# 从远端仓库拉取至本地
$ git pull origin dev
# 从远端仓库拉取至版本库，再从版本库拉至本地
$ git fetch origin [branch]
$ git merge [origin/branch]
```

---

#### 变基

```bash
# 单分支下合并多次commit记录
$ git rebase -i [commit]
# 单分支下合并多次记录以 HEAD 为基准日志次数
$ git rebase -i HEAD~3
# 将两个分支的commit记录合并至一条线
$ git checkout dev
$ git rebase main
$ git checkout main
$ git merge dev
```
- 变基产生冲突
```bash
$ vim [fileName]
$ git status
$ git add .
$ git rebase --continue
```

---

#### 标签

```bash
# 查看标签信息
$ git show v1.0
# 指定标签信息 -a标签名 -m说明文字
$ git tag -a v1.0 -m 'version info'
# 删除本地标签
$ git tag -d v1.0
# 推送本地标签到远程
$ git push origin --tags
# 删除远程标签，先删除本地，再删除远程
$ git tag -d v1.0
$ git push origin :refs/tags/v0.9
```

---

#### 删除
```bash
# 移除 HelloWorld.js
$ git rm HelloWorld.js
# 移除子目录中的文件
$ git rm /pather/file/HelloWorld.js
# 删除工作区文件，并且将这次删除放入暂存区
$ git rm [file1] [file2]
```

---

#### vim 插入模式

- 可以使用输入 `git commit` 进入编辑器界面
- 通过 `i` 健进入编辑模式，退出时需要进行 `esc`

```bash
# 退出
$ :q
# 强制退出不保存
$ :q!
# 保存并退出
$ :wq
# 强制保存并退出
$ :wq!
```

---

#### gitflow 工作流程

- `feature-[branches]` 功能分支，一般是从 `develop` 开发分支上检出
- `develop` 开发主线分支，`feature` 功能分支的代码开发完成后，经过 `code review` 后会合并到此分支
- `release-[branches]` 测试、发布主线，此分支是从 `develop` 分支上检出, 一般是提测阶段会使用该分支的代码
- `bugfix` 修复 `release` 分支问题
- `hotfix` 紧急修复，一般是用于修复上线后的生产环境的问题
- `master` 线上稳定版分支

---
