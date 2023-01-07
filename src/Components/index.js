import React, { useState, useEffect } from 'react';

const StudentAttendance = () => {
  const [students, setStudents] = useState([]);
  const [studentsInSchool, setStudentsInSchool] = useState(0);

  useEffect(() => {
    setStudentsInSchool(students.filter(student => !student.checkOutTime).length);
  }, [students]);

  const addStudent = (rollNumber, name) => {
    setStudents([...students, { rollNumber, name, checkInTime: new Date() }]);
  }

  const checkOutStudent = (rollNumber) => {
    setStudents(students.map(student => {
      if (student.rollNumber === rollNumber) {
        return { ...student, checkOutTime: new Date() };
      }
      return student;
    }));
  }

  return (
    <div className='container'>
      <h1>Student Attendance</h1>
      <div className='col-6 '>
        <form>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Roll No:</label>
            <input type="email" class="form-control" id="roll-number" aria-describedby="emailHelp" />
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Name:</label>
            <input type="text" class="form-control" id="name" />
          </div>

          <button type="button" className='btn btn-danger' onClick={() => {
            const rollNumber = document.getElementById('roll-number').value;
            const name = document.getElementById('name').value;
            addStudent(rollNumber, name);
          }}>Check In</button>
        </form>

      </div>
      <br />
      <div className='container'>

        <table class="table">
          <thead>
            <tr>
              <th scope="col">Roll No</th>
              <th scope="col">Name</th>
              <th scope="col">Cheack In Time</th>
              <th scope="col">Check Out Time</th>
            </tr>
          </thead>
          <tbody>
            
            {students.map(student => (
            <tr key={student.rollNumber}>
              <td>{student.rollNumber}</td>
              <td>{student.name}</td>
              <td>{student.checkInTime.toString()}</td>
              <td>{student.checkOutTime ? student.checkOutTime.toString() : 'Not checked out'}</td>
              <td>{!student.checkOutTime && <button  className='btn btn-success'type="button" onClick={() => checkOutStudent(student.rollNumber)}>Check Out</button>}</td>
            </tr>
          ))}
            
            
          </tbody>
        </table>
      </div>

      <br />
      <p className='fw-b'>There are currently {studentsInSchool} students in the school.</p>
    </div>
  );
}

export default StudentAttendance;
