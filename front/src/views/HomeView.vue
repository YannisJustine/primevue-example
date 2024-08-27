<template>
  <main>
    <div class="card">
      <DataTable
        :value="datatableStore.data"
        :rows="datatableStore.perPage"
        v-model:first="first"
        lazy
        :totalRecords="datatableStore.total"
        paginator
        @sort="onSort"
        @page="onPageChange"
        removableSort
        :loading="datatableStore.loading"
      >
        <Column field="name" header="Name" style="width: 25%" sortable></Column>
        <Column field="country.name" header="Country" style="width: 25%" sortable></Column>
        <Column field="company" header="Company" style="width: 25%" sortable></Column>
        <Column
          field="representative.name"
          header="Representative"
          style="width: 25%"
          sortable
        ></Column>
      </DataTable>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useDatatableStore } from '@/stores/datatable'
import { onMounted, nextTick, ref } from 'vue'

const datatableStore = useDatatableStore()

// Need a better way to handle this
const first = ref(0)

onMounted(() => {
  datatableStore.fetchData()
})

const onSort = (event: any) => {
  datatableStore.sort(event.sortField, event.sortOrder)

  // DataTable reset first to 0 when sorting so we need to update it
  nextTick(() => {
    first.value = datatableStore.first
  })
}

const onPageChange = (event: any) => {
  datatableStore.changePage(event.page)
}
</script>
