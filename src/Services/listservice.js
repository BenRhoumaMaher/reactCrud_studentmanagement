import axios from 'axios'

export const fetchStudents = async () => {
  try {
    const response = await axios.get('http://localhost:8000/student/')
    return response.data
  } catch (error) {
    throw error
  }
}

export const deleteStudent = async id => {
  try {
    const response = await axios.delete(`http://localhost:8000/student/delete/${id}`)
    return response
  } catch (error) {
    throw error
  }
}