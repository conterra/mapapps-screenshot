/*
 * Copyright (C) 2020 con terra GmbH (info@conterra.de)
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
import { debounceOrCancel, ifDefined } from "apprt-binding/Transformers";

class ScreenshotUIFactory {

    createInstance() {
        let propertiesToViewBinding = this._propertiesToViewBinding = this.declarePropertiesToVueBinding();
        let screenshotToViewBinding = this._screenshotToViewBinding = this.declareScreenshotToVueBinding();
        let basemapToViewBinding = this._basemapToViewBinding = this.declareBasemapToVueBinding();
        const vm = new Vue(ScreenshotUI);
        const props = this.config;
        const widget = VueDijit(vm);
        const _this = this;

        // bind properties and view model
        propertiesToViewBinding.bindTo(props, vm.properties);
        // bind properties and view model
        screenshotToViewBinding.bindTo(this, vm);
        // bind basemap and vue
        basemapToViewBinding.bindTo(this.model.map,vm)

        // register methods to enable/disable binding
        widget.enableBinding = function () {
            propertiesToViewBinding.enable().syncToRightNow();
            screenshotToViewBinding.enable().syncToLeftNow();
            basemapToViewBinding.enable().syncToRightNow();
            window.addEventListener("takeScreenshot", _this.screenshotControl.__proto__.screenshot.bind(_this));
            window.addEventListener("drawArea", _this.screenshotControl.__proto__.createDrawing.bind(_this));
            window.addEventListener("deleteArea", _this.screenshotControl.__proto__.deleteArea.bind(_this));
        }
        widget.disableBinding = function () {
            propertiesToViewBinding.disable();
            screenshotToViewBinding.disable();
            basemapToViewBinding.disable();
        }

        // clean up binding and attached functions
        widget.own({
            remove() {
                propertiesToViewBinding.unbind();
                propertiesToViewBinding = undefined;
                screenshotToViewBinding.unbind();
                screenshotToViewBinding = undefined;
                basemapToViewBinding.unbind();
                basemapToViewBinding = undefined;
                widget.enableBinding = widget.disableBinding = undefined;
            }
        });

        return widget;
    }
    declarePropertiesToVueBinding() {
        return Binding.create()
            .sync("format", ifDefined())
            .sync("area", ifDefined())
            .sync("quality", ifDefined())
            .sync("ignoreBackground", ifDefined());
    }
    declareScreenshotToVueBinding() {
        return Binding.create()
            .sync("properties", ifDefined(), ifDefined());
    }
    declareBasemapToVueBinding() {
        return Binding.create()
            .sync("basemap", ifDefined(), ifDefined());
    }
}

export default ScreenshotUIFactory;