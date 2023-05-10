FROM node:19-alpine

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

RUN npm install \
        && npm install typescript -g

# Copy the entire directory to the container
COPY . .

RUN tsc

CMD ["node", "./dist/server.js"]
