import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { StudentForm } from './components/studentForm';
import { StudentContext, studentContextType } from './context/student';

export const EditStudent = () => {
  let { id } = useParams();
  let uuid = 0;
  const { addVisitedPage } = useContext(StudentContext) as studentContextType;

  useEffect(() => {
    addVisitedPage(window.location.href);
  }, []);
  
  if(typeof id === 'string') uuid = +id;

  return (
    <StudentForm isEditScreen={true} id={uuid} />
  );
};