.PHONY: dev

docker-down:
	docker compose down
	
docker-up: docker-down
	docker compose up -d

	sleep 10
front: docker-up 
	cd frontend && npm run dev