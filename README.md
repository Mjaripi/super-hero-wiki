# Superhero Wiki
A test connection project to the [SuperHero API](https://superheroapi.com/index.html)

The project is divided in two parts:
* a **react client** (on the client folder) to handle the query an visualize the data.
* a **node express client** (on the cors folder) to wrap the API requests and realize some web scraping.

To run the project it's needed to run the following commands in two separated terminals from the root folder:
```bash
cd client && npm i && npm start
```
```bash
cd cors && npm i && npm run cors
```

Note: The base amount of heros are capped to 20. This for testing purpuses, it can be adjusted or removed on app.tsx.
