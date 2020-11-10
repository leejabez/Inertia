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
          <div
                @click="setLoaded()"
                style="cursor: pointer"
                class="chat_wrapper my-3 d-flex flex-column justify-content-around"
                >
          <div
            style="display: flex; align-items: center; background-color: white"
            class="mt-3 mx-3 mb-2"
            >
                  <b-avatar
                    src="https://placekitten.com/300/300"
                    class="bg-secondary"
                  ></b-avatar>
                  <div class=" " style="flex: 1; display: flex">
                    <div
                      class="text-left pl-2"
                      style="flex: 1; display: flex; flex-direction: column"
                    >
                      <span class="font-weight-bold">Name</span>
                      <span class="text-muted">Msg</span>
                    </div>
                  </div>
                  </div>
          </div>
        </div>
        </div>
        </b-col>
        <b-col class="p-4 h-100"
          style="display: flex; flex-direction: column">
          <div
          v-if="loadedContact"
          class="p-4 h-100 justify-content-center"
          style="display: flex; flex-direction: column"
          >
          <!-- messages header-->
          <div>
            <div
              style="display: flex; align-items: center"
              class="px-3 pb-1 border-bottom"
            >
              <b-avatar class="bg-secondary" src="https://placekitten.com/300/300"></b-avatar>
              <div class=" " style="flex: 1; display: flex">
                <div
                  class="text-left pl-2"
                  style="flex: 1; display: flex; flex-direction: column"
                >
                  <span class="font-weight-bold">Name</span>
                </div>
              </div>
            </div>
          </div>
          </div>
          <!-- messages -->
          <div
            v-else
            class="p-4 h-100 justify-content-center"
            style="display: flex; flex-direction: column"
          >
        <h2 class="text-muted">
            <div>
              <i class="mdi mdi-message display-1"></i>
            </div>
            Please select a contact to start chatting
          </h2>
          </div>
        </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      loadedContact: null,
    }
  },
  methods: {
    setLoaded() {
      this.loadedContact = true;
    }
  }
}
</script>

<style>
.search_input {
  filter: drop-shadow(0px 0px 25px rgba(0, 0, 0, 0.15));
}

</style>