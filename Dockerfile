FROM node:22.9.0

WORKDIR /coodesh-challenge-radio/

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]