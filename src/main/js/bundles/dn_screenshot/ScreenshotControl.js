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
import async from "apprt-core/async";

export default class ScreenshotControl {
    /**
     * This lets the user draw a rectangle that is used as the area of the screenshot. The rectangle is permanently
     * visualized on the map as a graphic using the HighlightService.
     */
    startDrawing() {
        const view = this._mapWidgetModel.view;
        view.cursor = "crosshair";
        const drawing = this._drawing;
        drawing.mode = "rectangle";

        this._drawListener = drawing.watch("graphic", evt => {
            const graphic = evt.value;
            const geometry = graphic.geometry;
            this._highlightArea(geometry);
            const screenshotModel = this._screenshotModel;
            screenshotModel.area = this._getArea(geometry);
            this.stopDrawing();
        });

        drawing.active = true;
    }

    stopDrawing() {
        const view = this._mapWidgetModel.view;
        view.cursor = "default";
        const drawing = this._drawing;
        drawing.active = false;
        const drawListener = this._drawListener;
        this._drawListener = undefined;
        if (drawListener) {
            drawListener.remove();
        }
    }

    /**
     * This takes a screenshot.
     */
    takeScreenshot() {
        this._clearHighlight();
        async(() => {
            const screenshotModel = this._screenshotModel;
            const options  = {
                format: screenshotModel.format,
                quality: screenshotModel.quality,
                area: screenshotModel.area,
                ignoreBackground: screenshotModel.ignoreBackground
            }
            const view = this._mapWidgetModel.view;
            view.takeScreenshot(options).then((screenshot) => {
                this._highlightArea();
                const link = document.createElement('a');
                let format = "png";
                if (screenshotModel.format) {
                    format = screenshotModel.format;
                }
                link.download = this._appCtx.applicationName + "_screenshot." + format;
                link.href = screenshot.dataUrl;
                link.click();
            });
        }, 100);
    }

    /**
     * This deletes the area from the properties and removes the corresponding graphic
     */
    deleteArea() {
        this._lastHighlightGeometry = undefined;
        this._screenshotModel.area = undefined;
        this._clearHighlight();
    }

    /**
     *
     * @param geometry
     * @returns {{x: number, width: number, y: number, height: number}}
     */
    _getArea(geometry) {
        const view = this._mapWidgetModel.view;
        const screenPoint1 = view.toScreen({
            x: geometry.xmin,
            y: geometry.ymax,
            spatialReference: geometry.spatialReference
        });
        const screenPoint2 = view.toScreen({
            x: geometry.xmax,
            y: geometry.ymin,
            spatialReference: geometry.spatialReference
        });
        const width = screenPoint2.x - screenPoint1.x;
        const height = screenPoint2.y - screenPoint1.y;

        return {
            x: screenPoint1.x,
            y: screenPoint1.y,
            width: width,
            height: height
        }
    }

    _highlightArea(geometry) {
        this._clearHighlight();
        this._currentHighlight = this._highlighter.highlight({
            geometry: geometry || this._lastHighlightGeometry
        });
        if (geometry) {
            this._lastHighlightGeometry = geometry;
        }
    }

    _clearHighlight() {
        if (this._currentHighlight) {
            this._currentHighlight.remove();
            this._currentHighlight = undefined;
        }
    }


}
