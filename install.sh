docker-compose up -d --build
docker-compose exec web npm install
docker-compose exec web npm run dev