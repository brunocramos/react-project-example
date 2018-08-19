# react-project-example

> React Project Example - Simple Boilerplate

## Content

This repository contains a simple project example for React - which works as a boilerplate as well.
Contents:

- React 16.4.1 not ejected
- Sass
- CSS Modules
- [orbit-style](https://github.com/radargovernamental/orbit-style) - Radar Governamental's Design System - to show a use case of it
- Show case of best practices for project structuring (explained below)
- GraphQL with Apollo
- React Router V4
- Environment setup

## Project structuring

This structure was based on this [Medium Post](https://hackernoon.com/structuring-projects-and-naming-components-in-react-1261b6e18d76)

We are following two main patterns here:
1. Containers and presentational components

In `/components/[feature]`, we have a directory to define that feature's main components. Inside each feature, all base files are containers and all directories are presentational components. Exemple:

```bash
/components/Users
/components/New.js         // Container
/components/Edit.js        // Container
/components/List.js        // Container
/components/Form/User.js   // Presentational
/components/Form/User.module.scss // Scss for that component, if needed
/components/List/List.js   // Presentational
```

2. Screens/Routes following its path's patterns
Considering we have a `/users/list`, `/users/new`:
```bash
/screens/Users
/screens/Users/Users.js       // Main route for /users
/screens/Users/List/List.js   // Main route for /users/list
/screens/Users/New/New.js     // Main route for /users/new
```
Using this format allow was to make it easier to navigate using our IDE shortcuts and to better insert nested routes.


## Install

```bash
yarn install
```

Requires Node.JS version >= 10.6.0

## Environment

Set .env.[development|production] for environment variables. All variables started with REACT_APP are automatically injected into the application. use .env.default as template


## Usage

```bash
yarn start
yarn build
yarn lint
yarn test

```
