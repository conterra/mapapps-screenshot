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
module.exports = {
    root: ({
        bundleName: "screenshot",
        bundleDescription: "take and configure screenshots of the map",
        ui: {
            windowTitle: "Screenshot Configuration",
            areaTitel: "Area of the Screenshot",
            fullMapExtent: "Full Map Extent",
            fileFormat: "Image file format",
            quality: "Quality",
            selectArea: "Select area",
            drawInfo: "Draw a rectangle into the map",
            removeArea: "Remove area",
            background: "Hide background"
        },
        tool: {
            title: "Screenshot"
        }
    }),
    "de": true
};
