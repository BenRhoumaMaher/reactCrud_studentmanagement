import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function StudentTable () {
  const [students, setStudents] = useState('')
  const navigate = useNavigate()
  const Displaydetails = id => {
    navigate('/student/view/' + id)
  }
  const Editdetails = id => {
    navigate('/student/edit/' + id)
  }
  const deletedetails = id => {
    if (window.confirm('are you sure you want to delete ?')) {
      fetch('http://localhost:8000/students/' + id, {
        method: 'DELETE'
      })
        .then(res => {
          window.location.reload()
        })
        .catch(err => console.log(err.message))
    }
  }
  useEffect(() => {
    fetch('http://localhost:8000/students')
      .then(res => res.json())
      .then(data => {
        setStudents(data)
      })
      .catch(err => {
        console.log(err.message)
      })
  }, [])
  return (
    <div className='container'>
      <h2>Student Records</h2>
      <div className='table-container'>
        <Link to='/student/create' className='btn btn-add'>
          Add New Student
        </Link>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Place</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students &&
              students.map((student, index) => (
                <tr key={student.id}>
                  <td>{index + 1}</td>
                  <td>{student.name}</td>
                  <td>{student.place}</td>
                  <td>{student.phone}</td>
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
              ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
