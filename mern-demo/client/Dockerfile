FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx/default.conf.template /etc/nginx/templates/default.conf.template
ENV PORT=4173 BACKEND_URL=http://backend:5000
ENV NGINX_ENVSUBST_FILTER=^(PORT|BACKEND_URL)$
EXPOSE 4173
