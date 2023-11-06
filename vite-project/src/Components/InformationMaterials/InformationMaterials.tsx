import React, { useEffect, useState } from "react";
import fetchApi from "../../utils/Request";
import { useNavigate } from "react-router-dom";

interface IMaterialsComponents {
  id :string;
  name : string,
  number: number;
}


interface ILendMaterials {
  email: string;
  material: string[];
}

interface IInformationMaterials {
  id: string | undefined;
}

const InformationMaterials: React.FC<IInformationMaterials> = ({ id }) => {
  const [materials, setMaterials] = useState<IMaterialsComponents>();
  const navigate = useNavigate();
  const [student, setStudent] = useState<ILendMaterials>({
    email: "",
    material: []
  });

  const getMaterials = async () => {
    try {
      const response = await fetchApi(`/materials/${id}`, 'GET');
      const data: IMaterialsComponents = response.data;
      setMaterials(data);

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
      const LendMaterials = {
        email: student.email,
      };

      const response = await fetchApi(`/lend/${id}`, 'POST', LendMaterials);

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

  const [getNumber, setGetNumber] = useState<string[]>([]); 

    const GetNumber = async () => {
        try {
            const response = await fetchApi(`/lend/material/${id}`, 'GET')
            const data = await response.data;
            if (Array.isArray(data)) { 
                setGetNumber(data);
            }
        } catch (error: any) {
            console.log("erreur :" + error);
        }
    }

    useEffect(() => {
        GetNumber();
    }, [id]);

    const displayForm = () => {
      if (materials?.number ? materials.number - getNumber.length > 0 : false) {
        return (
          <div className="editForm">
            <h1>add student</h1>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={student.email}
                onChange={handleLogin}
              />
            </div>
            <button type="submit" onClick={EditMaterials}>Envoyer</button>
          </div>
        );
      }
      return (<p>stock indisponible ...</p>); 
    }
    


  return (
    <div className="InformationMaterials">
      <div className="encadrement">
        <div className="informationMaterialsContent">
          <p>name: {materials?.name}</p>
          <p>number: {materials?.number ? materials.number - getNumber.length : 0}</p>
        </div>
        <div className="deleteMaterials">
          <p>Delete the Material</p>
          <button onClick={deleteMaterials}>Delete</button>
        </div>
      </div>
     {displayForm()}
    </div>
  );
};

export default InformationMaterials;
