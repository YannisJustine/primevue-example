import fetchWrapper from './fetch'

interface Row {
  id: number
  name: string
  country: {
    name: string
    code: string
  }
  company: string
  date: string
  status: string
  verified: boolean
  activity: number
  representative: {
    name: string
    image: string
  }
  balance: number
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
