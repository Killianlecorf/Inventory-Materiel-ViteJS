import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import fetchApi from "../../utils/Request";
import redirectToPage from "../../utils/UrlRedirection";


interface IMaterial {
    name : string;
    number : number;
}

const EditMaterialsForm:React.FC = () => {

    const {id} = useParams()
    const [material, setMaterial]= useState<IMaterial>({
        name : "",
        number : 0
    })

    const getMaterial = async () => {
        try {
            const response = await fetchApi(`/materials/${id}`,'GET')
            const data = await response.data
            setMaterial(data)
        } catch (error:any) {
            console.log('erreur:' + error);
            
        }
    }

    useEffect(() => {
        getMaterial()
    },[id])

    const handleLogin = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const nameInput = event.target.name;
        const materialsText = event.target.value;
        setMaterial((prevState) => ({
          ...prevState,
          [nameInput]: nameInput === "number" ? parseInt(materialsText, 10) : materialsText,
        }));
      };

    console.log(material);
    
      const modificationMaterial = async () => {
        
        const editMaterial = {
            name : material.name,
            number: material.number
        }

        try {
            await fetchApi(`/materials/${id}`,"PUT", editMaterial)
            console.log('cest bon');
            redirectToPage('/')
        } catch (error:any) {
            console.log("erreur :" + error);
        }
      }


    return (
        <div className="EditMaterialsFormContent">
            <div className="EditMaterialsForm">
                <h2>Edit the material</h2>
                <label htmlFor="name">Name</label>
                <input 
                    name="name" 
                    onChange={handleLogin}  
                    value={material.name}
                    type="text" 
                />
                <label htmlFor="name" >Number</label>
                <input 
                    name="number" 
                    onChange={handleLogin} 
                    type="number" 
                    value={material.number}
                    min="0"
                />
                <button type="submit" onClick={modificationMaterial}>Submit</button>
            </div>
        </div>
    );
};

export default EditMaterialsForm;