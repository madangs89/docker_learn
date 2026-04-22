FROM node

WORKDIR /app

COPY package*.json ./

ENV NODE_ENV=development \
    PORT=3000 \
    MONGO_DB_USERNAME=admin \
    MONGO_DB_PASSWORD=qwerty 

RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]
    

