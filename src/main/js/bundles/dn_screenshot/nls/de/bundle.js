/*
 * Copyright (C) 2025 con terra GmbH (info@conterra.de)
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
    bundleName: "screenshot",
    bundleDescription: "Aufnehmen und Konfigurieren von Screenshots",
    directScreenshotTool: {
        title: "Screenshot erstellen",
        tooltip: "Screenshot erstellen"
    },
    screenshotToggleTool: {
        title: "Screenshot Konfiguration",
        tooltip: "Screenshot Konfiguration"
    },
    ui: {
        windowTitle: "Screenshot Konfiguration",
        areaTitle: "Kartenausschnitt des Screenshots",
        fullMapExtent: "Vollständiger Kartenausschnitt",
        fileFormat: "Bilddateiformat",
        quality: "Qualität",
        drawArea: "Kartenausschnitt wählen",
        deleteArea: "Kartenausschnitt zurücksetzen",
        backgroundTitle: "Optionen für den Hintergrund",
        background: "Hintergrundfarbe ignorieren",
        save: "Screenshot speichern",
        alerts: {
            noArea: "Ohne definierten Kartenausschnitt wird ein Screenshot der ganzen Karte erzeugt."
        }
    }
};
