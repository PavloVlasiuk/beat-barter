# Beat Barter

Project was created by Pavlo Vlasiuk and Chernykova Daria.

Design document - [click](https://docs.google.com/document/d/1UhlId4aXXsPcKrActcc0iPWn0veZyndDplGG6fF1lJQ/edit?usp=sharing)

Code review:

- [by Chernykova Daria](https://github.com/PavloVlasiuk/beat-barter/pull/5)
- [by Vlasiuk Pavlo](https://github.com/PavloVlasiuk/beat-barter/pull/7)

See more in our pull requests.

# Description

Beat Barter is web application that can help you to transfer your playlists from Youtube Music to Spotify if you've decided to change your music platform ;)

# Installation guide

Firstly, clone the repository:
```bash
git clone https://github.com/PavloVlasiuk/beat-barter
```

Up the database with docker compose and run migrations:
```bash
docker compose up beat-db -d
npm run migrate
```

Create .env file with such data:
```
PORT=
HOST=

DATABASE_URL=

SMTP_HOST=
SMTP_USER=
SMTP_PASSWORD=

JWT_SECRET=
JWT_TTL=
JWT_REFRESH_TTL=

FRONT_BASE_URL=

SPOTIFY_BASE_AUTH_URL=
SPOTIFY_API_URL=
SPOTIFY_CLIENT_ID=
SPOTIFY_CLIENT_SECRET=
REDIRECT_URI=

YOUTUBE_MUSIC_API_KEY=
YOUTUBE_MUSIC_API_URL=
```

Run backend:
```bash
// move to api directory
cd beat-barter-api

// install dependencies
npm install

// run api
npm run start
```

Run fronted: 
```bash
// in root project dorectory:
cd beat-barter-web

// install dependencies
npm install

// run web
npm start
```
Open your web app in browser, by default it starts on  http://localhost:3000.

# Running in docker
You can up backend in docker environment. Just run one command:
```bash
docker compose up --build
```
This will up database, run migrations, and up the application. Then you can start frontend as described above and enjoy our app.




