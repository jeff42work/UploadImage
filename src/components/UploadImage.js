import OCRModal from "./OCRModal.vue";
import CompressService from "@/components/service/CompressService";


export default {
  name: "UploadImage",

  props: {
    componentId: "",
    imgSrc: "",
  },

  components: {
    OCRModal,
  },

  mounted() {
  },

  data() {
    return {
      showImgProcessModal:false,
      imgProcessModalSrc:"",
    };
  },

  computed: {
  },

  watch:{
  },

  methods: {
    uploadClick(){
      let el = document.getElementById('imgInput');
      el.click();
    },

    uploadEvent(input){
      let files = input.target.files;
      // let fileName = 'test' + '.jpg';
      if (files.length > 0 && files[0] != null) {
        // 轉成 base64 顯示
        let reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = (e) => {
          let base64Data = e.target.result;

          this.showImgProcessModal = true;
          this.imgProcessModalSrc = base64Data;

          // 將檔案reset，否則同樣檔案不會觸發change事件
          input.target.value = "";
        };
      }
    },

    submitImg(img){
      img.onload = () => {
        this.imgSrc = CompressService.compressImage(img);
        this.$emit('update:imgSrcChange', this.imgSrc, this.componentId);
      };
    },

  },
};


