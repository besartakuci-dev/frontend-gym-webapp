// Backend URL configuration
const BACKEND_URL = 'https://localhost:7130'

// Gym Classes API calls
export const gymClassesAPI = {
  // Create a new gym class
  async createClass(classData: any) {
    const response = await fetch(`${BACKEND_URL}/api/GymClasses/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(classData),
    })

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`)
    }

    return await response.json()
  },

  // Get all gym classes
  async getAll() {
    const response = await fetch(`${BACKEND_URL}/api/GymClasses/`, {
      method: 'GET',
    })

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`)
    }

    return await response.json()
  },

  // Get a single gym class
  async getById(id: string) {
    const response = await fetch(`${BACKEND_URL}/api/GymClasses/${id}`, {
      method: 'GET',
    })

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`)
    }

    return await response.json()
  },

  // Update a gym class
  async update(id: string, classData: any) {
    const response = await fetch(`${BACKEND_URL}/api/GymClasses/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(classData),
    })

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`)
    }

    return await response.json()
  },

  // Delete a gym class
  async delete(id: string) {
    const response = await fetch(`${BACKEND_URL}/api/GymClasses/${id}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`)
    }

    return await response.json()
  },
}
