<template>
  <div>
    <div v-if="showImgProcessModal" class="dialog-backdrop" >
      <div class="dialog">

        <header style="padding: 20px 0 0 20px;">
          <div style="text-align: start; font-size: 24px;">
            <span>影像處理</span>
          </div>
        </header>
        <hr/>

        <body style="padding: 0 20px 0 20px;">
          <div style="text-align: start;">
            <p style="font-weight: 700">
              請將四個定位點，調整照片的四個角，並按下『裁切』，系統將自動做梯形校正及縮放。編輯完成後請按下『確認』。
            </p>
            <p>※ 若需重新拍照，請點選『取消』按鈕。</p>
          </div>

          <div id="canvasFrame" style="">
            <canvas id="canvasKC" :width="canvasWidth" height="380" />
          </div>
        </body>
        <hr/>

        <footer style="padding: 0 20px 20px 20px;">
          <Button class="btn-info btn-lg" style="margin-right: 10px" @click="rotateNegtive90()">向左旋轉90度</Button>
          <Button class="btn-info btn-lg" style="margin-right: 10px" @click="rotate90()()">向右旋轉90度</Button>
          <Button class="btn-info btn-lg" style="margin-right: 100px" @click="imgPerspectiveTransform()()">裁切</Button>

          <Button class="btn-lg" style="margin-right: 10px" @click="$emit('update:showImgProcessModal', false)">取消</Button>
          <Button class="btn-warning btn-lg" style="margin-right: 10px" @click="rePhoto()">重新編輯</Button>
          <Button class="btn-primary btn-lg" style="margin-right: 10px" @click="submitImg()">確認</Button>
        </footer>


      </div>
    </div>
  </div>
</template>

<script src="./OCRModal.js"></script>
<style scoped src="../assets/css/dialogStyles.css">
</style>

