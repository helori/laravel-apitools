export default {
    data(){
        return {
            readyToLoad: true,
            uniqId: Math.random().toString(36).substring(7) + '_',
            item: {},
            errors: this.errorsOrg
        };
    },

    props: {
        itemOrg: {
            required: true
        },
        errorsOrg: {
            required: true
        },
        baseUri: {
            required: false
        },
        uri: {
            required: false
        },
        options: {
            required: false
        }
    },

    mounted(){
        if(this.readyToLoad){
            this.setItem(this.itemOrg);
        }
    },

    watch: {
        itemOrg: {
            handler: function (item) {
                if(this.readyToLoad){
                    this.setItem(item);
                }
            }
            //deep: true,
            //immediate: true
        },
        errorsOrg: {
            handler: function () {
                this.errors = _.clone(this.errorsOrg);
            }
            //deep: true,
            //immediate: true
        }
    },

    methods: {
        setItem(item){
            //console.log('setItem', this.itemOrg);
            this.item = _.clone(this.itemOrg);
            this.afterRead();
        },

        updated() {
            this.$emit('change', this.item);
            this.afterUpdate();
        },

        hasErrors(){
            return ! _.isEmpty(this.errors);
        },

        getError(field){
            if(this.errors && this.errors[field]){
                return this.errors[field][0];
            }
            return null;
        },

        // To be overloaded
        afterRead(){},
        afterUpdate(){}
    }
};
