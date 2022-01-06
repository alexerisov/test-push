# pull official base image
FROM node:14.15

# Get ARGS from --build-args
ARG NODE_ENV
ARG BASE_URL
ARG DOMAIN
ARG MAIN_CLIENT_IMAGE

# Pass ARGS to ENV
ENV NODE_ENV=${NODE_ENV}
ENV BASE_URL=${BASE_URL}
ENV DOMAIN=${DOMAIN}
ENV MAIN_CLIENT_IMAGE=${MAIN_CLIENT_IMAGE}

RUN echo "NODE_ENV $NODE_ENV"

# set working directory
WORKDIR /app

# install app dependencies
COPY package.json ./
COPY yarn.lock ./
RUN yarn install

# add app
COPY . ./
RUN yarn build

HEALTHCHECK --interval=12s --timeout=12s --start-period=10s \
 CMD curl --fail http://localhost:3000/health || exit 1

CMD ["yarn", "start"]
