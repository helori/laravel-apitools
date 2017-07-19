<style scoped>
    .form-group{
        margin-bottom: 5px;
    }
</style>

<template>
    
    <div class="form-horizontal">
        <div class="form-group" :class="{'has-error': error}">
            <label :for="name" :class="'control-label col col-sm-' + labelColumns" v-if="!inverted">{{ label }} :</label>
            <div :class="'col col-sm-' + (12 - labelColumns)">
                <slot name="input"></slot>
                <p class="help-block" v-if="help">{{ help }}</p>
                <p class="help-block" v-if="error">{{ error }}</p>
            </div>
            <label :for="name" :class="'control-label col col-sm-' + labelCols" v-if="inverted">{{ label }} :</label>
        </div>
    </div>

</template>

<script>
    export default {
        props: {
            label: {
                type: String,
                default: ''
            },
            name: {
                type: String,
                default: ''
            },
            error: {
                default: null
            },
            help: {
                type: String,
                default: null
            },
            inverted: {
                type: Boolean,
                default: false,
                required: false
            },
            labelColumns: {
                type: Number,
                default: 4,
                required: false
            }
        },
    }
</script>
