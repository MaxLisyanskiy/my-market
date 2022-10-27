FROM node:16.18-alpine3.15

RUN apk add --no-cache git

#ENV HOST 0.0.0.0

WORKDIR /var/www
#VOLUME /var/www

COPY ./src /var/www

RUN yarn && yarn run build
#CMD yarn && yarn run build && yarn run start
CMD yarn run start
