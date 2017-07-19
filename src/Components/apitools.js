/**
 * Filters
 */
require('./filters/FilterDate.js');
require('./filters/FilterNumber.js');


/**
 * CRUD
 */
Vue.component(
    'crud-wrapper',
    require('./crud/CrudWrapper.vue')   
);
Vue.component(
    'crud-table',
    require('./crud/CrudTable.vue')   
);
Vue.component(
    'crud-form',
    require('./crud/CrudForm.vue')
);
Vue.component(
    'tree-sortable',
    require('./crud/TreeSortable.vue')
);
Vue.component(
    'tree-sortable-row',
    require('./crud/TreeSortableRow.vue')
);

/**
 * Widgets
 */
Vue.component(
    'panel',
    require('./widgets/Panel.vue')
);
Vue.component(
    'slide-panel',
    require('./widgets/SlidePanel.vue')
);


/**
 * Inputs Wrappers
 */
Vue.component(
    'input-wrapper-basic',
    require('./inputs-wrappers/InputWrapperBasic.vue')
);

Vue.component(
    'input-wrapper-horizontal',
    require('./inputs-wrappers/InputWrapperHorizontal.vue')
);


/**
 * Inputs
 */
Vue.component(
    'input-checkbox',
    require('./inputs/InputCheckbox.vue')
);

Vue.component(
    'input-choice',
    require('./inputs/InputChoice.vue')
);

Vue.component(
    'input-date',
    require('./inputs/InputDate.vue')
);

Vue.component(
    'input-editor',
    require('./inputs/InputEditor.vue')
);

Vue.component(
    'input-email',
    require('./inputs/InputEmail.vue')
);

Vue.component(
    'input-file',
    require('./inputs/InputFile.vue')
);

Vue.component(
    'input-files',
    require('./inputs/InputFiles.vue')
);

Vue.component(
    'input-media',
    require('./inputs/InputMedia.vue')
);

Vue.component(
    'input-medias',
    require('./inputs/InputMedias.vue')
);

Vue.component(
    'input-multiselect',
    require('./inputs/InputMultiselect.vue')
);

Vue.component(
    'input-number',
    require('./inputs/InputNumber.vue')
);

Vue.component(
    'input-password',
    require('./inputs/InputPassword.vue')
);

Vue.component(
    'input-phone',
    require('./inputs/InputPhone.vue')
);

Vue.component(
    'input-select',
    require('./inputs/InputSelect.vue')
);

Vue.component(
    'input-text',
    require('./inputs/InputText.vue')
);

Vue.component(
    'input-textarea',
    require('./inputs/InputTextarea.vue')
);

