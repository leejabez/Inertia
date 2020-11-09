<template>            
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