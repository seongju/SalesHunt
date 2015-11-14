# amazonAPIHeroku

Backend for our mobile application SalesHunt

## Running Locally

Make sure you have [Node.js](http://nodejs.org/) and the [Heroku Toolbelt](https://toolbelt.heroku.com/) installed. Also make sure to fill out your Amazon credentials either in a .env file or overwriting in the index.js file.

```sh
cd amazonAPIHeroku
npm install
npm start
```

Your app should now be running on [localhost:5000](http://localhost:5000/).

## Deploying to Heroku

```
heroku create
git push heroku master
heroku open
```