# AngularTextareaReduxDemo

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.0.


Core Requirements:

Start a new Angular 7 project
Create an angular component
Ability to input text similar to a textarea
Ability to resize textarea inside UI component with mouse interaction
Ability to use ‘@’ symbol to input a profile name
Return a list of suggested profile names that matches input
As you type it’ll narrow down the list of profile names returned
Select from suggested list
Selected profile becomes an entity reference of its own within the textarea component
Ability to continue to input text
Ability to remove profile name added with keyboard backspace and delete depending on direction of the cursor. When cursor hit the entity reference it’ll focus on then remove the entire profile entity reference if delete or backspace is triggered and not a character a time.
Ability to save the content in textarea in redux store
Do not use any component libraries unless
Angular CDK is allowed




## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
