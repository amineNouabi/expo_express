## Description:

This is a simple project to demonstrate the use of clean code architecture in a simple API and mobile app with Typescript. The API is built using Node.js and Express.js, while the mobile app is built using React Native. The API is a simple CRUD API for managing users, while the mobile app is a simple app for managing users.

## Monorepo:

This project is a monorepo managed using Lerna. It contains two packages: `server` and `mobile`.

Lerna manages the dependencies between the two packages it downloads the dependencies in the root `node_modules` folder and symlinks them in the `node_modules` folder of each package to avoid duplication.

Lerna also allows running scripts in all packages at once.

## Structure:

- `server`: The server part of the application.
- `mobile`: The mobile app part of the application.


## Used Technologies:

- Lerna (monorepo managing)
- Yarn (package managing and workspace managing)
- Typescript 
- React Native
- Node.js
- Express.js
- MongoDB
- Mongoose
- Prisma (ORM)
- winston (customized logging)
- ESLint (linting)
- Prettier (code formatting)

## How to run the project:

### Serverss:

1. Clone the repository
2. Navigate to the `sever` directory
3. Run `yarn install`
4. Run `yarn run dev`

### Mobile App:

1. Clone the repository
2. Navigate to the `mobile` directory
3. Run `yarn install`
4. Run `yarn run android` or `yarn run ios`

## Run both projects:

1. Clone the repository
2. Run `yarn install`
3. Run `yarn run dev`
