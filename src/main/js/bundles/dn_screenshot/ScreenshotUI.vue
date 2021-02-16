<!--

    Copyright (C) 2021 con terra GmbH (info@conterra.de)

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

            http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.

-->
<template>
    <v-container
        fluid
        fill-height
        class="ct-screenshot-widget pa-0"
    >
        <div class="ct-flex-container ct-flex ct-flex-container--column fullWidthAndHeight padding-default">
            <div
                class="ct-flex-item overflow--auto pa-3"
            >
                <h4>{{ i18n.areaTitle }}</h4>
                <v-checkbox
                    v-model="captureFullMap"
                    :label="i18n.fullMapExtent"
                    color="success"
                    @click="deleteArea()"
                />
                <div v-show="!captureFullMap" class="mb-2">
                    <v-btn-toggle
                        v-model="toggle_exclusive"
                    >
                        <v-btn
                            small
                            class="ml-0 d-inline-block"
                            @click="createDrawing()"
                        >
                            {{ selectAreaLabel }}
                        </v-btn>
                    </v-btn-toggle>
                    <v-btn
                        v-if="areaDrawn"
                        small
                        class="d-inline-block"
                        :disabled="!areaDrawn"
                        color="secondary"
                        @click="deleteArea()"
                    >
                        {{ i18n.removeArea }}
                    </v-btn>
                    <p v-if="toggle_exclusive!=undefined">{{i18n.drawInfo }}</p>
                </div>
                <h4>{{ i18n.fileFormat }}</h4>
                <v-radio-group
                    v-model="properties.format"
                    row
                >
                    <v-radio
                        v-for="form in possibleFormats"
                        :key="form"
                        :label="form"
                        :value="form"
                        color="success"
                    />
                </v-radio-group>
                <div
                    v-show="properties.format==='jpg'"
                >
                    <h4>{{ i18n.quality }}</h4>
                    <v-slider
                        v-model="properties.quality"
                        thumb-label
                        step="1"
                        max="100"
                        min="0"
                    />
                </div>
                <h4 v-if="basemap == undefined">Background options</h4>
                <v-checkbox
                    v-if="basemap == undefined"
                    v-model="properties.ignoreBackground"
                    :label="i18n.background"
                    hide-details
                    color="success"
                />
            </div>
            <v-divider />
            <div class="ct-flex-item ct-flex-item--no-grow ct-flex-item--no-shrink mt-3  px-3">
                <v-btn
                    color="primary"
                    block
                    @click="takeScreenshot()"
                >
                    <v-icon
                        dark
                        class="mr-2"
                    >
                        cloud_download
                    </v-icon>
                    Save Screenshot
                </v-btn>
            </div>
        </div>
    </v-container>
</template>

<script>
    import Bindable from "apprt-vue/mixins/Bindable";
    export default {
        mixins: [Bindable],
        created () {
            window.addEventListener('drawFinished', this.handleDrawFinished);
        },
        destroyed () {
            window.removeEventListener('drawFinished', this.handleDrawFinished);
        },
        data() {
            return {
                properties: {
                    format: "png",
                    quality: 98,
                    ignoreBackground: false
                },
                captureFullMap: true,
                possibleFormats: ["png", "jpg"],
                drawFactory: null,
                areaDrawn: false,
                basemap: undefined,
                toggle_exclusive: undefined
            };
        },
        computed: {
            selectAreaLabel(){
                return this.areaDrawn? this.i18n.selectNew : this.i18n.selectArea
            }
        },
        methods: {
            takeScreenshot() {
                const screenshotEvent = new Event('takeScreenshot');
                window.dispatchEvent(screenshotEvent);
            },
            createDrawing(){
                if(this.toggle_exclusive==undefined) {
                    const drawEvent = new Event('drawArea');
                    window.dispatchEvent(drawEvent);
                } else {
                    const drawAbortEvent = new Event('drawAbort');
                    window.dispatchEvent(drawAbortEvent);
                }
            },
            deleteArea(){
                const removeDrawEvent = new Event('deleteArea');
                window.dispatchEvent(removeDrawEvent);
                const drawAbortEvent = new Event('drawAbort');
                window.dispatchEvent(drawAbortEvent);
                this.areaDrawn = false;
                this.toggle_exclusive = undefined;
            },
            handleDrawFinished(){
                this.areaDrawn = true;
                this.toggle_exclusive=undefined;
            }
        }
    }
</script>
