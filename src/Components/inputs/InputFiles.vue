<style scoped>
.file-input-wrapper{
    display: inline-block;
    position: relative;
}
.file-input-wrapper label{
    display: block;
}
.file-input-wrapper input{
    position: absolute;
    left: -9999px;
}
.file-input-wrapper.inline{
    display: inline-block;
}
</style>

<template>
    <div class="panel panel-default no-padding" :id="uploaderId">

        <div class="panel-heading">
            <div class="row">
                <div class="col-sm-7">
                    <h4 class="panel-title">{{ title }}</h4>
                </div>
                <div class="col-sm-5 text-right">
                    <div class="file-input-wrapper" v-if="!file || (!file.loaded && canAdd)" @click="trigger()">
                        <label class="btn btn-primary">
                            <i class="fa fa-folder-open"></i> Ajouter...
                        </label>
                        <input type="file" multiple="true" 
                            accept="image/jpeg,image/png,application/pdf"
                            class="form-control file-input">
                    </div>
                    <div class="progress" v-if="file && file.loaded">
                        <div class="progress-bar" 
                            role="progressbar" 
                            :style="'width: ' + (file ? 100 * file.loaded / file.size : 0) + '%'">
                                <span class="sr-only">{{ file ? 100 * file.loaded / file.size : 0 }}% Complete</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="panel-body">
            <table class="table table-relaxed">
                <tbody>
                    <tr v-for="doc in documents">
                        <td v-if="!editTitle">{{ doc.title }}</td>
                        <td v-if="editTitle">
                            <input type="text"
                                class="form-control"
                                v-model="doc.title"
                                v-on:change="rename(doc.id, doc.title)"
                                placeholder="Titre du document...">
                        </td>
                        <td class="text-right nowrap">
                            <a :href="apiUrl + '/document/open/' + doc.id"
                                target="_blank"
                                class="btn btn-default">
                                <i class="fa fa-eye"></i>
                            </a>
                            <button type="button" 
                                @click="destroy(doc.id)" 
                                class="btn btn-danger icon-only" 
                                v-if="canDelete">
                                <i class="fa fa-trash"></i>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

    </div>

</template>

<script>
    export default {
        data() {
            return {
                loaded: false,
                documents: [],
                file: null,
                uploaderId: Math.random().toString(36).substring(7)
            };
        },
        props: [
            'apiUrl',
            'title',
            'editTitle',
            'editExpire',
            'canAdd',
            'canDelete',
            'uploadCallback',
            'deleteCallback'
        ],

        mounted() {
            if(!this.loaded && this.apiUrl){
                this.getItems();
            }


            // -------------------------------------------------------
            //  Init browse button
            // -------------------------------------------------------
            var self = this;

            $(this.$el).on('change', '.file-input', function(e){
                self.file = e.target.files[0];
                self.files = e.target.files;
                self.upload();
                this.value = null;
            }).on('click', '.file-input', function(e){
                this.value = null;
            });
        },

        watch: {
            apiUrl: function(){
                this.getItems();
            }
        },

        methods: {

            trigger() {
                $(this.$el).find('.file-input').trigger('click');
            },

            getItems() {
                this.$http.get(this.apiUrl + '/document').then(response => {
                    this.documents = response.data;
                    this.loaded = true;
                });
            },

            // -------------------------------------------------------
            //  Upload
            // -------------------------------------------------------
            upload: function()
            {
                var formData = new FormData();
                formData.append('file', this.file, this.file.name);
                //formData.append('files', this.files, this.file.name);
                
                this.$http.post(this.apiUrl + '/document', formData, {
                    upload: {
                        onprogress: (e) => {
                            if (e.lengthComputable) {
                                this.file.loaded = e.loaded;
                                this.file.size = e.total;
                            }
                        }
                    }
                }).then(response => {
                    this.getItems();
                    this.file = null;
                    this.files = [];
                    /*if(uploadCallback){
                        uploadCallback();
                    }*/
                    //this.$emit('uploaded', this.documents);
                })
                .catch(response => {
                    console.log('upload error', response);
                });
            },

            destroy: function(id)
            {
                this.$http.delete(this.apiUrl + '/document/' + id).then(response => {
                    this.getItems();
                })
                .catch(response => {
                    console.log('upload error', response);
                });
            },

            rename: function(id, title)
            {
                this.$http.put(this.apiUrl + '/document/' + id, {title: title}).then(response => {
                    this.getItems();
                })
                .catch(response => {
                    console.log('upload error', response);
                });
            }
        }
    }
</script>
