import React, { useEffect, useState } from "react";
import fetchApi from "../../utils/Request";
import { useNavigate } from "react-router-dom";

interface IMaterialsComponent {
  id: string;
  name: string;
  number: number;
  etudiants: string;
}

interface IInformationMaterials {
  id: string | undefined;
}

const InformationMaterials: React.FC<IInformationMaterials> = ({ id }) => {
  const [materials, setMaterials] = useState<IMaterialsComponent>();
  const navigate = useNavigate();
  const [student, setStudent] = useState<IMaterialsComponent>({
    id: "",
    name: "",
    number: 0,
    etudiants: "",
  });

  const getMaterials = async () => {
    try {
      const response = await fetchApi(`/materials/${id}`, 'GET');
      const data: IMaterialsComponent = response.data;
      setMaterials(data);

      // Mettez à jour l'état de l'étudiant avec les données du matériau
      setStudent(data);
    } catch (error) {
      console.error('Une erreur s\'est produite lors de la récupération des matériaux :', error);
    }
  };

  useEffect(() => {
    getMaterials();
  }, [id]);

  const deleteMaterials = async () => {
    try {
      await fetchApi(`/materials/${id}`, 'DELETE');
      console.log("élément supprimé");
      navigate("/")
    } catch (error) {
      console.error('Une erreur s\'est produite lors de la suppression du matériel :', error);
    }
  };

  const handleLogin = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const nameInput = event.target.name;
    const materialsText = event.target.value;
    setStudent(prevState => ({
      ...prevState,
      [nameInput]: nameInput === "number" ? parseInt(materialsText, 10) : materialsText
    }));
  };

  const EditMaterials = async () => {
    try {
      const material = {
        name: student.name,
        number: student.number,
        etudiants: student.etudiants
      };

      const response = await fetchApi(`/materials/${id}`, 'PUT', material);

      if (response.ok) {
        console.log("c'est bon");
        navigate("/")
      } else if (response.status === 404) {
        console.log("non.");
        
      }
    } catch (error) {
      console.error('Une erreur s\'est produite :', error);
    }
  };

  

  return (
    <div className="InformationMaterials">
      <div className="encadrement">
        <div className="informationMaterialsContent">
          <p>name: {materials?.name}</p>
          <p>number : {materials?.number}</p>
        </div>
        <div className="deleteMaterials">
          <p>Delete the Material</p>
          <button onClick={deleteMaterials}>Delete</button>
        </div>
      </div>
      <div className="editForm">
        <h1>add student</h1>
        <div>
          <label htmlFor="number">Numéro:</label>
          <input
            type="number"
            id="number"
            name="number"
            value={student.number}
            onChange={handleLogin}
          />
        </div>
        <div>
          <label htmlFor="etudiant">Étudiant:</label>
          <input
            type="text"
            id="etudiant"
            name="etudiants"
            value={student.etudiants}
            onChange={handleLogin}
          />
        </div>
        <button type="submit" onClick={EditMaterials}>Envoyer</button>
      </div>
    </div>
  );
};

export default InformationMaterials;
