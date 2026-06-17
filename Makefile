.PHONY: dev build lint test db-generate db-push db-studio \
        dev-client dev-server build-client build-server \
        start preview clean setup install

dev:
	npm run dev

dev-client:
	npm run dev -w client

dev-server:
	npm run dev -w server

build:
	npm run build

build-client:
	npm run build -w client

build-server:
	npm run build -w server

lint:
	npm run lint

start:
	npm run start -w server

preview:
	npm run preview -w client

test:
	npm run test:e2e

db-generate:
	npm run db:generate -w server

db-push:
	npm run db:push -w server

db-studio:
	npm run db:studio -w server

install:
	npm install

setup: install db-generate db-push

clean:
	rm -rf client/dist server/dist node_modules
