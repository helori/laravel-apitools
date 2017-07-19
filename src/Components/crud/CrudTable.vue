<style scoped>

</style>

<template>
    <div>

        <table class="table">
            <thead>
                <tr>
                    <th v-for="header in options['headers']">{{ header }}</th>
                    <th class="text-right" v-if="canUpdate || canDelete"></th>
                </tr>
            </thead>
            <tbody v-for="item in items">
                <tr :is="rowComponent"
                    :item="item"
                    :base-uri="baseUri"
                    :uri="uri"
                    :options="options"
                    @update="update"
                    @destroy="destroy">
                </tr>
            </tbody>
        </table>
        
    </div>
</template>

<script>
    export default {
        data() {
            return {
                items: [],
                createForm: {},
                updateForm: {},
                createErrors: [],
                updateErrors: []
            };
        },

        props: {
            itemsOrg: {
                required: true
            },
            baseUri: {
                type: String,
                required: true
            },
            uri: {
                type: String,
                required: true
            },
            rowComponent: {
                required: true
            },
            options: {
                required: false
            },
            canUpdate: {
                type: Boolean,
                required: false,
                default: true
            },
            canDelete: {
                type: Boolean,
                required: false,
                default: true
            }
        },

        watch: {
            itemsOrg(items){
                this.items = items;
            }
        },

        methods: {
            update: function (item) {
                this.$emit('update', item);
            },

            destroy: function (item) {
                this.$emit('destroy', item);
            }
        }
    }
</script>
