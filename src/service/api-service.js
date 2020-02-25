export default class ApiService {
  constructor() {
    this.baseUrl = 'api-url'
  }

  async makeGetRequest(path, query) {
    const url = `${this.baseUrl}/${path}?${query}`
    try {
      const response = await fetch(url)
      return await response.json()
    } catch (e) {}
  }

  async makePostRequest(path, data) {
    const url = `${this.baseUrl}/${path}`
    try {
      const response = await fetch(url, {
        method: 'post',
        body: JSON.stringify(data)
      })
      return await response.json()
    } catch (e) {}
  };

// --- my !!! ---
  async getTodoList(url) {
    try {
      const response = await fetch(url)
      return await response.json()
    } catch (e) {}
    // return await this.mockServer()
  };

  async setEvent(url, data) {
    try {
      const response = await fetch(url, {
        method: 'put',
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
      return await response.json()
    } catch (e) {}
    // return await this.mockServer()
  };

  // --- my !!! ---

  async getLeads(phoneConfirmedStatus, selectorId) {
    return await this.mockServer()
  }

  async getCalls(id) {
    return await this.mockServer()
  }

  async getMessages(id) {
    return await this.mockServer()
  }

}