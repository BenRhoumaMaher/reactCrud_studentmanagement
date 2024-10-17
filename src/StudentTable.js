import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { fetchStudents, deleteStudent } from './Services/listservice'

export default function StudentTable () {
  const [students, setStudents] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()
  const Displaydetails = id => {
    navigate('/student/view/' + id)
  }
  const Editdetails = id => {
    navigate('/student/edit/' + id)
  }
  const deletedetails = async id => {
    if (window.confirm('are you sure you want to delete ?')) {
      try {
        await deleteStudent(id)
        getStudents()
      } catch(error) {
        console.error(error.message)
      }
    }
  }
  useEffect(() => {
    getStudents()
  },[])
    const getStudents = async () => {
      try {
        const data = await fetchStudents()
        setStudents(data)
      } catch (error) {
        console.log(error.message)
      }
    }
  const handleSearch = e => {
    setSearchQuery(e.target.value)
  }
  const filteredStudents = searchQuery
    ? students.filter(
        student =>
          student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          student.place.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : students
  return (
    <div className='container'>
      <h2>Student Records</h2>
      <div className='table-container'>
        <div className='mb-3'>
          <Link to='/student/create' className='btn btn-add'>
            Add New Student
          </Link>
          <input
            type='text'
            placeholder='Search...'
            value={searchQuery}
            onChange={handleSearch}
            className='btn btn-search'
          />
        </div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Place</th>
              <th>Phone</th>
              <th>Date</th>
              <th>Classe</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student, index) => (
                <tr key={student.id}>
                  <td>{index + 1}</td>
                  <td>{student.name}</td>
                  <td>{student.place}</td>
                  <td>{student.phone}</td>
                  <td>{student.date}</td>
                  <td>{student.classe}</td>
                  <td>
                    <button
                      onClick={() => Displaydetails(student.id)}
                      className='btn btn-info'
                    >
                      View
                    </button>
                    <button
                      onClick={() => Editdetails(student.id)}
                      className='btn btn-primary'
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deletedetails(student.id)}
                      className='btn btn-danger'
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan='5' className='text-center text-danger'>
                  No students found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
