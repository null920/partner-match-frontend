# 数字灯塔-伙伴匹配系统（前端）

基于 Vue 3 + Spring Boot 2 的移动端网站，实现了用户管理（复用另一个自己开发的用户中心）、根据标签
检索用户、随机匹配相似队友、组队等功能。

后端地址：[数字灯塔-伙伴匹配系统（后端）](https://github.com/null920/partner-match-backend)

## 技术栈

- Vue 3 https://cn.vuejs.org/
- Vue Router https://router.vuejs.org/zh/
- Vant 4 https://vant-ui.github.io/vant/#/zh-CN
- Vite https://www.vitejs.net/

## 快速开始

项目需要 Node.js 环境，如果没有 Node.js 环境，请先安装 Node.js https://nodejs.org/

1. 安装依赖

```bash
npm install
```

2. 运行项目

```bash
npm run dev
```

3. 访问 http://localhost:3000/

## 项目部署

### Docker打包上线

1. 安装 Docker https://docs.docker.com/get-docker/
2. 上传代码和 Nginx 配置文件到服务器
3. 进入项目目录
4. 构建 Docker 镜像
   ```bash
   docker build -t partner-match-frontend:v0.0.1 .
   ```
5. 运行 Docker 容器
   ```bash
   docker run -d -p 80:80 partner-match-frontend:v0.0.1
   ```