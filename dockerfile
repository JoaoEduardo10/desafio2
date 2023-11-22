FROM node

WORKDIR /app

COPY . .

RUN yarn

RUN yarn build

CMD [ "yarn", "start" ]
