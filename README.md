# FHIRKit Create React App

A [create-react-app](https://github.com/facebook/create-react-app) template
using the [FHIRKit Client](https://github.com/Vermonster/fhir-kit-client) with
an Express.js server.

View an example deployment of the app at
[https://fhir-kit-react.herokuapp.com](http://fhir-kit-react.herokuapp.com/).

## Installing

NOTE: If you are on windows, you should consider a bash shell, such as enabling the [WSL](https://docs.microsoft.com/en-us/windows/wsl/about).

```
$ npm install -g create-react-app
$ npm install -g craftool
```

## Using the template

```
$ craft MyFHIRKitApp https://github.com/Vermonster/fhir-kit-create-react/archive/master.zip

$ cd MyFHIRKitApp
$ npm run install-kit
```

## Running the app

`npm start` will use
[Concurrently](https://github.com/kimmobrunfeldt/concurrently) to run
`server/main.js` and `react-scripts start`. The app starts out with an example
of a patient name search using FHIRKit Client surfaced to a React app using
[Ant Design](https://github.com/ant-design/ant-design) UI components.

## Deployment to Heroku

You will need to install the [Heroku CLI tools](https://devcenter.heroku.com/articles/heroku-cli).

Update the react build with `npm build`. Use the example express server to
serve the new build. For example:

```
$ npm run build
$ git init .
$ git add .
$ git commit -m "Initial commit for my new FHIRKit create react app"
$ heroku create
$ git subtree push --prefix src/server heroku master
$ heroku open
```

## License

MIT

Copyright (c) 2019 Vermonster LLC
