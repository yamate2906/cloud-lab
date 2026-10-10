# MERN student manager deployment

## Configuration

Create `server/.env` from `server/.env.example` and set a MongoDB Atlas URI. Keep this file out of Git and Docker images. The frontend uses the same-origin `/api` path so Nginx can route API traffic to the backend.

## Run with Docker Compose

From this directory:

```sh
docker compose config
docker compose up -d --build
docker compose ps
docker compose logs backend frontend
```

Nginx on the host serves port 80. Docker binds the Frontend and Backend to loopback ports 4173 and 5000. The Nginx config is in `nginx/default.conf`.

## Deploy to Amazon Linux EC2

Install Docker, the Docker Compose plugin, and Nginx. Copy this folder to `~/mern-app`, create `server/.env`, and run:

```sh
cd ~/mern-app
docker compose config
docker compose up -d --build
sudo install -m 644 nginx/default.conf /etc/nginx/conf.d/mern.conf
sudo nginx -t
sudo systemctl enable --now nginx
```

The EC2 security group must allow inbound TCP 80 from the intended client networks. For direct API checks, TCP 5000 can be allowed temporarily; normal browser traffic uses `/api` through Nginx. Confirm the Frontend and API at `http://<EC2-public-IP>/` and `http://<EC2-public-IP>/api/students`.

## Publish images to Docker Hub

Authenticate with Docker Hub, then build and publish the tags referenced in `docker-compose.hub.yml`:

```sh
docker compose build
docker push admin2906/mern-backend:aws-2.0
docker push admin2906/mern-frontend:aws-5.0
```

On EC2, pull the new images and apply the Hub configuration:

```sh
docker compose -f docker-compose.hub.yml pull
docker compose -f docker-compose.hub.yml up -d
```

## Verify and update

Use `docker compose ps`, `docker compose logs backend`, `curl http://localhost/api/hello`, and `sudo nginx -t`. Update the title in `client/src/App.jsx`, rebuild, tag/push the Frontend image, pull it on EC2, and run Compose again.
