# Étape 1 : Build
FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./

# Utilise soit npm install, soit npm ci --only=production
RUN npm install

COPY . .

RUN npm run build

# Étape 2 : Production
FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]