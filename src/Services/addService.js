import axios from 'axios'

export const addStudent = async FormData => {
  try {
    const response = await axios.post('http://localhost:8000/student/new', FormData, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response.data
  } catch (error) {
    if (
      error.response &&
      error.response.data &&
      error.response.status === 400
    ) {
      return error.response.data
    } else {
      throw new Error('An unexpected error occurred')
    }
  }
}
