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
        class="pa-0"
    >
        <div class="ct-flex-container ct-flex ct-flex-container--column fullWidthAndHeight padding-default">
            <div
                class="ct-flex-item overflow--auto pa-3"
            >
                <h4>{{ i18n.areaTitle }}</h4>
                <v-btn
                    v-if="!area"
                    small
                    class="ml-0 d-inline-block"
                    @click="$emit('draw-area')"
                >
                    {{ i18n.drawArea }}
                </v-btn>
                <v-btn
                    v-else
                    small
                    class="ml-0 d-inline-block"
                    @click="$emit('delete-area')"
                >
                    {{ i18n.deleteArea }}
                </v-btn>
                <h4>{{ i18n.fileFormat }}</h4>
                <v-radio-group
                    v-model="format"
                    row
                >
                    <v-radio
                        v-for="form in possibleFormats"
                        :key="form"
                        :label="form"
                        :value="form"
                        color="primary"
                    />
                </v-radio-group>
                <div
                    v-show="format==='jpg'"
                >
                    <h4>{{ i18n.quality }}</h4>
                    <v-slider
                        v-model="quality"
                        thumb-label
                        step="1"
                        max="100"
                        min="0"
                    />
                </div>
                <h4 v-if="selectedBasemapId === undefined">
                    {{ i18n.backgroundTitle }}
                </h4>
                <v-checkbox
                    v-if="selectedBasemapId === undefined"
                    v-model="ignoreBackground"
                    :label="i18n.background"
                    hide-details
                    color="primary"
                />
            </div>
            <v-divider/>
            <div class="ct-flex-item ct-flex-item--no-grow ct-flex-item--no-shrink mt-3 px-3">
                <v-btn
                    color="primary"
                    block
                    @click="$emit('take-screenshot')"
                >
                    <v-icon
                        dark
                        class="mr-2"
                    >
                        cloud_download
                    </v-icon>
                    {{ i18n.save }}
                </v-btn>
            </div>
        </div>
    </v-container>
</template>

<script>
    import Bindable from "apprt-vue/mixins/Bindable";

    export default {
        mixins: [Bindable],
        props: {
            i18n: {
                type: Object,
                default: () => {}
            },
            format: {
                type: String,
                default: () => "png"
            },
            quality: {
                type: Number,
                default: () => 98
            },
            ignoreBackground: {
                type: Boolean,
                default: () => false
            },
            area: {
                type: Object,
                default: () => {}
            },
            selectedBasemapId: {
                type: String,
                default: () => undefined
            }
        },
        data() {
            return {
                possibleFormats: ["png", "jpg"]
            };
        }
    }
</script>
