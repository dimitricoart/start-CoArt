# CoArt

Welcome to CoArt monorepo.

## Installation

All commands are given for mac, please figure windows equivalents yourself

1. Clone repo from git

```shell script
git clone git@github.com:coartmarket/marketplace.git
```

2. Install [NVM](https://github.com/nvm-sh/nvm)

```shell script
sudo port install nvm

sudo echo "export NODE_OPTIONS=\"--max-old-space-size=16384\"" >>  /opt/local/share/nvm/init-nvm.sh
```

3. Install Node.js using NVM

```shell script
nvm install 22
nvm use 22
nvm alias default 22
```

4. Install Postgres, RabbitMQ, Redis using docker

```shell script
docker compose up -d
```

Then connect to Postgres and manually create `coart-development` database

5. Fill up sensitive keys in .env files

## DEV setup with Docker-compose

1. Preparation

```shell script
npm install -g @nestjs/cli
```

```shell script
npm i
npm run build
```

2. Run framework services one-by-one in separate terminals for easy monitoring

Front end

```shell script
npm run --prefix ./services/client start
```

Back end

```shell script
npm run --prefix ./services/server start
```

3. In case everything went off-rails stop all containers (if any) and clean existing postgres

```shell script
docker stop $(docker ps -a -q)
docker compose down -v
rm -rf postgres
```

## API docs

There is Swagger API documentation configured on

http://localhost:3001/swagger

## BLOCKCHAIN

Generate  MASTER_KEY
```shell
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## ARWEAVE

Prepare secret for GH
```shell
// ARDRIVE_PRIVATE_KEY
base64 -i ardrive-wallet.json -o ardrive-wallet.json.base64
```
https://docs.github.com/en/actions/how-tos/write-workflows/choose-what-workflows-do/use-secrets