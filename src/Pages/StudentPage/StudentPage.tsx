import React, { useState } from 'react';
import Header from '../../Components/Header';
import { useParams } from 'react-router-dom';
import ModalCreationStudent from '../../Components/ModalCreationStudent';
import InformationMaterials from '../../Components/InformationMaterials';


const StudentPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [isVisible, setIsVisible] = useState(false);

  const toggleCreateStudentModal = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div>
      <Header buttonCreateStudent={toggleCreateStudentModal} />
      <ModalCreationStudent buttonCreateStudent={toggleCreateStudentModal} isVisible={isVisible}/>
      <InformationMaterials id={id}/>
    </div>
  );
};

export default StudentPage;
