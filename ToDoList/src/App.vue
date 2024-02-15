<script setup>
import eventsForm from './components/form/eventsForm.vue'
import eventsTable from './components/events/eventsTable.vue'
</script>

<template>
  <header>
    <div>
      <eventsForm></eventsForm>
    </div>
  </header>

  <main>
    <eventsTable />
  </main>
</template>

<style scoped>

</style>
