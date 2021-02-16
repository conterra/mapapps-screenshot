# dn_screenshot
This bundle makes it possible to take screenshots of you current map view. It provides two tools.
One that takes screenshots based on the configuration in the app.json/manifest.json.
The second one also provides a user interface for configuration.

## Usage
**Requirement: map.apps 4.9.2**

1. First you need to add the bundle screenshot to your app.
2. Then you can configure it as described in the section.

To make the functions of this bundle available to the user, the following tool can be added to a toolset:

| Tool ID               | Component            | Description                       |
|-----------------------|----------------------|-----------------------------------|
| screenshotTool        | ScreenshotTool       | Basics Screenshots                |
| screenshotToggleTool  | ScreenshotToggleTool | Screenshots with User Interface   |

## Configuration Reference

### Config

This configures the ScreenshotTool.

#### Sample configuration
```json
"Config": {
    "format": "jpg"
}
```

| Property         | Type    | Possible Values                | Default       | Description                                                                                             |
|------------------|---------|--------------------------------|---------------|---------------------------------------------------------------------------------------------------------|
| format           | String  | ```"png"``` &#124; ```"jpg"``` | ```"png"```   | specify the format of the screenshot                                                                    |
| quality          | Integer | ```0``` to ```100```           | ```98```      | specify the quality of the screenshot. this will be ignored if the format is "png"                      |
| ignoreBackground | Boolean | ```true``` &#124; ```false```  | ```false```   | specify if the Background Color of the view is ignored (this is only relevant if no basemap is defined) |
