<style scoped>
    #modal-update{
        max-width: 90%;
    }
    .header{
        margin: 0 0 15px 0;
    }
    .header .form-control{
        display: inline-block;
        width: auto;
    }
    .loading, .no-results{
        margin: 15px 0;
        text-align: center;
        font-size: 20px;
        font-weight: 300;
        line-height: 50px;
    }
    .list-wrapper{
        margin: 0 0 15px 0;
    }
    .pagination{
        margin: 0;
    }
</style>

<template>
    <div>

        <slot name="before-table"></slot>

        <panel>
            <div slot="title" v-if="listTitle">
                {{ listTitle }}
            </div>
            <div slot="body">

                <div class="header" v-if="searchEnable || canCreate">
                    <div class="row">
                        <div class="col-sm-6" v-if="searchEnable">
                            <input-text
                                v-model="search"
                                name="search"
                                placeholder="Rechercher..."
                                @input="getItems">
                            </input-text>
                            <a class="btn btn-primary" @click="searchable">
                                <i class="fa fa-refresh"></i> Ré-indexer
                            </a>
                        </div>
                        <div class="text-right" :class="{'col-sm-6': searchEnable, 'col-sm-12': !searchEnable}">
                            <a class="btn btn-primary" @click="showCreateModal" v-if="canCreate">
                                <i class="fa fa-plus"></i> {{ createTitle }}
                            </a>
                        </div>
                    </div>
                </div>

                <div v-if="state == 'loading'" class="loading">
                    <i class="fa fa-spinner fa-spin"></i> Chargement en cours...
                </div>

                <div class="no-results" v-if="state == 'done' && items.length === 0">
                    {{ noResults }}
                </div>

                <div v-if="state == 'error'" class="alert alert-danger">
                    Une erreur est survenue lors du chargement de la liste !
                </div>

                <div class="list-wrapper" v-show="state == 'done' && items.length > 0">

                    <component
                        ref="listComponent"
                        :is="listComponent"
                        :items-org="items"
                        :base-uri="baseUri"
                        :uri="uri"
                        :options="options"
                        :row-component="rowComponent"
                        :can-update="canUpdate"
                        :can-delete="canDelete"
                        @update="showUpdateModal"
                        @destroy="showDestroyModal"
                        @updated="getItems">
                    </component>

                </div>

                <nav aria-label="Page navigation" v-show="pagination.total > pagination.per_page">
                    <ul class="pagination">
                        <li v-if="pagination.current_page == 1" class="disabled">
                            <span>
                                <span aria-hidden="true">&laquo;</span>
                            </span>
                        </li>
                        <li v-else>
                            <a @click="loadPage(page - 1)" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                            </a>
                        </li>
                        <li v-for="p in pagination.last_page" :class="{'active': p === pagination.current_page}">
                            <a @click="loadPage(p)" v-if="p !== pagination.current_page">{{ p }}</a>
                            <span v-else>{{ p }}</span>
                        </li>
                        <li v-if="pagination.current_page == pagination.last_page" class="disabled">
                            <span>
                                <span aria-hidden="true">&raquo;</span>
                            </span>
                        </li>
                        <li v-else>
                            <a @click="loadPage(page + 1)" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                            </a>
                        </li>
                    </ul>
                </nav>

            </div>
        </panel>

        <!-- Create Dialog -->
        <div id="modal-create" class="modal fade"tabindex="-1" role="dialog" v-if="canCreate">
            <div class="modal-dialog">
                <div class="modal-content">
                    
                    <div class="modal-header">
                        <button type="button " class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title">
                            {{ createTitle }}
                        </h4>
                    </div>
                    
                    <div class="modal-body">

                        <form name="createForm" role="form" v-if="createFormComponent">
                            <component
                                ref="createFormComp"
                                :is="createFormComponent"
                                :item-org="createForm"
                                :errors-org="createErrors"
                                :base-uri="baseUri"
                                :uri="uri"
                                :options="options">
                            </component>
                        </form>

                        <!-- Form Errors 500 -->
                        <div v-if="createError500">
                            <div class="alert alert-danger">
                                {{ createError500 }}
                            </div>
                        </div>
                        
                    </div>

                    <!-- Modal Actions -->
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Annuler</button>
                        <button type="button" class="btn btn-primary" @click="create()">
                            Valider
                        </button>
                    </div>

                </div>
            </div>
        </div>

        <!-- Update Dialog -->
        <div id="modal-update" class="modal fade"tabindex="-1" role="dialog" v-if="canUpdate">
            <div class="modal-dialog" :style="'width: ' + updateDialogWidth + 'px'">
                <div class="modal-content">
                    
                    <div class="modal-header">
                        <button type="button " class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title">
                            {{ updateTitle }}
                        </h4>
                    </div>
                    
                    <div class="modal-body">

                        <form name="updateForm" role="form" v-if="updateFormComponent">
                            <component
                                ref="updateFormComp"
                                :is="updateFormComponent"
                                :item-org="updateForm"
                                :errors-org="updateErrors"
                                :base-uri="baseUri"
                                :uri="uri"
                                :options="options">
                            </component>
                        </form>

                        <!-- Form Errors 500 -->
                        <div v-if="updateError500">
                            <div class="alert alert-danger">
                                {{ updateError500 }}
                            </div>
                        </div>
                        
                    </div>

                    <!-- Modal Actions -->
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Annuler</button>
                        <button type="button" class="btn btn-primary" @click="update()">
                            Valider
                        </button>
                    </div>

                </div>
            </div>
        </div>


        <!-- Destroy Dialog -->
        <div id="modal-destroy" class="modal fade"tabindex="-1" role="dialog" v-if="canDelete">
            <div class="modal-dialog">
                <div class="modal-content">
                    
                    <div class="modal-header">
                        <button type="button " class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title">
                            {{ deleteTitle }}
                        </h4>
                    </div>
                    
                    <div class="modal-body">
                        <p>{{ deleteText }}</p>
                    </div>

                    <!-- Modal Actions -->
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Annuler</button>
                        <button type="button" class="btn btn-danger" @click="destroy()">
                            Supprimer
                        </button>
                    </div>

                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
    export default {

        data() {
            return {
                items: [],
                pagination: {},
                page: 1,
                state: 'pending',
                search: '',
                createForm: {},
                updateForm: {},
                createErrors: [],
                updateErrors: [],
                createError500: null,
                updateError500: null
            };
        },

        props: {
            attributes: {
                type: Array,
                required: true,
                default: []
            },
            listTitle: {
                type: String,
                required: false,
                default: ''
            },
            createTitle: {
                type: String,
                required: false,
                default: ''
            },
            updateTitle: {
                type: String,
                required: false,
                default: ''
            },
            deleteTitle: {
                type: String,
                required: false,
                default: ''
            },
            deleteText: {
                type: String,
                required: false,
                default: ''
            },
            noResults: {
                type: String,
                required: false,
                default: ''
            },
            canCreate: {
                type: Boolean,
                required: false,
                default: true
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
            },
            baseUri: {
                type: String,
                required: true
            },
            uri: {
                type: String,
                required: true
            },
            searchEnable: {
                type: Boolean,
                required: false,
                default: false,
            },
            createFormComponent: {
                required: false,
                default: null
            },
            updateFormComponent: {
                required: false,
                default: null
            },
            listComponent: {
                required: true
            },
            rowComponent: {
                required: true
            },
            options: {
                type: Object,
                required: false
            },
            updateDialogWidth: {
                type: Number,
                required: false,
                default: 600
            }
        },

        mounted() {
            this.initFormValues();

            this.getItems();

            this.$on('needsRefresh', function(){
                this.getItems();
            });

            $('#modal-create').on('shown.bs.modal', () => {
                var firstInput = $('#modal-create').find('input,select,checkbox').first();
                if(firstInput.length > 0)
                    firstInput.focus();
            });
            $('#modal-update').on('shown.bs.modal', () => {
                var firstInput = $('#modal-update').find('input,select,checkbox').first();
                if(firstInput.length > 0)
                    firstInput.select().focus();
            });
        },

        methods: {

            initFormValues(item) {
                var createForm = {};
                for(var i=0; i<this.attributes.length; ++i){
                    createForm[this.attributes[i].name] = this.attributes[i].default;
                    this.updateForm[this.attributes[i].name] = item ? item[this.attributes[i].name] : this.attributes[i].default;
                }
                this.createForm = createForm;
            },

            getItems() {
                this.state = 'loading';
                var url = this.baseUri + this.uri + '?page=' + this.page;
                if(this.search){
                    url += '&search=' + this.search;
                }
                axios.get(url).then(response => {
                    this.state = 'done';
                    this.items = response.data.data;
                    this.pagination = response.data;
                }).catch(response => {
                    this.state = 'error';
                });
            },

            searchable() {
                axios.post(this.baseUri + this.uri + '-searchable').then(response => {
                    
                }).catch(response => {
                    
                });
            },

            loadPage(p){
                this.page = p;
                this.getItems();
            },

            showCreateModal() {
                this.initFormValues();
                $('#modal-create').modal('show');
            },

            create() {
                this.createErrors = {};
                this.createError500 = null;

                var item = this.$refs.createFormComp.item;

                return axios.post(this.baseUri + this.uri, item).then(response => {
                    this.getItems();
                    $('#modal-create').modal('hide');
                })
                .catch(response => {
                    if(response.response.status == 422){
                        this.createErrors = response.response.data;
                    }
                    else if(response.response.status == 500){
                        this.createError500 = response.response.statusText;
                    }
                });
            },

            showUpdateModal(item) {
                this.updateForm = item;
                $('#modal-update').modal('show');
            },

            update() {
                this.updateErrors = {};
                var item = this.$refs.updateFormComp.item;
                
                return axios.put(this.baseUri + this.uri + '/' + item.id, item).then(response => {
                    this.getItems();
                    $('#modal-update').modal('hide');
                })
                .catch(response => {
                    if(response.response.status == 422){
                        this.updateErrors = response.response.data;
                    }
                    else if(response.response.status == 500){
                        this.updateError500 = response.response.statusText;
                    }
                });
            },

            showDestroyModal(item) {
                this.itemToDestroy = item;
                $('#modal-destroy').modal('show');
            },

            destroy() {
                axios.delete(this.baseUri + this.uri + '/' + this.itemToDestroy.id).then(response => {
                    this.getItems();
                    $('#modal-destroy').modal('hide');
                }).catch(response => {
                    if (typeof response.data === 'object') {
                        errors = response.data.message;
                    } else {
                        errors = {message: "Une erreur s'est produite"};
                    }
                });
            }
        }
    }
</script>
