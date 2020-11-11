<template>
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
</template>

<script>
export default {
    
}
</script>

<style>

</style>