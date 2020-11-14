<template>
  <div style="background: #f8f8fb; height: 100%; min-height: 100vh">
                      <b-row>
              <b-col cols="12" md="6" lg="6" xl="6" class="py-3">
                <div class="dashboard_card d-flex">
                  <div>
                    <b-avatar
                      style="
                        background: rgba(113, 59, 219, 0.05);
                        color: #6F52ED;
                      "
                    ></b-avatar>
                  </div>
                  <div class="pl-3 pt-2">
                    <span
                      style="
                        font-family: Heebo;
                        font-style: normal;
                        font-weight: bold;
                        font-size: 28px;
                        line-height: 24px;
                        letter-spacing: 0.01em;
                        color: #2e3b52;
                      "
                      >{{ frndsList.length }}</span
                    >
                    <br />
                    <span
                      style="
                        font-family: Heebo;
                        font-style: normal;
                        font-weight: 500;
                        font-size: 14px;
                        line-height: 21px;
                        letter-spacing: 0.01em;
                        color: #a6acbe;
                      "
                      >Friends</span>
                  </div>
                </div>
              </b-col>
                      </b-row>
      </div>
</template>

<script>
export default {
    components: {
    healthChart,
  },

  data() {
    return {
      loading: false,
      series: [1, 2, 3, 4, 5, 3, 2, 5],
      labels: ["asd", "asd", "asd", "asd", "asd", "asd", "asd", "asd"],
      options: {
        chart: {
          type: "area",
          toolbar: {
            show: false,
          },
        },

        dataLabels: {
          enabled: false,
        },

        xaxis: {
          categories: [],
        },
      },
      frndsList: [],
    };
  },
  methods: {
    loadMore() {
      if (this.frndsList.length != this.getFriendsList.length)
        this.frndsList = this.frndsList.concat(
          this.getFriendsList.slice(this.frndsList.length, 10).map((i) => {
            return i;
          })
        );
    }
  },  
  watch: {
    getFriendsList: {
      handler(val) {
        if (val) {
          var ss = val;
          this.frndsList = ss.slice(0, 10).map((i) => {
            return i;
          });
        }
      },
      immediate: true,
    },
  },
  mounted() {
    this.$store.dispatch("subscribeToFriendsList");
  }
}
</script>

<style>
.frnds_list {
  max-height: 569px;

  background: #ffffff;
  /* Tables */

  box-shadow: 0px 3px 6px rgba(75, 81, 91, 0.15),
    0px 1px 3px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
}
.frnds_list_head {
  padding: 21px 0px;
  color: #6f52ed;
}
.frnds_list_content_scroll_area {
  max-height: 420px;
  overflow: auto;
}
</style>