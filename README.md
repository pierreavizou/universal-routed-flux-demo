# Universal Flux example with React and React-Router

**UPDATE 2** : *On the `immutable` branch you will find the app's TodoStore and LogStore implemented with Facebook's [Immutable](https://github.com/facebook/immutable-js) library. The implementation is inspired by [this one](https://github.com/MandarinConLaBarba/flux-immutable-todomvc).*

**UPDATE** : *On the `flux-utils` branch you will find the flux architecture implemented with Flux's bundled `flux/utils`.*

The code in this repo is intended for people who want to get started building universal flux applications, with modern and exciting technologies such as [React](https://facebook.github.io/react/), [React Router](https://github.com/rackt/react-router/) and [es6](https://github.com/ericdouglas/ES6-Learning).

It consists of an example Todo Application built with flux and inspired by the [Facebook Flux tutorial](https://facebook.github.io/flux/docs/todo-list.html).

The app has been rewritten to be fully universal (or ~~isomorphic~~), use es6, React Router, have a log component and provide asynchronous server communication.

It combines the following notions in a full-featured example:

* es6
* Using React Router with server-side rendering
* Flux architecture for universal applications
* Multi-store application
* Asynchronous server communication with visual feedback

![Visual feedback](https://raw.githubusercontent.com/pierreavizou/universal-routed-flux-demo/master/feedback.gif)

## Purpose

This example app is here in the hope that it will help people getting started building great apps that use these recent technologies.

After struggling to find guides and tutorials that combined everything I wanted to build an app, I decided to write and share an example of my own.

## Run the app

The first thing you should do is clone the repo.
Then, `cd`into the project folder and run `npm install`.
This will download all the dependencies.

Finally, all you have to do is run `node entrypoint.js` or `npm start`.

## Notes

This app purposely uses no flux framework. The main reason is that frameworks usually hide many stuff from the user, which prevents from understanding properly how things work.

Plus, the Flux architecture is reasonably clean, simple and elegant by itself, so using a framework is often not necessary, especially in example code.
