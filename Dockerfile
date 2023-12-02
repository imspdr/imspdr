# build react
FROM node:14 AS builder
WORKDIR /imspdr/front
COPY ./front .
RUN npm install
RUN npm run build


# nginx on

WORKDIR /imspdr
FROM nginx:latest
RUN rm -rf /etc/nginx/conf.d/*
COPY ./nginx.conf /etc/nginx/conf.d/

COPY --from=builder front/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]