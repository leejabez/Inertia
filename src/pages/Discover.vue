<template>
  <div
    class="discover text-left text-white"
    style="display: flex; flex-direction: column"
  >
    <b-container fluid class=" " style="flex: 1; overflow-y: auto">
      <b-row>
        <b-col cols="12" class="pt-5 pb-3 pl-5">
          <h2 class="font-weight-bold">Discover.</h2>
        </b-col>
      </b-row>
    </b-container>
    <!-- Adding profiles into Discover page from here -->
        <b-col cols="12">
          <b-container>
            <b-row>
              <template  >
                <b-col cols="6" md="4" lg="4" xl="3" class="mb-4 text-center">
                  <div style="cursor:pointer" class="profile_pic mx-auto"></div>
                  <p style="cursor:pointer" class="font-weight-bold mt-2">Anna</p>
          
                </b-col>
              </template>
             
            </b-row>
          </b-container>
        </b-col>
        <!-- Adding profiles into Discover page to here -->
    <div class="py-4 text-center">footer</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  
};
</script>

<style>
.discover {
  background: url("../assets/discover.png") no-repeat;
  background-position: center;
  background-size: cover;
  background-attachment: fixed;
}
</style>