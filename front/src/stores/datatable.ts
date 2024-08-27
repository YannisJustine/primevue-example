import { defineStore } from 'pinia'
import datatableService from '@/services/datatableService'

export const useDatatableStore = defineStore('datatable', {
  state: () => ({
    data: [] as any[],
    page: 0,
    perPage: 10,
    total: 0,
    loading: false,
    sortField: '',
    sortOrder: 0
  }),
  actions: {
    async fetchData() {
      this.loading = true
      try {
        const { data, total } = await datatableService.getDatatable(
          this.page,
          this.perPage,
          this.sortField,
          this.sortOrder
        )
        this.data = data
        this.total = total
      } catch (error) {
        console.error('An error occurred while fetching the data:', error)
      } finally {
        this.loading = false
      }
    },

    changePage(page: number) {
      this.page = page
      this.fetchData()
    },

    sort(sortField: string, sortOrder: number) {
      this.sortField = sortField
      this.sortOrder = sortOrder
      this.fetchData()
    },

    changePerPage(perPage: number) {
      this.perPage = perPage
      this.fetchData()
    }
  },
  getters: {
    totalPages(state) {
      return Math.ceil(state.total / state.perPage)
    },

    first(state) {
      return state.page * state.perPage
    }
  }
})
