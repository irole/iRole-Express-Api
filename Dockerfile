FROM node:16.14-alpine

WORKDIR /app
COPY package.json .
RUN npm i npm -g
RUN npm install --only=prod
COPY . .

CMD ["npm","run", "start-docker"]
EXPOSE 3000
