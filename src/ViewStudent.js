import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function ViewStudent () {
  const { studentid } = useParams()
  const [studentData, setStudentData] = useState({})
  useEffect(() => {
    fetch('http://localhost:8000/students/' + studentid)
      .then(res => res.json())
      .then(data => setStudentData(data))
      .catch(err => console.log(err.message))
  }, [studentid])
  return (
    <div className='container'>
      <h2>View Student</h2>
      {studentData && (
        <div className='details'>
          <p>
            <strong>Id: </strong>
            {studentData.id}
          </p>
          <p>
            <strong>Name: </strong>
            {studentData.name}
          </p>
          <p>
            <strong>Place: </strong>
            {studentData.place}
          </p>
          <p>
            <strong>Phone: </strong>
            {studentData.phone}
          </p>
        </div>
      )}
      <Link to='/' class='btn btn-back'>
        Back
      </Link>
    </div>
  )
}
