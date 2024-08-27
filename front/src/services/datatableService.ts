import fetchWrapper from './fetch'

interface Row {
  id: number
  name: string
  email: string
  city: string
  phone: string
  website: string
}

interface DataTable {
  data: Row[]
  total: number
}

const datatableService = {
  baseUrl: '/api/datatable',

  getDatatable: async function (
    page: number,
    perPage: number,
    sortField: string,
    sortOrder: number
  ) {
    const url = `${this.baseUrl}`
    const params = {
      body: {
        page,
        perPage,
        sortField,
        sortOrder
      }
    }
    return fetchWrapper<DataTable>(url, 'POST', params)
  }
}

export default datatableService
