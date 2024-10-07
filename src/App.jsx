import './App.css'
import { Button, Input, Select } from "antd"
import Item from './components/Item'
import { useEffect, useState } from 'react'

function App() {
  const [students, setStudents] = useState([])
  const [teachers, setTeachers] = useState([])

  const [statusUsers, setStatusUser] = useState("1")
  const [refreshStudent, setRefreshStudent] = useState(false)
  const [refreshTeacher, setRefreshTeacher] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    const data = {
      name: e.target.name.value,
      surname: e.target.surname.value, 
    }
    if (statusUsers == "1") {
      data.study = e.target.jobOrStudy.value
      fetch("http://localhost:3000/student", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json"
        }
      }).then(res => {
        setRefreshStudent(!refreshStudent)
      })
    } else {
      data.job = e.target.jobOrStudy.value
      fetch("http://localhost:3000/teachers", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json"
        }
      }).then(res => {
        setRefreshTeacher(!refreshTeacher) 
      })
    }
  }

  useEffect(() => {
    fetch("http://localhost:3000/student").then(res => res.json())
      .then(data => setStudents(data))
  }, [refreshStudent])

  useEffect(() => {
    fetch("http://localhost:3000/teachers").then(res => res.json())
      .then(data => setTeachers(data)) 
  }, [refreshTeacher])

  return (
    <>
      <form autoCapitalize='off' onSubmit={handleSubmit} className='w-[600px] mx-auto mb-10 rounded-md  p-5 bg-slate-400'>
        <div className='flex items-center justify-between space-x-5'>
          <div className='flex flex-col w-[50%] gap-5'>
          <Select
  onChange={(e) => setStatusUser(e)}
  value={statusUsers} 
  allowClear
  size="Large"
  showSearch
  placeholder="Select a person"
  optionFilterProp="label"
  options={[
    {
      value: '1',
      label: 'Student',
    },
    {
      value: '2',
      label: 'Teachers',
    }
  ]}
/>

            <Input size='large' name='jobOrStudy' className='w-full' allowClear type="text" placeholder={`Enter ${statusUsers == "1" ? 'study place' : 'job name'}`} />
          </div>
          <div className='flex flex-col w-[50%] gap-5'>
            <Input name='name' size='large' className='w-full' allowClear type="text" placeholder='Enter name' />
            <Input name='surname' size='large' className='w-full' allowClear type="text" placeholder='Enter surname' />
          </div>
        </div>
        <Button type='primary' className='w-full mt-5 !bg-green-600' size='large'>
  Add {statusUsers == '1' ? "Student" : "Teacher"}
</Button>
      </form>
      <div className='flex justify-between gap-20 p-20'>
        <ul className='bg-slate-200 p-5 rounded-md space-y-4'>
          {students.map(item => <Item key={item.id} item={item} />)}
        </ul>
        <ul className='bg-slate-200 p-5 rounded-md space-y-4'>
          {teachers.map(item => <Item key={item.id} item={item} />)}
        </ul>
      </div>
    </>
  )
}

export default App
