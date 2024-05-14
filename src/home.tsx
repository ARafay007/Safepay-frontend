import {Container, Stack} from 'react-bootstrap';
import { StudentForm } from './components/studentForm';
import { DisplayStudents } from './components/displayStudent';

export const Home = () => {
  return (
    <>
      <Container>
        <Stack gap={5}>
          <StudentForm />
          <DisplayStudents />
        </Stack>
      </Container>
    </>
  );
}