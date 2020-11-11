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
</template>

<script>
export default {
    
}
</script>

<style>

</style>