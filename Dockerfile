FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --no-optional && npm cache clean --force

COPY . .

USER node

EXPOSE 3000

CMD ["npm run start"]