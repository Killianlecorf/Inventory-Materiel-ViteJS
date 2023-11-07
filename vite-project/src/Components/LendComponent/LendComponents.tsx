import React, { useEffect, useState } from "react";
import formatDate from "../../utils/FormatDate";
import fetchApi from "../../utils/Request";
import { useNavigate } from "react-router-dom";

interface ILendComponents {
    _id :string;
    email : string;
    materials: string;
    date : Date;
}

interface IInformationMaterials {
    id :string;
    name : string;
    etudiant : string;
    number: number;
    date : Date;
}

const LendComponents:React.FC<ILendComponents> = ({_id, email, materials, date}) => {

    const navigate = useNavigate()
    const [InformationMaterials, setInformationMaterials] = useState<IInformationMaterials>()

    const deleteLendMaterial = async () => {
        try {
            await fetchApi(`/lend/${_id}`, "DELETE")
            console.log("cest bon");
            navigate("/")
        } catch (error: any) {
            console.log("erreur : " + error);
        }
    }

    const getMaterials = async () => {
        try {
            const response = await fetchApi(`/materials/${materials}`, "GET")
            const data = await response.data
            setInformationMaterials(data)
        } catch (error: any) {
            console.log('erruer : ' + error);
        }
    }

    useEffect(() => {
        getMaterials()
    },[InformationMaterials?.id])
    
    return (
        <div className="LendComponents">
            <p>email : {email}</p>
            <p>materials : {InformationMaterials?.name}</p>
            <p>date : {formatDate(date)}</p>
            <div className="buttonContent">
                <button onClick={deleteLendMaterial}>fin du pret</button>
            </div>
        </div>
    );
};

export default LendComponents;