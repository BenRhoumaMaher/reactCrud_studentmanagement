import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getStudent } from './Services/viewservice'

export default function ViewStudent () {
  const { studentid } = useParams()
  const [studentData, setStudentData] = useState({})

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const data = await getStudent(studentid)
        setStudentData(data)
      } catch (error) {
        console.log(error.message)
      }
    }
    fetchStudent()
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
          <p>
            <strong>Date: </strong>
            {studentData.date}
          </p>
          <p>
            <strong>Classe: </strong>
            {studentData.classe}
          </p>
        </div>
      )}
      <Link to='/' className='btn btn-back'>
        Back
      </Link>
    </div>
  )
}
