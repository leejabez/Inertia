<template>
  <div>
    <my-upload
      field="img"
      @crop-success="cropSuccess"
      v-model="show"
      :width="300"
      :height="300"
 
     
      langType="en"
      img-format="png"
    ></my-upload>
  </div>
</template>
<script>
import myUpload from "vue-image-crop-upload";
export default {
  props: ["showPopup"],
  data() {
    return {
      show: false,
       
      imgDataUrl: "", // the datebase64 url of created image
    };
  },
  watch: {
    show(val) {
      this.$emit("toggle", val);
    },
    showPopup(val) {
      this.show = val;
    },
  },
  components: {
    "my-upload": myUpload,
  },
  methods: {
    /**
     * crop success
     *
     * [param] imgDataUrl
     * [param] field
     */
    // eslint-disable-next-line no-unused-vars
    cropSuccess(imgDataUrl, field) {
      console.log("-------- crop success --------");

      this.$emit("uploaded", imgDataUrl);
    },
    /**
     * upload success
     *
     * [param] jsonData  server api return data, already json encode
     * [param] field
     */
    cropUploadSuccess(jsonData, field) {
      console.log("-------- upload success --------");
      console.log(jsonData);
      console.log("field: " + field);
    },
    /**
     * upload fail
     *
     * [param] status    server api return error status, like 500
     * [param] field
     */
    // eslint-disable-next-line no-unused-vars
    cropUploadFail(status, field) {
      alert("an error occured");
    },
  },
};
</script>