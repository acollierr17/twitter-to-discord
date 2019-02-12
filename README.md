# donald-node

[![Join the Discord](https://discordapp.com/api/guilds/480231440932667393/embed.png)](https://discord.gg/g7wr8xb)

A Node.js application that posts tweets by [@realDonaldTrump](https://twitter.com/realDonaldTrump) to a Discord webhook.

![](https://i.imgur.com/em4QgSw.png)

## Pre-requisites
There are a few pre-requisites you will need to run this application:

- [Twitter Developer Account](https://developer.twitter.com/)
- [Discord Account](https://discordapp.com/)

## Discord Webhooks
If you're not sure how to create a Discord webhook, check out [Intro to Webhooks](https://support.discordapp.com/hc/en-us/articles/228383668-Intro-to-Webhooks).

## Running Locally
Make sure you have [Node.js](http://nodejs.org/) installed as well as Git SCM ([Windows](https://git-scm.com/download/win) | [Mac](https://git-scm.com/download/mac) | [Linux](https://git-scm.com/download/linux)) if you're going to go this route. Otherwise, simply clone the repo or download it and unzip it to a folder on your desktop.
```bash
$ git clone https://github.com/acollierr17/donald-node.git # or fork
$ cd donald-node
$ npm install
```
Rename `.env.example` to `.env` and update the file with its respective details. Afterward, start the applicaton.
```bash
$ npm start
```
The application should now be live! (Check the console if you need to double check anything).

## Deploying to Heroku
With the included `Procfile` you have the option of deploying the application to Heroku.

Make sure you have [Heroku CLI](https://cli.heroku.com/) installed before proceeding. You will need to download the Heroku Node.js buildpack first before moving along.
```bash
$ heroku create --buildpack https://github.com/heroku/heroku-buildpack-nodejs.git
```
Once the buildpack is installed, you may proceed with deployment.
```bash
$ heroku create
$ git push heroku master
$ heroku open
```
or

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

## Author
**donald-node** © 2019 [acollierr17](https://github.com/acollierr17).  
Currently authored and maintained by acollierr17.

> GitHub [@acollierr17](https://github.com/acollierr17)