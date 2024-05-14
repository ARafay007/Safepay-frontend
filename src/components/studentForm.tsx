import { ChangeEvent, FormEvent, useState, useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import {Form, Row, Col, Button} from 'react-bootstrap';
import { StudentContext, studentContextType } from '../context/student';

export const StudentForm = ({isEditScreen=false, id=0}: {isEditScreen?: boolean, id?: number}) => {
  type FormControlElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
  const { addStd, getStudent, updateStudent } = useContext(StudentContext) as studentContextType;
  const navigate = useNavigate();

  useEffect(() => {
    if(isEditScreen){
      const studentData = getStudent(id);
      studentData && setForm(studentData);
    }
  }, []);

  const [form, setForm] = useState({
    name: '',
    class: '',
    age: 0,
    sex: '',
    siblings: 0,
    gpa: 0,
  });

  const setFormFields = (fieldName: string) => (event: ChangeEvent<FormControlElement>) => {
    setForm({...form, [fieldName]: event.target.value});
  };

  const onHandleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const api: string = !isEditScreen ? `${process.env.REACT_APP_BASE_URL}:${process.env.REACT_APP_SERVER_PORT}/student` : `${process.env.REACT_APP_BASE_URL}:${process.env.REACT_APP_SERVER_PORT}/student/${id}`;

    const resp = await fetch(api, {
      method: !isEditScreen ? 'POST' : 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form)
    });

    const {uuid} = await resp.json();
    !isEditScreen ? addStd({uuid, ...form}) : updateStudent({uuid, ...form});

    isEditScreen && navigate('/');
  }

  return (
    <>
      <h1>{isEditScreen ? 'Edit' : 'Add'} Student</h1>
      <Form onSubmit={onHandleSubmit}>
        <Row>
          <Col lg='3'>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Nancy" onChange={setFormFields('name')} value={form.name} />
            </Form.Group>
          </Col>
          <Col lg='3'>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Class</Form.Label>
              <Form.Control type="text" placeholder="name@12th.com" onChange={setFormFields('class')} value={form.class} />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col lg='3'>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Age</Form.Label>
              <Form.Control type="number" placeholder="32" onChange={setFormFields('age')} value={form.age} />
            </Form.Group>
          </Col>
          <Col lg='3'>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Gender</Form.Label>
              <div key={`inline-typeradio`} className="mb-3">
              <Form.Check
                inline
                label="male"
                name="group1"
                type='radio'
                id={`inline-radio-1`}
                checked={form.sex === 'male' && true}
                value='male'
                onChange={setFormFields('sex')}
              />
              <Form.Check
                inline
                label="female"
                name="group1"
                type='radio'
                checked={form.sex === 'female' && true}
                value='female'
                id={`inline-radio-2`}
                onChange={setFormFields('sex')}
              />
            </div>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col lg='3'>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Siblings</Form.Label>
              <Form.Control type="number" placeholder="3" onChange={setFormFields('siblings')} value={form.siblings} />
            </Form.Group>
          </Col>
          <Col lg='3'>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>GPA</Form.Label> 
              <Form.Control type="number" step="0.01" placeholder="3.11" onChange={setFormFields('gpa')} value={form.gpa} />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
}