FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

#envvvv cade???
COPY . .

EXPOSE 8080

CMD ["npm", "run", "dev"]
