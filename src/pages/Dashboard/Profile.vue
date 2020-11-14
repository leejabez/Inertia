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
        </div>
      </b-col>
    <b-row>
  </b-container>
</template>

<script>

</script>

<style>

</style>