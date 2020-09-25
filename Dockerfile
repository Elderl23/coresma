# Stage 1
FROM node:10
WORKDIR /Angular8Blog
COPY . ./

ENV http_proxy="http://elopezfe:Gruposalinas23068943@10.50.8.20:8080"
ENV https_proxy="http://elopezfe:Gruposalinas23068943@10.50.8.20:8080"
ENV HTTP_PROXY="http://elopezfe:Gruposalinas23068943@10.50.8.20:8080"
ENV HTTPS_PROXY="http://elopezfe:Gruposalinas23068943@10.50.8.20:8080"

RUN npm install 

ENV http_proxy=""
ENV https_proxy=""
ENV HTTP_PROXY=""
ENV HTTPS_PROXY=""

EXPOSE 4200

CMD ["npm", "start"]
