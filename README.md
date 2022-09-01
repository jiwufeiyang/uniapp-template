# uniapp 模板文件

## 使用技术

### vue3+vite+ts+pinia
    npx degit dcloudio/uni-preset-vue#vite-ts my-vue3-project

### 使用 eslint 做代码规范  .eslintignore配置不需要的校验

    pnpm add eslint -D
    然后在package.json中添加脚本

    {
        "scripts": {
            "eslint:init": "eslint --init"
        }
    }
    执行脚本

    pnpm eslint:init

### 配置 prettier 代码规范空格等定义 .prettierignore配置不需要的校验

    pnpm add prettier -D
    解决 eslint 和 prettier 冲突  --安装 eslint-config-prettier
    解决 ESLint 中的样式规范和 prettier 中样式规范的冲突，以 prettier 的样式规范为准，使 ESLint 中的样式规范自动失效 --安装 eslint-plugin-prettier
    eslint-plugin-prettier插件会调用prettier对你的代码风格进行检查，其原理是先使用prettier对你的代码进行格式化，然后与格式化之前的代码进行对比，如果过出现了不一致，这个地方prettier进行标记。
      
### 使用husky和lint-staged构建代码
    安装依赖
    pnpm add husky lint-staged -D
    修改package.json
    添加以下代码
        "husky": {
        "hooks": {
            "pre-commit": "lint-staged"
        }
    },
    "lint-staged": {
        "src*/**/*.ts": [
            "prettier --config .prettierrc.js --write",
            "eslint",
            "git add"
        ],
        "src*/**/*.json": [
            "prettier --config .prettierrc.js --write",
            "eslint",
            "git add"
        ]
    }
    这样，在执行git commit时，EsLint会检查提交的代码
###  增加setting.json配置
    在.vscode文件夹中增加`setting.json`配置文件，用于自动保存时，自动修复及检验代码。

### 安装commitizen 是一款标准化 git commit 信息的工具。
    pnpm add commitizen -D
    安装适配器（Adapter) cz-conventional-changelog
    pnpm add cz-conventional-changelog -D
    # 或者使用 commitizen 工具
    $ commitizen init cz-conventional-changelog --save-dev --save-exact
    commitizen 工具会自动在package.json中添加配置相应的配置，具体如下：
    "config": {
        "commitizen": {
        "path": "cz-conventional-changelog"
        }
    }
### 安装dart-sass代替node-sass
    pnpm add sass -S -D
### 使用Pinia状态管理
    pnpm add pinia -D

   