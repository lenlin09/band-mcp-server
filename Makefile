.PHONY: help install build dev start test clean lint lint-fix docker-build docker-run setup run docker-test

# 默认目标
help:
	@echo "Available commands:"
	@echo "  help          显示帮助信息"
	@echo "  install       安装依赖"
	@echo "  build         构建项目"
	@echo "  dev           开发模式运行（热重载）"
	@echo "  start         启动生产版本"
	@echo "  test          运行测试"
	@echo "  clean         清理构建文件"
	@echo "  lint          代码检查"
	@echo "  lint-fix      自动修复代码格式"
	@echo "  docker-build  构建Docker镜像"
	@echo "  docker-run    运行Docker容器"
	@echo "  setup         完整项目设置（安装+构建）"

# 安装依赖
install:
	npm install

# 构建项目
build:
	npm run build

# 开发模式（热重载）
dev:
	npm run dev

# 启动生产版本
start: build
	npm start

# 运行测试
test:
	npm test

# 清理构建文件
clean:
	rm -rf dist/
	rm -rf node_modules/.cache/
	rm -rf coverage/

# 代码检查
lint:
	npm run lint

# 自动修复代码格式
lint-fix:
	npm run lint:fix

# 构建Docker镜像
docker-build:
	@echo "开始构建Docker镜像..."
	docker build --progress=plain -t band-mcp-server:latest .
	@echo "Docker镜像构建完成"

# 查看Docker构建日志
docker-build-debug:
	docker build --no-cache --progress=plain -t band-mcp-server:latest .

# 运行Docker容器进行测试
docker-run: docker-build
	docker run --rm -i --env-file .env band-mcp-server:latest

# 测试Docker镜像中的MCP服务器
docker-test: docker-build
	@echo "测试Docker镜像中的MCP服务器..."
	@echo '{"jsonrpc": "2.0", "id": 1, "method": "tools/list", "params": {}}' | docker run --rm -i --env-file .env band-mcp-server:latest

# Docker构建并测试完整流程
docker-full: docker-build docker-test
	@echo "Docker构建和测试完成"

# 为Claude配置准备Docker镜像
docker-prepare: docker-build
	@echo "Docker镜像构建完成，可以在Claude中配置使用"
	@echo "镜像名称: band-mcp-server:latest"
	@echo "请参考README.md中的Claude配置示例"

# 完整项目设置
setup: install build
	@echo "项目设置完成！"
	@echo "运行 'make dev' 开始开发"
	@echo "运行 'make start' 启动生产版本"

# 快速重新构建和启动
restart: clean build start

# 检查环境变量配置
check-env:
	@echo "检查环境变量配置..."
	@if [ ! -f .env ]; then \
		echo "错误: .env 文件不存在"; \
		echo "请复制 .env.example 到 .env 并配置相应的值"; \
		exit 1; \
	fi
	@echo "环境变量配置检查完成"

# 启动前检查
pre-start: check-env
	@echo "启动前检查完成"

# 安全启动（包含环境检查）
safe-start: pre-start start

# 开发环境完整启动
dev-full: setup dev

# 检查Docker环境
docker-check:
	@echo "检查Docker环境..."
	@docker --version
	@docker info --format '{{.OSType}}/{{.Architecture}}'
	@echo "检查项目文件..."
	@ls -la
	@echo "检查package.json..."
	@cat package.json | head -20
