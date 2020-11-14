<template>
<div class="main_journal">
  <div
      :class="[
        'd-inline-block c_c_default',
        { calendar_custom: !loadVisibleClass },
      ]"
      @mouseenter="loadVisibleClass = true"
      @mouseleave="loadVisibleClass = false"
    >
      <b-calendar
        v-model="selectedDate"
        label-help="Hover to change the day"
        locale="en-US"
      ></b-calendar>
    </div>
        <div
      class=""
      style="padding: 150px; display: flex; justify-content: center"
    >
      <div class="notes">
        <div
          class="border-bottom py-3 text-white font-weight-bold d-flex justify-content-between"
        >
          <div class="pl-4">
            <i class="mdi mdi-chevron-left h4" style="cursor: pointer"></i>
          </div>
          <div>{{ yesterDayValue }}</div>
          <div class="pr-4"></div>
        </div>
        <div
          style="flex: 1; height: 320px; overflow: auto"
          class="p-3 text-white font-weight-bold"
        >
          {{ yesterDayNote.text || "" }}
        </div>
      </div>

      <div class="notes">
        <div
          class="border-bottom py-3 text-white font-weight-bold d-flex justify-content-between"
        >
          <div class="pl-4"></div>
          <div>{{ todayValue }}</div>
          <div class="pr-4" @click="setEditDialog">
            <i
              class="mdi mdi-circle-edit-outline h5"
              style="cursor: pointer"
            ></i>
          </div>
        </div>
        <div
          style="flex: 1; height: 320px; overflow: auto"
          class="p-3 text-white font-weight-bold"
        >
          <p v-if="todayNote.text">
          {{todayNote.text}}</p>
          <div v-else class="h3 text-muted">
            Write something really amazing
            <div class="pt-5">
              <i class="mdi mdi-circle-edit-outline display-1"></i>
            </div>
          </div>
        </div>
      </div>
    </div>

 <b-modal
      id="modal-center"
      v-model="openEditDialog"
      centered
      hide-footer
      no-close-on-backdrop
      title="Edit Today's Journal"
    >
      <b-textarea
        v-model="modalValue"
        placeholder="Start writing here"
      ></b-textarea>
      <div class="text-right py-3">
        <b-overlay
          :show="loading"
          rounded
          opacity="0.6"
          spinner-small
          spinner-variant="primary"
          class="d-inline-block"
        >
          <b-btn @click="saveTodayJournal" variant="primary">Save</b-btn>
        </b-overlay>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
    computed: {
    todayValue() {
      var d = new Date(this.selectedDate);
      var months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      return d.getDate() + " " + months[d.getMonth()] + " " + d.getFullYear();
    },
    yesterDayValue() {
      var td = new Date(this.selectedDate);
      var d = new Date(td.setDate(td.getDate() - 1));
      var months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      return d.getDate() + " " + months[d.getMonth()] + " " + d.getFullYear();
    }
    },
    watch: {
    selectedDate: {
      handler(date) {
        if (date && this.getUser) {
          console.log("running now");
          var u = this.getUser;
          this.$fb
            .firestore()
            .collection("users")
            .doc(u.uid)
            .collection("journals")
            .where("day", "in", [this.todayValue, this.yesterDayValue])
            .onSnapshot((snap) => {
              snap.forEach((res) => { 
                var d = res.data();
                if (d.day == this.todayValue) {
                  this.todayNote = d;
                } else {
                  this.yesterDayNote = d;
                }
              });
            });
        }
      },
      immediate: true,
    },
  },
  methods: {
    setEditDialog() {
      this.openEditDialog = true;
      this.modalValue = this.todayNote.text || "";
    },
    saveTodayJournal() {
      this.loading = true;
      var that = this;
      var ref = this.$fb
        .firestore()
        .collection("users")
        .doc(this.getUser.uid)
        .collection("journals");

      var doc = this.todayNote.id ? this.todayNote.id : ref.doc().id;

      ref
        .doc(doc)
        .set({
          id: doc,
          text: that.modalValue,
          day: that.todayValue,
        })
        .then(() => {
          that.loading = false;
          that.openEditDialog = false;
        })
        .catch((err) => {
          alert("An error occured while saving journal" + err);
          that.loading = false;
        });
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.selectedDate = new Date();
    });
  },
};
</script>

<style>
.main_journal {
  background: url("../../assets/journal_bg.png") no-repeat top center;
  background-size: cover;
  background-attachment: fixed;
  height: 100%;
  width: 100%;
  position: relative;
}
.calendar_custom
  > .b-calendar
  > div.b-calendar-inner
  > div.b-calendar-grid
  > div.b-calendar-grid-body {
  display: none;
}

.c_c_default {
  position: absolute;
  top: 0;
  left: 39%;
  z-index: 1;
}
.notes {
  width: 362px;
  height: 465px;
  margin: 10px;
  border-radius: 10px;
  border: 1px solid white;
  backdrop-filter: blur(19px);
  display: flex;
  flex-direction: column;
}
</style>