// Backend URL configuration
const BACKEND_URL = 'https://localhost:7130'

export interface GymClass {
  id?: string
  name: string
  description?: string
  instructorName: string
  maxCapacity: number
  schedule: string
  difficultyLevel: 'Beginner' | 'Intermediate' | 'Advanced'
  durationMinutes?: number
  price?: number
  isActive?: boolean
  category?: string
  enrolledCount?: number
}

// Gym Classes API calls
export const gymClassesAPI = {
  // Create a new gym class
  async createClass(classData: GymClass): Promise<GymClass> {
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
  async getAll(): Promise<GymClass[]> {
    const response = await fetch(`${BACKEND_URL}/api/GymClasses/`, {
      method: 'GET',
    })

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`)
    }

    const data = await response.json()
    return Array.isArray(data) ? data : data.value || []
  },

  // Get a single gym class
  async getById(id: string): Promise<GymClass> {
    const response = await fetch(`${BACKEND_URL}/api/GymClasses/${id}`, {
      method: 'GET',
    })

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`)
    }

    return await response.json()
  },

  // Update a gym class
  async update(id: string, classData: Partial<GymClass>): Promise<GymClass> {
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
  async delete(id: string): Promise<void> {
    const response = await fetch(`${BACKEND_URL}/api/GymClasses/${id}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`)
    }
  },
}
