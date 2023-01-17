# Setting up the Development Environment

NextJS is very flexible with environment files. You can create a file `.env` or `.env.local` with the following variables defined:

- `MONGODB_URI='<your-mongodb-connect-string>'`: you can install mongodb locally by following instructions [here](https://www.mongodb.com/docs/manual/installation/) and create a connect string by following instructions [here](https://zellwk.com/blog/local-mongodb/#:~:text=To%20connect%20to%20your%20local,databases%20in%20your%20local%20MongoDB.)
- `TOKEN_SECRET='<your-random-long-string>'`: should be at least 32 characters
