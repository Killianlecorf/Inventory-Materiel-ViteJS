import React, { useEffect, useState } from "react";
import { IoIosArrowUp } from "react-icons/io";
import fetchAPI from "../../utils/Request";
import { useNavigate } from "react-router-dom";

interface IModalCreationStudent {
    buttonCreateStudent: () => void;
    isVisible: boolean;
}

interface InformationMaterials {
    name: string;
    etudiants: string;
    number: number;
  }

const ModalCreationStudent: React.FC<IModalCreationStudent> = ({buttonCreateStudent, isVisible}) => {

    const [informationMaterials, setInformationMaterials] = useState<InformationMaterials>({
        name: '',
        etudiants: '',
        number: 0
    });

    const navigate = useNavigate()


    const handleLogin = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const nameInput = event.target.name;
        const materialsText = event.target.value;
        setInformationMaterials(prevState => ({
          ...prevState,
          [nameInput]: materialsText
        }));
      };

      const validationForm = async () => {

        const Material = {
            name: informationMaterials.name,
            etudiants: "0",
            number: informationMaterials.number
        };
        
        let response = await fetchAPI(`/materials/`, 'POST', Material);
        if (response.ok) {
            console.log("c\'est bon");
        }
        if (response.status === 401) {
            console.log("non.");
        }
    };

    return (
        <div className={`ModalCreationStudent ${isVisible ? 'ModalOpen' : 'ModalClose'}`}>
            <div className="titleModalContent">
                <h2>Creation Student</h2>
            </div>
            <div className="creationStudentFormContent">
                <div className="inputCreationContent">
                    <label>Name</label>
                    <input name="name" onChange={handleLogin} placeholder="Add the name" type="text" />
                </div>
                <div className="inputCreationContent">
                    <label>Nombre</label>
                    <input name="number" onChange={handleLogin} placeholder="Add the number" type="number" min={0} />
                </div>
            </div>
            <div className="creationStudentSubmitContent">
                <button onClick={validationForm} className="buttonBasic">Submit</button>
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