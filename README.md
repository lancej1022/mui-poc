# Component library that generates "unique key" errors for no reason

This is a minimal reproduction of a component library based on MUI that will generate react `unique key` errors if you attempt to render the Checkbox or Tooltip (as well as other components).

To reproduce the error, clone the library to your local machine and then `npm ci` to load the dependencies.
Next, run `npm run build:prod` to create a production bundle, and then use `npm link` to run the library against a fresh React app via Create-react-app or something similar.

Within your fresh React application, just import the `Tooltip` and `Checkbox` components from this library while linked and then render them to the page. You will see the react errors.

While linked, you can then run `npm run build:dev` to generate a development build. The Tooltip and Checkbox in you React app should no longer throw the unique key errors in the console.
