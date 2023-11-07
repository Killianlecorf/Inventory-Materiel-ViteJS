import React, { useEffect, useState } from "react";
import fetchApi from "../../utils/Request";
import { NavLink, useNavigate } from "react-router-dom";
import formatDate from "../../utils/FormatDate";

interface IMaterialsComponents {
  id: string;
  name: string;
  number: number;
  date: Date | undefined;
}

interface ILendMaterials {
  email: string;
  material: string[];
}

interface IInformationMaterials {
  id: string | undefined;
}

interface IMailContent {
  to: string;
  subject: string;
  text: string;
}

const InformationMaterials: React.FC<IInformationMaterials> = ({ id }) => {
  const [materials, setMaterials] = useState<IMaterialsComponents | null>(null); 
  const navigate = useNavigate();
  const [student, setStudent] = useState<ILendMaterials>({
    email: "",
    material: [],
  });

  const sendMail: IMailContent = {
    to: student.email,
    subject: "prêt de matériels",
    text: `Bonjour, Ce mail vous a été envoyé pour un prêt du matériel : ${
      materials?.name
    } emprunté le ${materials?.date ? formatDate(materials.date) : ''} `,    
  };

  const sendMailFunction = async () => {
    try {
      await fetchApi(`/service/send-email`, "POST", sendMail);
      alert(`Un mail a été envoyé à ${student.email}`);
      console.log("C'est bon");
    } catch (error) {
      console.error('erreur : ' + error);
    }
  };

  const getMaterials = async () => {
    try {
      const response = await fetchApi(`/materials/${id}`, 'GET');
      const data: IMaterialsComponents = response.data;
      setMaterials(data);
    } catch (error) {
      console.error("Une erreur s'est produite lors de la récupération des matériaux :", error);
    }
  };

  useEffect(() => {
    getMaterials();
  }, [id]);

  const deleteMaterials = async () => {
    try {
      await fetchApi(`/materials/${id}`, 'DELETE');
      console.log("élément supprimé");
      navigate("/");
    } catch (error) {
      console.error("Une erreur s'est produite lors de la suppression du matériel :", error);
    }
  };

  const handleLogin = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const nameInput = event.target.name;
    const materialsText = event.target.value;
    setStudent((prevState) => ({
      ...prevState,
      [nameInput]: nameInput === "number" ? parseInt(materialsText, 10) : materialsText,
    }));
  };

  const EditMaterials = async () => {
    try {
      const LendMaterials = {
        email: student.email,
      };

      const response = await fetchApi(`/lend/${id}`, 'POST', LendMaterials);

      if (response.ok) {
        console.log("C'est bon");
        navigate("/");
      } else if (response.status === 404) {
        console.log("Non.");
      }
    } catch (error) {
      console.error("Une erreur s'est produite :", error);
    }
  };

  const [getNumber, setGetNumber] = useState<string[]>([]);

  const GetNumber = async () => {
    try {
      const response = await fetchApi(`/lend/material/${id}`, 'GET');
      const data = await response.data;
      if (Array.isArray(data)) {
        setGetNumber(data);
      }
    } catch (error) {
      console.log("erreur :" + error);
    }
  };

  useEffect(() => {
    GetNumber();
  }, [id]);

  const displayForm = () => {
    if (materials?.number ? materials.number - getNumber.length > 0 : false) {
      return (
        <div className="editForm">
          <h1>Ajouter un étudiant</h1>
          <div>
            <label htmlFor="email">Email :</label>
            <input
              type="email"
              id="email"
              name="email"
              value={student.email}
              onChange={handleLogin}
            />
          </div>
          <button type="submit" onClick={() => { EditMaterials(); sendMailFunction(); }}>
            Envoyer
          </button>
        </div>
      );
    }
    return <p>Stock indisponible...</p>;
  };

  return (
    <div className="InformationMaterials">
      <div className="encadrement">
        <div className="informationMaterialsContent">
          <p>Name : {materials?.name}</p>
          <p>Number : {materials?.number ? materials.number - getNumber.length : 0}</p>
        </div>
        <div className="deleteMaterials">
          <p>Delete the maetrial</p>
          <button onClick={deleteMaterials}>DELETE</button>
          <p>edit the material</p>
          <NavLink to={`/editmaterial/${id}`}>
            <button>EDIT</button>
          </NavLink>
        </div>
      </div>
      {displayForm()}
    </div>
  );
};

export default InformationMaterials;
