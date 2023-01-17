# Wishlist App [WIP]

To get up and running after cloning:

```bash
cd wishlistapp
npm i # install required packages
npm run prepare # initialize husky
npm run dev # starts the dev server
```

Follow the instructions [here](/doc/environment.md) to set up your environment.

Now open your browser @ http://localhost:3000 and the app should be live

## Background

The idea behind this app came from me wanting to send an aggregated wishlist of items I wanted for my birthday to my friends. One issue I faced with that is most shopping sites have their individual wishlist sections, but I hardly only shop from one website, and for many websites, I couldn't share my wishlist with my friends. Therefore I decided to see if I could build my own shareable wishlist which has items from various online shopping platforms all in one place so my friends could buy me surprise gifts.

## Architecture

A more complete description of the architecture of the app is documented [here](/doc/architecture.md)

## List of Frameworks used

- [`passport.js`](https://www.passportjs.org/): Used for user authentication and session management
- [`Mongoose.js`](https://mongoosejs.com/): Used for connection to the MongoDB database
- [`NextJS`](https://nextjs.org/): General framework for application. React-based, but with backend capabilities like handling server requests using API routes
- [`material-ui`](https://mui.com/): Component library for some parts of the user interface
- [`tailwindcss`](https://tailwindcss.com/): CSS framework, used for making styling of HTML elements easier than writing traditional CSS
- [`bootstrap`](https://getbootstrap.com/): CSS framework with some UI components, also used for styling HTML elements.
- [`husky`](https://typicode.github.io/husky/#/): Used to run formatting and linting scripts before commit code, to ensure it runs fine
