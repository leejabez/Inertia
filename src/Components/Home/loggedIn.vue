<template>
  <div class="full_bg">
    <b-container>
      <b-row class="justify-content-center">
        <b-col
          class="text-white py-4 d-flex flex-column justify-content-around"
          style="height: 100vh; max-width: 700px"
        >
          <div>
            <h3>
              Good Morning {{ getUser ?  getUser.name : "" }}, how are you feeling today?
            </h3>
            <div
              v-if="!isRatedForToday"
              style="display: flex; justify-content: space-around"
              class="px-md-5 mx-md-5"
            >
              <div
                v-for="(v, k) in ratingButtons"
                :key="k"
                :class="['rating_btns ']"
                :style="{ backgroundColor: v.color }"
                @click="markRating(v.rate)"
              >
                {{ v.rate }}
              </div>
            </div>
            <div v-else class="h4 feeling_text">Your Rating Today Is {{ todayFeelingRating }}
            </div>
          </div>
          <div>
            <span class="display-4">
              “What we achieve inwardly will change outer reality”
            </span>
            <em>- Plutarch</em>
          </div>
          <div>
            <div class="h2">Do you have any tasks for today ?</div>
            <div class="d-flex mx-md-5 px-md-5">
              <input type="text" class="task_input" v-model="task" />
              <span class="ml-4">
                <i
                  class="mdi mdi-plus-circle-outline font-weight-bold h4"
                  @click="addTask"
                  style="cursor: pointer"
                ></i>
              </span>
            </div>
            <div class="text-left mx-md-5 px-md-5 pt-3" v-if="getUser">
              <template v-for="(v, k) in getUser.tasks">
                <b-form-checkbox
                  :key="k"
                  v-model="v.done"
                  :disabled="v.done"
                  :value="true"
                  :unchecked-value="false"
                  :class="[
                    'font-weight-bolder',
                    { 'text-white  font-italic done_text': v.done },
                  ]"
                  @change="markTaskAsDone(v, k)"
                >
                  {{ v.task }}
                </b-form-checkbox>
              </template>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

 <script>
export default {
  data() {
    return {
      task: null,
      ratingButtons: [
        { color: "red", rate: 1 },
        { color: "orange", rate: 2 },
        { color: "yellow", rate: 3 },
        { color: "#aed581", rate: 4 },
        { color: "#2e7d32", rate: 5 },
      ],
    };
  },
  computed: {
    isRatedForToday() {
      if (this.getUser && this.getUser.last_feeling_update) {
        var t = new Date().setHours(0, 0, 0, 0);
        var l_u_t = this.getUser.last_feeling_update;
        if (t == l_u_t.toDate().setHours(0, 0, 0, 0)) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
    todayFeelingRating() {
      return this.getUser.last_feeling_rating || 0;
    },
  },
  methods: {
    markRating(n) {
      var batch = this.$fb.firestore().batch();
      var userRef = this.$fb
        .firestore()
        .collection("users")
        .doc(this.getUser.uid);
      var now = this.$fb.firestore.Timestamp.fromDate(new Date());
      batch.update(userRef, {
        last_feeling_update: now,
        last_feeling_rating: n,
      });
      var feelingsArr = this.getUser.feeling_updates
        ? this.getUser.feeling_updates
        : [];
      feelingsArr.push({
        update_time: now,
        rating: n,
      });
      batch.set(
        userRef,
        {
          feeling_updates: feelingsArr,
        },
        { merge: true }
      );

      batch.commit();
    },
    addTask() {
      if (this.task && this.task != "") {
        var task = this.task;
        var batch = this.$fb.firestore().batch();
        var userRef = this.$fb
          .firestore()
          .collection("users")
          .doc(this.getUser.uid);
        var now = this.$fb.firestore.Timestamp.fromDate(new Date());

        var tasksArr = this.getUser.tasks ? this.getUser.tasks : [];
        tasksArr.push({
          time: now,
          task,
          done: false,
        });
        batch.set(
          userRef,
          {
            tasks: tasksArr,
          },
          { merge: true }
        );

        batch
          .commit()
          .then(() => {
            alert("task added successfully");
            this.task = null;
          })
          .catch((err) => {
            alert("Error occured While adding task" + err.message);
          });
      }
    },
    markTaskAsDone(v, k) {
      var batch = this.$fb.firestore().batch();
      var userRef = this.$fb
        .firestore()
        .collection("users")
        .doc(this.getUser.uid);
      var tasksArr = this.getUser.tasks;
      tasksArr[k]["done"] = true;
      batch.set(
        userRef,
        {
          tasks: tasksArr,
        },
        { merge: true }
      );
      batch
        .commit()
        .then(() => {
          alert("task marked as done");
        })
        .catch((err) => {
          alert("Error occured While marking task as done" + err.message);
        });
    },
  },
};
</script>
<style>
.full_bg {
  background: url("../../assets/home_bg.png") no-repeat center center;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;

  min-height: 100vh;
}
.rating_btns {
  width: 30px;
  height: 30px;
  border-radius: 100%;
  line-height: 30px;
  cursor: pointer;
  font-weight: 900;
  color: black;
}
.feeling_text {
  text-shadow: 0 0 20px #ffffff;
  color: #FFEB3B;
}
.task_input {
  width: 100%;
  border: none;
  background: transparent;
  border-bottom: 4px solid white;
  color: white;
}
.task_input:focus {
  outline: none;
}
.done_text > label {
  color:white !important;
  text-decoration: line-through;
}
</style>