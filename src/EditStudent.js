import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getStudent, updateStudent } from './Services/editservice'

export default function EditStudent () {
  const { studentid } = useParams()
  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [place, setPlace] = useState('')
  const [phone, setPhone] = useState('')
  const [date, setDate] = useState('')
  const [validation, setValidation] = useState(false)
  const navigate = useNavigate()
  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const data = await getStudent(studentid)
        setName(data.name)
        setPlace(data.place)
        setPhone(data.phone)
        setDate(data.date)
      } catch (error) {
        console.log(error.message)
      }
    }
    fetchStudentData()
  }, [studentid])

  const handleSubmit = e => {
    e.preventDefault()
    const studentData = { id, name, place, phone, date }
    try {
      updateStudent(studentid, studentData)
      navigate('/')
    } catch (err) {
      console.error(err.message)
    }
  }
  return (
    <div className='container'>
      <h2>Edit Student Details</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor='name'>Name:</label>
        <input
          type='text'
          id='name'
          name='name'
          value={name}
          required
          onChange={e => setName(e.target.value)}
          onMouseDown={() => setValidation(true)}
        />
        {name.length === 0 && validation && (
          <span className='errorMsg'>Please enter your name</span>
        )}

        <label htmlFor='place'>Place:</label>
        <input
          type='text'
          id='place'
          name='place'
          value={place}
          required
          onChange={e => setPlace(e.target.value)}
          onMouseDown={() => setValidation(true)}
        />
        {place.length === 0 && validation && (
          <span className='errorMsg'>Please enter your place</span>
        )}

        <label htmlFor='phone'>Phone:</label>
        <input
          type='text'
          id='phone'
          name='phone'
          value={phone}
          required
          onChange={e => setPhone(e.target.value)}
          onMouseDown={() => setValidation(true)}
        />
        {phone.length === 0 && validation && (
          <span className='errorMsg'>Please enter your phone</span>
        )}

        <label htmlFor='date'>Date:</label>
        <input
          type='text'
          id='date'
          name='date'
          value={date}
          required
          onChange={e => setDate(e.target.value)}
          onMouseDown={() => setValidation(true)}
        />
        {date.length === 0 && validation && (
          <span className='errorMsg'>Please enter date</span>
        )}

        <div>
          <button className='btn btn-save'>Update</button>
          <Link to='/' className='btn btn-back'>
            Back
          </Link>
        </div>
      </form>
    </div>
  )
}
