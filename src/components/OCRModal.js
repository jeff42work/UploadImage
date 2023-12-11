import EXIF from "./ImgProcess/exif.js";
import "./ImgProcess/heic2any.js";
import CGImg from "./ImgProcess/CGImageDoc.min.js";

// import '@/assets/css/dialogStyles.css';

export default {
  name: "OCRModal",
  props: ["showImgProcessModal", "imgProcessModalSrc"],
  data() {
    return {
      kcViewCtrl: null,
      currentImage: null, //儲存原始影像檔
      canvasOrig: null, //儲存原始影像 (含轉換過後的結果)
      canvasConvert: null, //儲存轉換後的影像
      canvasWidth: "",
      canvasHeight: "",
      isEditMode: false, // 是否可編輯證件照 (旋轉、裁切)
    };
  },
  watch: {
    showImgProcessModal() {
      if (this.showImgProcessModal) {
        this.$nextTick(() => {
          // 設定canvas寬高
          let modal = document.getElementById("canvasFrame");
          this.canvasWidth = modal.clientWidth * 0.85;
        });

        this.kcViewCtrl = null;
        this.currentImage = null;
        this.canvasOrig = null;
        this.canvasConvert = null;
        this.isEditMode = true;
        this.readImageFile();
      }
    },
  },
  computed: {
    showOrNot: {
      set(val) {
        this.$emit("update:showModal", val);
      },
      get() {
        return this.showModal;
      },
    },
  },
  methods: {
    //讀取影像檔
    readImageFile() {
      //取得選取影像
      let img = new Image();
      img.src = this.imgProcessModalSrc;
      img.onload = () => {
        //建立來源畫布
        this.canvasOrig = document.createElement("canvas");
        let scale = 1;
        let maxSize = Math.max(img.naturalWidth, img.naturalHeight);

        if (maxSize > 5000) {
          scale = 5000 / maxSize;
        }

        let iCW = img.naturalWidth * scale;
        let iCH = img.naturalHeight * scale;
        this.canvasOrig.width = iCW;
        this.canvasOrig.height = iCH;

        let ctx = this.canvasOrig.getContext("2d");

        if (scale < 0.7) {
          ctx.mozImageSmoothingEnabled = true;
          ctx.webkitImageSmoothingEnabled = true;
          ctx.msImageSmoothingEnabled = true;
          ctx.imageSmoothingEnabled = true;
        }

        this.canvasOrig.getContext("2d").drawImage(img, 0, 0, iCW, iCH);

        //取得EXIF的方向資訊
        let orientation = -1;
        EXIF.getData(img, function () {
          try {
            orientation = EXIF.pretty(this);
          } catch (e) {
            console.log("get EXIF fail: " + e.message);
          }
        });

        //自動以EXIF轉正
        if (orientation == "3") this.rotate180();
        else if (orientation == "6") this.rotate90();
        else if (orientation == "8") this.rotate270();

        //初始拉框畫布
        if (this.kcViewCtrl) this.kcViewCtrl.Release();
        this.kcViewCtrl = new CGImg.KeystoneCorrectionViewCtrl("canvasKC");
        this.kcViewCtrl.InitialCanvas(this.canvasOrig);
        this.currentImage = img;
        // ----------------- CardEdgeDetection--------------------------->
        //自動定位邊框
        // let points = CGImg.CardEdgeDetection(this.canvasOrig);
        //修改預設位置
        // this.kcViewCtrl.SetScalePoints(points, this.canvasOrig);

      };
    },

    // 梯形校正
    imgPerspectiveTransform() {
      //校正
      let cardTypeValue = "IDCard";
      let p = this.kcViewCtrl.GetScalePoints(this.canvasOrig);
      // this.canvasConvert = CGImg.PerspectiveTransform(this.canvasOrig, p, cardTypeValue);
      this.canvasConvert = CGImg.CutImage(this.canvasOrig, p, cardTypeValue);

      //解構control
      this.kcViewCtrl.Release();
      this.kcViewCtrl = null;

      // let log0_2 = "up canvas參數\r\n" + "width/height: " + this.canvasConvert.width + ", " + this.canvasConvert.height + "\r\n";
      // console.log(log0_2);

      let c = document.getElementById("canvasKC");
      let ctx = c.getContext("2d");
      ctx.drawImage(this.canvasConvert, 0, 0, c.width, c.height);

      // 避免平板重新載入頁面，將旋轉及裁切按鈕 disabled
      this.isEditMode = false;
    },

    rotate90() {
      this.canvasOrig = CGImg.RotateImage(this.canvasOrig, 90);
      this.kcViewCtrl = new CGImg.KeystoneCorrectionViewCtrl("canvasKC");
      this.kcViewCtrl.InitialCanvas(this.canvasOrig);
    },

    rotateNegtive90() {
      this.canvasOrig = CGImg.RotateImage(this.canvasOrig, -90);
      this.kcViewCtrl = new CGImg.KeystoneCorrectionViewCtrl("canvasKC");
      this.kcViewCtrl.InitialCanvas(this.canvasOrig);
    },

    rotate180() {
      this.canvasOrig = CGImg.RotateImage(this.canvasOrig, 180);
      this.kcViewCtrl = new CGImg.KeystoneCorrectionViewCtrl("canvasKC");
      this.kcViewCtrl.InitialCanvas(this.canvasOrig);
    },

    rotate270() {
      this.canvasOrig = CGImg.RotateImage(this.canvasOrig, 270);
      this.kcViewCtrl = new CGImg.KeystoneCorrectionViewCtrl("canvasKC");
      this.kcViewCtrl.InitialCanvas(this.canvasOrig);
    },

    // 重新拍照
    rePhoto() {
      // 初始化
      this.clearCanvas();

      this.readImageFile();
    },

    // 確認，取得 img 並回傳
    submitImg() {
      // ConvertToImage 回傳的是 img
      let content = this.canvasOrig;
      if (this.canvasConvert !== null) {
        content = this.canvasConvert;
      }
      let uploadImage = CGImg.ConvertToImage(content, "jpeg");
      this.$emit("submitImg", uploadImage);
      // 清除 canvas
      this.clearCanvas();
      this.$emit('update:showImgProcessModal', false);
    },

    // 清除 canvas
    clearCanvas() {
      let c = document.getElementById("canvasKC");
      let ctx = c.getContext("2d");
      ctx.clearRect(0, 0, c.width, c.height);

      if (this.kcViewCtrl) this.kcViewCtrl.Release();
      this.kcViewCtrl = null;
      this.currentImage = null;
      this.canvasOrig = null;
      this.canvasConvert = null;
      this.isEditMode = true;
    },
  },
};
