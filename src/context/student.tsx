import { createContext, ReactNode, useState } from "react";

interface stdStateStructure{
  uuid: number,
  name: string,
  class: string,
  age: number,
  sex: string,
  siblings: number,
  gpa: number,
}

type recentPagesStateStructure = string;

export type studentContextType = {
  students: stdStateStructure[];
  recentVisitedStd: recentPagesStateStructure[];
  addStd: (payload: stdStateStructure) => void;
  setStudentsInState: (payload: stdStateStructure[]) => void;
  deleteStudent: (uuid: number) => void;
  updateStudent: (payload: stdStateStructure) => void;
  addVisitedPage: (link: string) => void;
  getStudent: (uuid: number) => stdStateStructure | undefined;
};

export const StudentContext = createContext<studentContextType | null>(null);

export const StudentProvider = ({children}: {children: ReactNode}) => {
  const [students, setStudents] = useState<stdStateStructure[]>([]);
  const [recentVisitedStd, setRecentVisitedStd] = useState<recentPagesStateStructure[]>([]);

  const setStudentsInState = (payload: stdStateStructure[]) => {
    setStudents([...payload]);
  };

  const getStudent = (uuid: number) => {
    return students.find(el => el.uuid === uuid);
  }

  const addStd = (payload: stdStateStructure) => {
    setStudents([...students, payload]);
  };

  const deleteStudent = (uuid: number) => {
    setStudents(students.filter(el => el.uuid !== uuid));
  };

  const updateStudent = (payload: stdStateStructure) => {
    const studentsClone = structuredClone(students);
    
    setStudents(
      studentsClone.map(el => {
        if(payload.uuid === el.uuid){
          el = payload;
        }
        return el;
      })
    );
  };

  const addVisitedPage = (link: string) => {
    const recentVisitedStdClone = structuredClone(recentVisitedStd);

    if(recentVisitedStdClone.length === 5){
      recentVisitedStdClone.pop();
      recentVisitedStdClone.unshift(link);
    }
    else{
      recentVisitedStdClone.push(link);
    }

    setRecentVisitedStd(recentVisitedStdClone);
  };

  return (
    <StudentContext.Provider value={{ students, recentVisitedStd, addStd, setStudentsInState, deleteStudent, updateStudent, getStudent, addVisitedPage }}>
      {children}
    </StudentContext.Provider>
  );
}