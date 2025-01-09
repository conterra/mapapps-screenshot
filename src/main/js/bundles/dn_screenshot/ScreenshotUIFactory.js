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
import Binding from "apprt-binding/Binding";
import Vue from "apprt-vue/Vue";
import VueDijit from "apprt-vue/VueDijit";
import ScreenshotUI from "./ScreenshotUI.vue";

export default class ScreenshotUIFactory {

    createInstance() {
        let propertiesToViewBinding = this.declarePropertiesToVueBinding();
        let basemapToViewBinding = this.declareBasemapToVueBinding();
        const vm = new Vue(ScreenshotUI);
        vm.i18n = this._i18n.get().ui;
        const screenshotModel = this._screenshotModel;
        const widget = VueDijit(vm, {
            class: "ct-screenshot-widget"
        });

        // bind properties and view model
        propertiesToViewBinding.bindTo(screenshotModel, vm);
        // bind basemap and vue
        basemapToViewBinding.bindTo(this._basemapsModel, vm);

        // register methods to enable/disable binding
        widget.enableBinding = () => {
            propertiesToViewBinding.enable().syncToRightNow();
            basemapToViewBinding.enable().syncToRightNow();
            vm.$on("draw-area", () => {
                this._screenshotControl.startDrawing();
            });
            vm.$on("delete-area", () => {
                this._screenshotControl.deleteArea();
            });
            vm.$on("take-screenshot", () => {
                this._screenshotControl.takeScreenshot();
            });
        };

        widget.disableBinding = () => {
            this._screenshotControl.stopDrawing();
            this._screenshotControl.deleteArea();
            propertiesToViewBinding?.disable();
            basemapToViewBinding?.disable();
            vm.$off();
        };

        // clean up binding and attached functions
        widget.own({
            remove() {
                propertiesToViewBinding?.unbind();
                propertiesToViewBinding = undefined;
                basemapToViewBinding?.unbind();
                basemapToViewBinding = undefined;
                widget.enableBinding = widget.disableBinding = undefined;
            }
        });

        return widget;
    }

    declarePropertiesToVueBinding() {
        return Binding.create()
            .syncAll("format", "area", "quality", "ignoreBackground");
    }

    declareBasemapToVueBinding() {
        return Binding.create()
            .sync("selectedId", "selectedBasemapId");
    }
}
