import { useState } from "react";
import Header from "../../Components/Header";
import ModalCreationStudent from "../../Components/ModalCreationStudent";
import EditMaterialsForm from "../../Components/EditMaterialsForm";


const EditMaterialPage = () => {

    const [isVisible, setIsVisible] = useState(false);

    const toggleCreateStudentModal = () => {
        setIsVisible(!isVisible);
    };

    return (
        <div>
            <Header buttonCreateStudent={toggleCreateStudentModal}/>
            <ModalCreationStudent buttonCreateStudent={toggleCreateStudentModal} isVisible={isVisible}/>
            <EditMaterialsForm />
        </div>
    );
};

export default EditMaterialPage;