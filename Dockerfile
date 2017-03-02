FROM node:7.5

EXPOSE 80

ENV NODE_ENV=production

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/

RUN npm install --global babel-watch babel-core
RUN npm install
COPY . /usr/src/app

LABEL traefik.backend=e_commerce_user_api
LABEL traefik.frontend.rule=Host:localhost;PathPrefixStrip:/api/user
LABEL traefik.port=80
LABEL traefik.frontend.entryPoints=http

CMD [ "babel-watch", "index.js"]
