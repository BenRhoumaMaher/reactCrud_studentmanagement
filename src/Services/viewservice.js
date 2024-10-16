import axios from 'axios'

export const getStudent = async id => {
    try {
      const response = await axios.get(`http://localhost:8000/student/${id}`)
      return response.data
    } catch (error) {
      throw error
    }
  }