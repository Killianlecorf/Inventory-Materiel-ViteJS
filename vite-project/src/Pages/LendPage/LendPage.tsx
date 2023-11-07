import { useState } from "react";
import Header from "../../Components/Header";
import ModalCreationStudent from "../../Components/ModalCreationStudent";
import LendMaterialsContent from "../../Components/LendMaterialsContent";

const LendPage = () => {

    const [isVisible, setIsVisible] = useState(false);

    const toggleCreateStudentModal = () => {
        setIsVisible(!isVisible);
    };

    return (
        <div>
            <Header buttonCreateStudent={toggleCreateStudentModal} />
            <ModalCreationStudent buttonCreateStudent={toggleCreateStudentModal} isVisible={isVisible}/>
            <LendMaterialsContent />
        </div>
    );
};

export default LendPage;