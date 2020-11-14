<template>
  <b-container>
    <b-row>
      <b-col cols="12" class="py-4 d-flex justify-content-center">
        <div
          class="profile_pic_customize"
          :style="{
            'background-image': `url(${
              getUser.profile_pic_url || defaultProfilePic
            })`,
          }"
        >
        <i
            class="mdi mdi-camera change_pic_icon"
            @click="showUpload = !showUpload"
          ></i>
        </div>
      </b-col>
      <b-col cols="12">
        <b-container>
          <b-row class="justify-content-center">
            <b-col cols="12" md="6" class="my-3">
              <b-input
                v-model="name"
                placeholder="Your Name "
                class="w-100 rounded-0"
                @input="isChanged = true"
              ></b-input>
            </b-col>
            <b-col cols="12" md="6" class="my-3">
              <b-input
                v-model="age"
                type="number"
                placeholder="Your Age "
                class="w-100 rounded-0"
                @input="isChanged = true"
              ></b-input>
            </b-col>

            <b-col cols="12" md="12" class="my-3">
              <b-input
                v-model="bio"
                placeholder="Bio"
                class="w-100 rounded-0"
                @input="isChanged = true"
              ></b-input>
            </b-col>
            <b-col cols="12" md="12" class="my-3">
              <b-textarea
                v-model="hobbies"
                placeholder="Your Hobbies"
                class="w-100 rounded-0"
                @input="isChanged = true"
              ></b-textarea>
            </b-col>
            <b-col cols="12" md="12" class="my-3">
              <b-textarea
                v-model="interests"
                placeholder="Your Interests"
                class="w-100 rounded-0"
                @input="isChanged = true"
              ></b-textarea>
            </b-col>
          </b-row>
        </b-container>
      </b-col>
    <b-row>
  </b-container>
</template>

<script>
export default {
  data() {
        return {
        showUpload: false,
        isChanged: false,
        name: null,
        age: null,
        bio: null,
        hobbies: null,
        interests: null,
        }
    },
}

</script>

<style>
.profile_pic_customize {  
  display: flex;
  justify-content: center;
  align-items: center
}
</style>