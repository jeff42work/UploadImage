<template>
  <div>
    <h1>Demo upload-image</h1>
    <div class="uploadCommponent">
      <UploadImage />
    </div>
  </div>
</template>

<script>
import UploadImage from "@/components/UploadImage.vue";

export default {
  name: 'DemoComponent',
  props: {
    msg: String
  },

  components: {
    UploadImage,
  },

  data() {
    return {
    }
  },

  methods: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.uploadCommponent{
  width: 500px;
}
</style>
