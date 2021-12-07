# pull official base image
FROM node:14.15

ARG NODE_ENV=production

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
