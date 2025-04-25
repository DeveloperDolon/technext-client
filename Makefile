start:
	docker compose up
build:
	docker compose build
stop:
	docker compose down
bash:
	docker compose exec -it app sh