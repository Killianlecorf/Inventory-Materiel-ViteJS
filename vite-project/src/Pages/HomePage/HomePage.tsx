import { useState } from "react";
import Header from "../../Components/Header";
import ModalCreationStudent from "../../Components/ModalCreationStudent";


const HomePage = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleCreateStudentModal = () => {
        setIsVisible(!isVisible);
    };

    return (
        <div>
            <Header buttonCreateStudent={toggleCreateStudentModal}/>
            <ModalCreationStudent buttonCreateStudent={toggleCreateStudentModal} isVisible={isVisible}/>
        </div>
    );
};

export default HomePage;