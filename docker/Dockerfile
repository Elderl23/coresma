FROM nginx:latest

RUN rm /etc/nginx/conf.d/default.conf

COPY ./django.conf /etc/nginx/conf.d/default.conf

COPY ./dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

