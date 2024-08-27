type Method = 'GET' | 'POST' | 'PUT' | 'DELETE'

async function fetchWrapper<R>(url: string, method: Method, options?: any): Promise<R> {
  try {
    const { body, ...restOptions } = options || {}
    const updatedOptions: RequestInit = {
      method,
      ...restOptions,
      headers: {
        ...(restOptions?.headers || {}),
        'Content-Type': body instanceof FormData ? 'multipart/form-data' : 'application/json'
      },
      body: body instanceof FormData ? body : JSON.stringify(body)
    }

    const response = await fetch(url, updatedOptions)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const json = await response.json()
    return json
  } catch (error) {
    console.error('An error occurred while making the request:', error)
    throw error
  }
}

export default fetchWrapper
