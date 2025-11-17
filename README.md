[![devnet-bundle-snapshot](https://github.com/conterra/mapapps-screenshot/actions/workflows/devnet-bundle-snapshot.yml/badge.svg)](https://github.com/conterra/mapapps-screenshot/actions/workflows/devnet-bundle-snapshot.yml)
![Static Badge](https://img.shields.io/badge/requires_map.apps-4.20.0-e5e5e5?labelColor=%233E464F&logoColor=%23e5e5e5)
![Static Badge](https://img.shields.io/badge/tested_for_map.apps-4.20.0-%20?labelColor=%233E464F&color=%232FC050)

# Screenshot Bundle

This bundle provides two tools to take simple or configured screenshots of the map.

## Sample App
https://demos.conterra.de/mapapps/resources/apps/public_demo_screenshot/index.html

## Installation Guide

Load the bundle "dn_screenshot" and add the "screenshotTool" or "screenshotToggleTool" to your app.
The "screenshotTool" simply provides a button for taking screenshots.
The "screenshotToggleTool" opens a User Interface to configure the Screenshot beforehand.
E.g. you can adjust the extent, format and quality of the shot.

[dn_screenshot Documentation](https://github.com/conterra/mapapps-streetsmart/tree/master/src/main/js/bundles/dn_screenshot)

## Development Guide
### Define the mapapps remote base
Before you can run the project you have to define the mapapps.remote.base property in the pom.xml-file:
`<mapapps.remote.base>http://%YOURSERVER%/ct-mapapps-webapp-%VERSION%</mapapps.remote.base>`

### Other methods to to define the mapapps.remote.base property.
1. Goal parameters
`mvn install -Dmapapps.remote.base=http://%YOURSERVER%/ct-mapapps-webapp-%VERSION%`

2. Build properties
Change the mapapps.remote.base in the build.properties file and run:
`mvn install -Denv=dev -Dlocal.configfile=%ABSOLUTEPATHTOPROJECTROOT%/build.properties`
