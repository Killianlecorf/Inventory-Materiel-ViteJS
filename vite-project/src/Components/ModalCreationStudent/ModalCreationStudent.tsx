import React from "react";
import { IoIosArrowUp } from "react-icons/io";

interface IModalCreationStudent {
    buttonCreateStudent: () => void;
    isVisible: boolean;
}

const ModalCreationStudent: React.FC<IModalCreationStudent> = ({buttonCreateStudent, isVisible}) => {


    return (
        <div className={`ModalCreationStudent ${isVisible ? 'ModalOpen' : 'ModalClose'}`}>
            <div className="titleModalContent">
                <h2>Creation Student</h2>
            </div>
            <div className="creationStudentFormContent">
                <div className="inputCreationContent">
                    <label>Name</label>
                    <input placeholder="Add the name" type="text" />
                </div>
                <div className="inputCreationContent">
                    <label>Description</label>
                    <input placeholder="Add the description" type="text" />
                </div>
            </div>
            <div className="creationStudentSubmitContent">
                <button className="buttonBasic">Submit</button>
            </div>
            <div onClick={buttonCreateStudent} className="returnCreationStudentModal">
                <div className="returnContentModal">
                    <p><IoIosArrowUp/>Cliquez pour fermer</p>
                </div>
            </div>
        </div>
    );
};

export default ModalCreationStudent;