<template>
  <div style="display: flex;
              justify-content: center;
              align-items: center;
              border: red 2px solid;">
    <div v-if="!imgSrc"
         class="image-blank"
         @click="uploadClick()"
    >
      <div style="display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                  margin-top: 20px;
                  margin-bottom: 20px;">
        <font-awesome-icon :icon="['fas', 'camera-retro']"
                           size="2xl"
                           style="width: 100px; height: 100px; color: gray;  ">
        </font-awesome-icon>
        <div>身分證正本正面</div>
        <span style="font-size: 16px; color: red">
          拍攝時請避免反光或是遮住證件文字
        </span>
      </div>
    </div>

    <div v-else
         class="image"
         @click="uploadClick()"
         style="">
      <img :src="imgSrc"/>
    </div>

    <input
        id="imgInput"
        type="file"
        accept="image/png, image/jpeg, image/jpg"
        capture="camcorder"
        style="display: none"
        @input="uploadEvent($event)"
    />


    <OCRModal :showImgProcessModal.sync="showImgProcessModal"
              :imgProcessModalSrc="imgProcessModalSrc"
              @submitImg="submitImg">

    </OCRModal>

  </div>
</template>


<script src="./UploadImage.js"></script>

<style scoped>
.image-blank {
  border: 1px solid lightgray;
  border-radius: 5px;
  width: 70%;
  margin-top: 15px;
  margin-bottom: 15px;
  cursor: pointer;
  box-shadow: 5px 5px 10px rgba(211, 211, 211, 0.651);
}
.image-blank:hover {
  background-color: rgba(187, 187, 187, 0.11);
}
.image {
  border: 3px solid lightgray;
  border-radius: 5px;
  width: 70%;
  margin-top: 15px;
  margin-bottom: 15px;
  cursor: pointer;
  box-shadow: 5px 5px 10px rgba(211, 211, 211, 0.651);
}
.image:hover {
  background-color: rgba(187, 187, 187, 0.158);
}
.image img {
  max-width: 100%;
  max-height: 100%;
  width: 100%;
  margin: auto auto;
  display: block;
  object-fit: cover;
}

/*@media (min-width: 1200px) {*/
/*  .image-blank {*/
/*    width: 90%;*/
/*  }*/
/*}*/

</style>
