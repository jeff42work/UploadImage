// src/components/index.js
import UploadImage from './UploadImage.vue'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { fas } from '@fortawesome/free-solid-svg-icons'

UploadImage.install = function (Vue) {
    Vue.component('upload-image', UploadImage)

    /* add icons to the library */
    library.add(fas)

    /* add font awesome icon component */
    Vue.component('font-awesome-icon', FontAwesomeIcon)
}

export default UploadImage