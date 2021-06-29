FROM node:alpine
WORKDIR /usr/app
COPY ./code/package.json ./
RUN npm install
COPY ./code/ ./
CMD ["npm", "start"]
