import { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import {Table, Button} from 'react-bootstrap';
import { StudentContext, studentContextType } from '../context/student';

export const DisplayStudents = () => {
  const { students, recentVisitedStd, setStudentsInState, deleteStudent } = useContext(StudentContext) as studentContextType;  
  
  useEffect(() => {
    const retrieveStudent = async () => {
      const resp  = await fetch(`${process.env.REACT_APP_BASE_URL}:${process.env.REACT_APP_SERVER_PORT}/students`);
      const data = await resp.json();
      setStudentsInState(data);
    };

    retrieveStudent();
  }, []);

  const onHandleDelete = async (uuid: number) => {
    await fetch(`${process.env.REACT_APP_BASE_URL}:${process.env.REACT_APP_SERVER_PORT}/student/${uuid}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    });

    deleteStudent(uuid);
  };

  const renderStudents = () => {
    return students.map(el => (
      <tr key={el.uuid}>
        <td>{el.name}</td>
        <td>{el.class}</td>
        <td>{el.age}</td>
        <td>{el.sex}</td>
        <td>{el.gpa}</td>
        <td>
          <Button variant="danger" onClick={() => onHandleDelete(el.uuid)}>Delete</Button>
          <Link to={`/${el.uuid}`}>
            <Button variant="info">Update</Button>
          </Link>
        </td>
      </tr>
    ));
  };

  const renderRecentlyVisitedStudents = () => (
    recentVisitedStd.map(el => (
      <tr key={el}>
        <td>{el}</td>
      </tr>
    ))
  );

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Recently Visited Student(s)</th>
          </tr>
        </thead>
        <tbody>
          {renderRecentlyVisitedStudents()}
        </tbody>
      </Table>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Class</th>
            <th>Age</th>
            <th>Gender</th>
            <th>GPA</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {renderStudents()}
        </tbody>
      </Table>
    </>
  );
};