<template>
  <b-container fluid class="h-100">
    <b-row class="h-100">
      <b-col
        cols="12"
        md="4"
        lg="3"
        class="pt-4 h-100"
        style="background-color: #e5e5e5; display: flex; flex-direction: column"
      >
        <b-input placeholder="Search" class="rounded-pill search_input">
        </b-input>
        <div style="flex: 1" class=" ">
          <div
            class="px-2"
            :style="{ height: '200px' , overflow: 'auto' }"
          >
          </div>
        </div>
        </b-col>
        <b-col class="p-4 h-100"
          style="display: flex; flex-direction: column">
        <h2 class="text-muted">
            <div>
              <i class="mdi mdi-message display-1"></i>
            </div>
            Please select a contact to start chatting
          </h2>
        </b-col>
    </b-row>
  </b-container>
</template>

<script>

</script>

<style>
.search_input {
  filter: drop-shadow(0px 0px 25px rgba(0, 0, 0, 0.15));
}

</style>