// src/components/index.js
import UploadScreenshotModal from './UploadScreenshotModal.vue'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { fas } from '@fortawesome/free-solid-svg-icons'

UploadScreenshotModal.install = function (Vue) {
    Vue.component('upload-screenshot-modal', UploadScreenshotModal)

    /* add icons to the library */
    library.add(fas)

    /* add font awesome icon component */
    Vue.component('font-awesome-icon', FontAwesomeIcon)
}

export default UploadScreenshotModal