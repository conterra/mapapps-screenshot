/*
 * Copyright (C) 2021 con terra GmbH (info@conterra.de)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
export default class ScreenshotControl {
    /**
     * This lets the user create a rectangle that is used as the extent of the screenshot. The rectangle is permanently
     * visualized on the map as a graphic using actionService.
     */
    createDrawing() {
        const view = this.model.view
        this.stopPanning = true;
        view.on("drag", (event) => {
            if (this.stopPanning) {
                event.stopPropagation();
            }
        });
        this.canvas = this.model.view.container
        if (this.canvas) {
            const mouse = {
                x: 0,
                y: 0,
                startX: 0,
                startY: 0
            };
            let element = null;

            this.canvas.onmousemove = (e) => {
                const ev = e || window.event; //Moz || IE
                const mapOffset = this.canvas.getBoundingClientRect();
                if (ev.pageX) { //Moz
                    mouse.x = ev.pageX + window.pageXOffset - mapOffset.left;
                    mouse.y = ev.pageY + window.pageYOffset - mapOffset.top;
                } else if (ev.clientX) { //IE
                    mouse.x = ev.clientX + document.body.scrollLeft - mapOffset.left;
                    mouse.y = ev.clientY + document.body.scrollTop - mapOffset.top;
                }
                if (element !== null) {
                    element.style.width = Math.abs(mouse.x - mouse.startX) + 'px';
                    element.style.height = Math.abs(mouse.y - mouse.startY) + 'px';
                    element.style.left = (mouse.x - mouse.startX < 0) ? mouse.x + 'px' : mouse.startX + 'px';
                    element.style.top = (mouse.y - mouse.startY < 0) ? mouse.y + 'px' : mouse.startY + 'px';
                }
            }

            this.canvas.onclick = (e) => {
                if (element !== null) {
                    this.canvas.style.cursor = "default";
                    const children = this.canvas.getElementsByClassName("screenshot_rectangle");
                    if (children.length > 1) {
                        children.forEach((child, i) => {
                            if (i < children.length - 1) {
                                this.canvas.removeChild(child);
                            }
                        })
                    }
                    //save the area (these coordinates are map coordinates)
                    this.area = {
                        x: element.style.left.substring(0, element.style.left.length - 2),
                        y: element.style.top.substring(0, element.style.top.length - 2),
                        width: element.style.width.substring(0, element.style.width.length - 2),
                        height: element.style.height.substring(0, element.style.height.length - 2)
                    };
                    // dispatch event to indicate that drawing finished
                    const drawFinishedEvent = new Event('drawFinished');
                    window.dispatchEvent(drawFinishedEvent);
                    element = null;
                    this.canvas.onclick = null;
                    this.canvas.onmousemove = null;
                    this.stopPanning = false;
                } else {
                    mouse.startX = mouse.x;
                    mouse.startY = mouse.y;
                    element = document.createElement('div');
                    element.className = 'screenshot_rectangle'
                    element.style.left = mouse.x + 'px';
                    element.style.top = mouse.y + 'px';
                    this.canvas.appendChild(element)
                    this.canvas.style.cursor = "crosshair";
                }
            }
        }
    }

    abortDrawing() {
        if (this.canvas?.onclick) {
            this.canvas.style.cursor = "default";
            this.canvas.onclick = null;
        }
        this.stopPanning = false;
    }

    /**
     * This takes a screenshot.
     */
    takeScreenshot() {
        const view = this.model.view;
        let properties;
        if (this.properties) {
            properties = this.properties;
            const area = document.getElementsByClassName("screenshot_rectangle");
            if (area && area.length) {
                properties.area = this.area;
            }
        } else {
            properties = this.config;
        }

        view.takeScreenshot(properties).then((screenshot) => {
            const link = document.createElement('a');
            let format = "png";
            if (properties.format) {
                format = properties.format;
            }
            link.download = this._appCtx.applicationName + "_screenshot." + format;
            link.href = screenshot.dataUrl;
            link.click();
        });
    }

    /**
     * This deletes the area from the properties and removes the corresponding graphic
     */
    deleteArea() {
        this.properties.area = undefined;
        const areas = document.getElementsByClassName("screenshot_rectangle");
        if (areas && areas.length) {
            areas.forEach((area) => {
                area.remove();
            })
        }
    }

    /**
     *
     * @param view
     * @returns {{x: number, width: number, y: number, height: number}}
     */
    static createArea(view) {
        // convert from map to screen coordinates
        // (this has to be done right before the screenshot is taken, because the map might have been moved)
        const convertedMinPoint = view.toScreen({
            x: this.area.xmin,
            y: this.area.ymin,
            spatialReference: {
                wkid: this.area.wkid
            }
        });
        const convertedMaxPoint = view.toScreen({
            x: this.area.xmax,
            y: this.area.ymax,
            spatialReference: {
                wkid: this.area.wkid
            }
        });
        return {
            x: Math.round(convertedMinPoint.x),
            y: Math.round(convertedMaxPoint.y),
            width: Math.round(convertedMaxPoint.x - convertedMinPoint.x),
            height: Math.round(convertedMinPoint.y - convertedMaxPoint.y)
        }
    }
}
