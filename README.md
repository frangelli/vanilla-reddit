# Zen Articles

## A running demo can be found [HERE](https://pure-forest-53577.herokuapp.com/)

Reddit style application developed using:

### Backend:

- Ruby on Rails API
- Postgres

### Frontend:

- VanillaJS ( No frameworks... not even jQuery )
- Lodash ( for templating )
- Webpack for building and compiling
- SCSS
- axios for requests ( better then fetch... )

## App Structure

I've created the API using rails and inside the rails app directory, I've created the `frontend` directory with all the frontend related code and files...

When building the frontend, it will build to rails `public` directory.

## To run locally

Assuming you have rails, postgres and nodejs installed with npm on your machine...

From the root directory run:

- `bundle install` to install rails app dependences
- `rails db:create`
- `rails db:migrate`
- `rails db:seed` to create the fake data...
- `rails s` to boot the rails server and your app will be running at `localhost:3000`
