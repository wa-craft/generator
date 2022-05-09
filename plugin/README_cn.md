# wa-craft/plugin

wa-craft 的插件目录。
每个具体的模板目录下都有三个子目录：
- handler 模板的处理程序
- resource 应用的原始文件结构
- template 代码模板

## command-line 命令行代码模板目录
路径方式：
`{$langauge}/{default | $library}`

## frontend 前端代码模板目录
路径方式：
`{$langauge}/{$framework[$version]}[-$mod]`

## backend 后端代码模板目录
路径方式：
`{$langauge}/{$framework[$version]}[-$library[$library_version]]`

## operation 服务治理文件模板目录
路径方式：
`{$catalog}/{$service[$version]}`