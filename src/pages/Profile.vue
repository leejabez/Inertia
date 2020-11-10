<template>
  <b-overlay>
    <b-container fluid>
      <!-- Back button from here -->
      <b-col cols="12">
          <div class="my-4">
            <b-btn
              class="back_btn float-left"
              style=""
              @click="$router.replace('/discover')"
            >
              <i class="mdi mdi-keyboard-backspace"></i>
            </b-btn>
          </div>
        </b-col>
      <!-- Back button to here -->
          <b-container>
            <b-row>
              <b-col cols="12">
                <div v-for="(v, k) in characteristics" :key="k">
                  <h4 class="text-fer" style="text-decoration: underline">
                    {{ v.title }}
                  </h4>
                  <p>
                    {{ v.text }}
                  </p>
                </div>
              </b-col>
            </b-row>
          </b-container>
    </b-container>
  </b-overlay>
</template>

<script>
export default {
  data() {
    return {
      characteristics: [
        {
          title: "Age",
          text: "21",
        },
        {
          title: "Bio",
          text:
            " lorem ipsum dolor sit amet . lorem ipsum dolor sit amet . lorem ipsum dolor sit amet . lorem ipsum dolor sit amet . lorem ipsum dolor sit amet . lorem ipsum dolor sit amet . lorem ipsum dolor sit amet . lorem ipsum dolor sit amet . lorem ipsum dolor sit amet . lorem ipsum dolor sit amet . lorem ipsum dolor sit amet . lorem ipsum dolor sit amet . lorem ipsum dolor sit amet . lorem ipsum dolor sit amet .",
        },
        {
          title: "Hobbies",
          text:
            "   . lorem ipsum dolor sit amet . lorem ipsum dolor sit amet . lorem ipsum dolor sit amet . lorem ipsum dolor sit amet .",
        },
        {
          title: "Interestes",
          text:
            "   . lorem ipsum dolor sit amet . lorem ipsum dolor sit amet . lorem ipsum dolor sit amet . lorem ipsum dolor sit amet .",
        }
      ]
    };
  },
  
};
</script>

<style>
.back_btn {
  width: 93px;
  background: #0094b6;
  border-radius: 30px;
}
</style>