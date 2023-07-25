FROM node:14.15-alpine AS build
WORKDIR /bizprofile
RUN npm cache clean --force
COPY . .
RUN npm install

RUN npm run build --prod --aot

#COPY package*.json ./
#RUN npm ci
#COPY . .
#RUN npm run build --prod --aot --outputHashing=none

FROM nginx:latest AS ngi
COPY --from=build /bizprofile/dist /usr/share/nginx/html
COPY /nginx.conf  /etc/nginx/conf.d/default.conf
EXPOSE 80

