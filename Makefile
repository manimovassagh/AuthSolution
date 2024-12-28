.PHONY: dev

down:
	docker compose down
	
docker-up: 
	docker compose up -d

	sleep 10
front: docker-up 
	cd frontend && npm run dev