include .env

dbup: dbdown
	docker-compose -p doo_backend_dev -f ./docker/docker-compose.dev.yml up -d
	
dbdown:
	docker-compose -p doo_backend_dev -f ./docker/docker-compose.dev.yml down
	
migrateup:
	migrate -path dev/sql -database "postgres://${POSTGRES_USERNAME}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DATABASE_NAME}?sslmode=disable" -verbose up

migratedown:
	migrate -path dev/sql -database "postgres://${POSTGRES_USERNAME}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DATABASE_NAME}?sslmode=disable" -verbose down

wallet:
	nest start wallet-api
	
dev:
	docker-compose -p doo_backend_dev -f ./docker/wallet-api/docker-compose.sandbox.yml down
	docker-compose -p doo_admin_backend_dev -f ./docker/admin-api/docker-compose.sandbox.yml down
	docker-compose -p doo_backend_dev -f ./docker/wallet-api/docker-compose.sandbox.yml build --no-cache
	docker-compose -p doo_admin_backend_dev -f ./docker/admin-api/docker-compose.sandbox.yml build --no-cache  
	docker-compose -p doo_backend_dev -f ./docker/wallet-api/docker-compose.sandbox.yml up -d
	docker-compose -p doo_admin_backend_dev -f ./docker/admin-api/docker-compose.sandbox.yml up -d  


.PHONY: dbup dbdown migrateup wallet dev