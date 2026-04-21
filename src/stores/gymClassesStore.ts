import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { gymClassesAPI } from '@/api/gymClasses'

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
  category?: string | number
  enrolledCount?: number
}

// Category mapping from backend enum
const categoryMap: Record<number, string> = {
  0: 'Yoga',
  1: 'Fitness',
  2: 'Pilates',
  3: 'CrossFit',
}

export const useGymClassesStore = defineStore('gymClasses', () => {
  // State
  const classes = ref<GymClass[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Computed
  const allClasses = computed(() => classes.value)
  const isLoading = computed(() => loading.value)
  const hasError = computed(() => error.value !== null)

  // Get classes by category
  const getClassesByCategory = computed(() => {
    return (category: string) => {
      const filtered = classes.value.filter((c) => {
        const matches = c.category === category
        console.log(
          `Comparing class "${c.name}" category="${c.category}" with filter="${category}" => ${matches}`,
        )
        return matches
      })
      console.log(`Filter "${category}" returned ${filtered.length} classes`)
      return filtered
    }
  })

  // Get difficulty color
  const getDifficultyColor = (level: string) => {
    const colors: Record<string, string> = {
      Beginner: 'success',
      Intermediate: 'warning',
      Advanced: 'danger',
    }
    return colors[level] || 'info'
  }

  // Fetch all classes from API
  const fetchClasses = async () => {
    loading.value = true
    error.value = null
    try {
      const data = await gymClassesAPI.getAll()
      const fetchedClasses = Array.isArray(data) ? data : data.value || []

      // Update with fetched data
      if (fetchedClasses && fetchedClasses.length > 0) {
        classes.value = fetchedClasses.map((c: any) => ({
          ...c,
          // Convert numeric category to string name
          category: typeof c.category === 'number' ? categoryMap[c.category] : c.category,
          enrolledCount: c.enrolledCount || 0,
        }))
        // Debug: log all classes after fetching
        setTimeout(() => debugClasses(), 100)
      } else {
        classes.value = []
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch classes'
      classes.value = []
      console.error('Error fetching classes:', error.value)
    } finally {
      loading.value = false
    }
  }

  // Create class
  const createClass = async (classData: any) => {
    loading.value = true
    error.value = null
    try {
      const newClass = await gymClassesAPI.createClass(classData)

      // Normalize category: convert numeric to string
      if (typeof newClass.category === 'number') {
        newClass.category = categoryMap[newClass.category]
      } else if (newClass.category === null || newClass.category === undefined) {
        // If backend didn't return category, use the one that was sent
        newClass.category = classData.categoryName || classData.category
      }

      // Add mock ID if backend doesn't return one
      if (!newClass.id) {
        newClass.id = Date.now().toString()
      }
      classes.value.push(newClass)
      return newClass
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to create class'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Update class
  const updateClass = async (id: string, classData: any) => {
    loading.value = true
    error.value = null
    try {
      const updatedClass = await gymClassesAPI.update(id, classData)

      // Convert numeric category to string name
      if (typeof updatedClass.category === 'number') {
        updatedClass.category = categoryMap[updatedClass.category]
      } else if (updatedClass.category === null || updatedClass.category === undefined) {
        updatedClass.category = classData.categoryName || classData.category
      }

      const index = classes.value.findIndex((c) => c.id === id)
      if (index !== -1) {
        classes.value[index] = updatedClass
      }
      return updatedClass
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to update class'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Delete class
  const deleteClass = async (id: string) => {
    loading.value = true
    error.value = null
    try {
      await gymClassesAPI.delete(id)
      classes.value = classes.value.filter((c) => c.id !== id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to delete class'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Clear error
  const clearError = () => {
    error.value = null
  }

  // Debug helper to log all classes and their categories
  const debugClasses = () => {
    console.log('=== ALL CLASSES ===')
    console.log(`Total classes: ${classes.value.length}`)
    classes.value.forEach((c) => {
      console.log(`- ${c.name}: category="${c.category}" (type: ${typeof c.category})`)
    })
    console.log('=== CATEGORY SUMMARY ===')
    const categorySummary: Record<string, number> = {}
    classes.value.forEach((c) => {
      const cat = c.category as string
      categorySummary[cat] = (categorySummary[cat] || 0) + 1
    })
    console.table(categorySummary)
  }

  return {
    // State
    classes: allClasses,
    loading: isLoading,
    error: hasError,
    errorMessage: computed(() => error.value),

    // Computed
    getClassesByCategory,
    getDifficultyColor,

    // Actions
    fetchClasses,
    createClass,
    updateClass,
    deleteClass,
    clearError,
    debugClasses,
  }
})
