.PHONY: dev

down:
	docker compose down
	
docker-up: 
	docker compose up -d
	sleep 10

backend:
	cd backend && npm run dev

front: 
	cd frontend && npm run dev

dev:
	make docker-up
	make front