# Stage 1
FROM node:10
WORKDIR /Angular8Blog
COPY . ./

RUN npm install

EXPOSE 4200

CMD ["npm", "start"]
