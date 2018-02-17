FROM node:9.5

EXPOSE 80

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY ["package.json", "src", ".babelrc", "./"]
COPY ./node_modules ./node_modules

RUN npm install --global nodemon babel-core babel-cli

CMD [ "nodemon", "index.js", "--exec", "babel-node"]
