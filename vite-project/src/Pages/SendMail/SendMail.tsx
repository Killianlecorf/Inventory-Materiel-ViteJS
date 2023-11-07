import { useState } from "react";
import Header from "../../Components/Header";
import ModalCreationStudent from "../../Components/ModalCreationStudent";
import FormMail from "../../Components/FormMail";


const SendMail = () => {

    const [isVisible, setIsVisible] = useState(false);

    const toggleCreateStudentModal = () => {
        setIsVisible(!isVisible);
    };

    return (
        <div>
            <Header buttonCreateStudent={toggleCreateStudentModal} />
            <ModalCreationStudent buttonCreateStudent={toggleCreateStudentModal} isVisible={isVisible}/>
            <FormMail />
        </div>
    );
};

export default SendMail;