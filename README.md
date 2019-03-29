# Customer Feedback

A tiny React application for gathering customers' feedback.

## Design notes

The client is **desktop-only** and was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). It uses [Redux](https://redux.js.org/) for state management, [React Router](https://reacttraining.com/react-router/) for client-side routing and [Redux-Saga](https://redux-saga.js.org/) for communication with the "server" (see below).

This project is written with [TypeScript](https://www.typescriptlang.org).

Application is divided into 2 modules:
- `ui-components` contains only presentational components which could be shared between other modules
- `feedback` contains all the code relevant to the context "feedback"

`feedback` Module contains presentational and container components for the context "feedback", as well as the interfaces used within this context, reducer, store, actions and sagas.

Though the application does not communicate with a real server, it's built in the way which allows introducing one pretty fast: single thing which should be done is replacing the URLs used in sagas with URL of the real server and eventual adjusting of the results parsing.

For testing the following tools are used:
- test framework: [jest](https://jestjs.io)
- react test lib: [enzyme](https://airbnb.io/enzyme/)
- jest assertions for enzyme: [enzyme-matchers](https://github.com/FormidableLabs/enzyme-matchers)

## How to run in the development mode

Run `npm start` in the app folder.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

## How to build a production version

Run `npm run build` in the app folder, which will build the app for production to the `build` folder.<br>
Your app is ready to be deployed!

## How to test application

Run `npm test` to launch the test runner in the interactive watch mode.<br>
