# Screenshot

This bundle provides two tools to take simple or configured screenshots of the map.

## Usage
Load the bundle "screenshot" and add the "screenshotTool" or "screenshotToggleTool" to your app.
The "screenshotTool" simply provides a button for taking screenshots.
The "screenshotToggleTool" opens a User Interface to configure the Screenshot beforehand.
E.g. you can adjust the extent, format and quality of the shot.

## Configuration Reference

```json
"Config": {
    "format": "jpg"
}
```

| Property         | Type    | Possible Values                | Default       | Description                                          |
|------------------|---------|--------------------------------|---------------|------------------------------------------------------|
| format           | String  | ```"png"``` &#124; ```"jpg"``` | ```"png"```   | specify the format of the screenshot                 |
| quality          | Int     | ```0``` to ```100```           | ```98```      | specify the quality of the screenshot                |
| ignoreBackground | Boolean | ```true``` &#124; ```false```  | ```false```   | specify if the Background Color of the view is ignored (this is only relevant if no basemap is defined) |
