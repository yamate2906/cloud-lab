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

## Deploy on Render

The Docker images can also be used as Render Web Services. Build and push new Render tags from the repository root:

```sh
docker build -t admin2906/mern-backend:render-2.0 ./mern-demo/server
docker build -t admin2906/mern-frontend:render-2.0 ./mern-demo/client
docker push admin2906/mern-backend:render-2.0
docker push admin2906/mern-frontend:render-2.0
```

Create the Backend Web Service from `admin2906/mern-backend:render-2.0`, with internal port `5000`, and set `MONGODB_URI`, `PORT=5000`, `NODE_ENV=production`, and `CLIENT_URL=https://<frontend-service>.onrender.com`. Create the Frontend Web Service from `admin2906/mern-frontend:render-2.0`, use port `10000`, and set `PORT=10000` plus `BACKEND_URL` to the Backend's private Render address and port, for example `http://<backend-service>:5000`. Keep the MongoDB URI only in the Backend's environment settings or a private Render Environment Group. Configure the Backend health check path as `/health`.

For GitHub Actions CI/CD, add repository secrets `DOCKERHUB_USERNAME`, `DOCKERHUB_TOKEN`, `RENDER_BACKEND_DEPLOY_HOOK`, and `RENDER_FRONTEND_DEPLOY_HOOK`. The workflow in `.github/workflows/render-deploy.yml` builds both images on changes to `mern-demo/server` or `mern-demo/client`, publishes `render-2.0` and `latest`, then calls the configured Render deploy hooks. Create the hooks in each Render service's settings and keep their URLs private.

The Frontend serves the built React files and proxies `/api/*` to `BACKEND_URL`, so browsers use one origin and don't need a public API URL or cross-origin CORS request. `CLIENT_URL` is only needed if a browser client calls the Backend URL directly. Render account creation, service creation, secrets, domains, deployments, and cloud-side verification still have to be completed in the account dashboard.

On EC2, pull the new images and apply the Hub configuration:

```sh
docker compose -f docker-compose.hub.yml pull
docker compose -f docker-compose.hub.yml up -d
```

## Verify and update

Use `docker compose ps`, `docker compose logs backend`, `curl http://localhost/api/hello`, and `sudo nginx -t`. Update the title in `client/src/App.jsx`, rebuild, tag/push the Frontend image, pull it on EC2, and run Compose again.
