# DS BCGOV Map

To use this package, add via NPM or Yarn.

`yarn add @digitalspace/ds-bcgov-map`

Then install the package:

`yarn`

In your Angular code use the following tags:

`<lib-ds-bcgov-map></lib-ds-bcgov-map>`

You must also include this in your head tag of your application:

`<script src="https://maps.googleapis.com/maps/api/js?key=CHANGEME&libraries=places"></script>`

Be sure to change `CHANGEME`to your Google Maps API key.

You will also need to inlcude the package's assets to your project. Add the following to your angular.json's asset array under architect:

```
{
    "glob": "**/*",
    "input": "./node_modules/@digitalspace/ds-bcgov-map/lib/assets",
    "output": "./assets"
}
```
