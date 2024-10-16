import axios from 'axios'

export const getStudent = async id => {
  try {
    const response = await axios.get(`http://localhost:8000/student/${id}`)
    return response.data
  } catch (error) {
    throw error
  }
}

export const updateStudent = async (id, studentData) => {
  try {
    const response = await axios.put(`http://localhost:8000/student/edit/${id}`, studentData)
    return response
  } catch (error) {
    throw error
  }
}
