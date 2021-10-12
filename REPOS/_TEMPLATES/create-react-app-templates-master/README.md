# Create React App Templates

Preconfigured templates for your next create-react-app project.

### Getting Started

1. Use template published on NPM

or

1. Fork or Clone this repository.
2. From the directory you want to create the new application in, run the following command:

```
create-react-app <app-name> --scripts-version @reedsa/react-scripts --internal-testing-template <template>
```

* Replace `<app-name>` with the name of your project
* Replace `<template>` with the relative path to the template (starting with `./` or `../`) or the name of the template published on NPM.

> **Example using NPM package:**
>
> Create a "beautiful-sass-app" project with the "sass" template published on NPM using this command:
>
```
create-react-app beautiful-sass-app --scripts-version @reedsa/react-scripts --internal-testing-template @reedsa/sass-template
```

> **Example using local template:**
>
> Create a "sweet-redux-app" project alongside the create-react-app-templates project with the "accelerator" template using this command:
>
```
create-react-app excellent-redux-app --scripts-version @reedsa/react-scripts --internal-testing-template ./create-react-app-templates/packages/accelerator
```

### Templates

This repository contains templates that can be used by create-react-app when bootstrapping an application.

##### default

This is the base template from create-react-app that any new templates should use as a starting point.

##### Accelerator

Based on the original [accelerator](https://github.com/marcgarreau/accelerator) starter kit for a React and Redux application. Special thanks to all the [contributors](https://github.com/marcgarreau/accelerator/graphs/contributors) for making this possible.

```
create-react-app awesome-react-accelerator-app --scripts-version @reedsa/react-scripts --internal-testing-template @reedsa/accelerator-template
```

##### Redux

Great starting point for your next React and Redux application. Includes a few patterns such as asynchronous requests, logging in with a username and password. Requires a separate server with the proper API endpoints to respond to the requests.

```
create-react-app incredible-react-redux-app --scripts-version @reedsa/react-scripts --internal-testing-template @reedsa/redux-template
```

##### Sass

Uses the [recommended approach](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-a-css-preprocessor-sass-less-etc) for integrating with Sass, a CSS Preprocessor. The node-sass-chokidar package addresses some issues with node-sass.

```
create-react-app sweet-react-sass-app --scripts-version @reedsa/react-scripts --internal-testing-template @reedsa/sass-template
```

##### More Templates

We're always happy to consider more templates for this project. Please review the [contributing guide](.github/CONTRIBUTING.md) to submit a new template.

Here are a few others that might be useful:
* Express: Run your application on an [express](http://expressjs.com/) server.
* Flow
* Material Components Web
* Storybook
* CircleCI configuration for automated deployments
* Deployment with Heroku
* Deployment with AWS
