# build react
FROM node:14 AS builder
WORKDIR /front
COPY ./front .
RUN npm install
RUN npm run build

# build backend
FROM python:3.7.8-slim-buster
WORKDIR /back

# install dependencies
RUN pip install --upgrade pip
COPY ./back/requirements.txt .
RUN pip install -r requirements.txt

COPY ./back .
RUN python proxy/run.py

# nginx on

FROM nginx:latest
RUN rm -rf /etc/nginx/conf.d/*
COPY ./nginx.conf /etc/nginx/conf.d/

COPY --from=builder front/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]