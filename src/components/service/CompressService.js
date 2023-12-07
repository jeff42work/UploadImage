const CompressService = {

  compressImage: function(editImg) {
    // 將編輯過的證件照 base64 再轉為 canvas 做壓縮，再打 OCR 辨識並顯示到畫面上
    let cv = document.createElement("canvas");
    cv.width = editImg.width;
    cv.height = editImg.height;
    let ctx = cv.getContext("2d");
    ctx.drawImage(editImg, 0, 0, editImg.width, editImg.height);
    // 壓縮
    let newBase64Data = cv.toDataURL("image/jpeg", 0.1);
    return newBase64Data;
  },

};
export default CompressService;
