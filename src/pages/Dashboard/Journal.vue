<template>
<div class="main_journal">
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
    }
}
</script>

<style>

</style>