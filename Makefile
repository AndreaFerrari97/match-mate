# app name should be overridden.
# ex) production-stage: make build APP_NAME=<APP_NAME>
# ex) development-stage: make build-dev APP_NAME=<APP_NAME>

SHELL := /bin/bash

APP_NAME = match-mate
APP_NAME := $(APP_NAME)

.PHONY: help start clean db test

help:
	@grep -E '^[1-9a-zA-Z_-]+:.*?## .*$$|(^#--)' $(MAKEFILE_LIST) \
	| awk 'BEGIN {FS = ":.*?## "}; {printf "\033[32m %-43s\033[0m %s\n", $$1, $$2}' \
	| sed -e 's/\[32m #-- /[33m/'

#-- Docker
up-log-dev: ## Up the container dev images with logs
	docker-compose --env-file .env.development.local -f docker-compose.dev.yml up

up-dev: ## Up the container dev images
	docker-compose -f docker-compose.dev.yml up -d
#-- Docker
up-log-test: ## Up the container test images with logs
	docker-compose -f docker-compose.test.yml up

up-test: ## Up the container test images
	docker-compose -f docker-compose.test.yml up -d
#-- Docker
up-log-prod: ## Up the container images with logs
	docker-compose -f docker-compose.prod.yml up

up-prod: ## Up the container prod images
	docker-compose -f docker-compose.prod.yml up -d

down-prod: ## Down the container pimages
	docker-compose -f docker-compose.prod.yml down

down-dev: ## Down the container pimages
	docker-compose -f docker-compose.dev.yml down
	
down-test: ## Down the container pimages
	docker-compose -f docker-compose.test.yml down

build: ## Build the container image - Production
	docker build -t ${APP_NAME}\
		-f Dockerfile.prod .

build-dev: ## Build the container image - Development
	docker build -t ${APP_NAME}\
		-f Dockerfile.dev .

run: ## Run the container image
	docker run -d -it -p 3000:3000 ${APP_NAME}

pause: ## Pause the containers
	docker container rm -f ${APP_NAME}

clean: ## Clean the images
	docker rmi -f ${APP_NAME}

remove: ## Remove the volumes
	docker volume rm -f ${APP_NAME}

#-- Database
db: ## Start the local database MySQL
	docker-compose up -d mysql
