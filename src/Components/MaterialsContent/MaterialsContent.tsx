import { useEffect, useState } from "react";
import fecthApi from "../../utils/Request";
import MaterialsComponents from "../MaterialsComponents";
import { NavLink } from "react-router-dom";

interface IMaterials {
    _id: string;
    name: string;
    number: number;
}

const MaterialsContent = () => {

    const [material, setMaterial] = useState<IMaterials[]>([])

    const getMaterials = async () => {
        try {
            const response = await fecthApi(`/materials/`,'GET')
            const data = response.data
            setMaterial(data)
        } catch (error: any) {
            throw new Error(error);
            
        }
    }

    useEffect(()=>{
        getMaterials()
    },[])

    return (
        <div className="materialsContent">
            <div className="buttonContent">
                <NavLink to='/sendMail'>
                    <button>send mail</button>
                </NavLink>
            </div>
            <div className="materials">
                {
                    material?.map((materialItem: IMaterials) =>{
                        return (
                            <MaterialsComponents id={materialItem._id} name={materialItem.name} number={materialItem.number}/>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default MaterialsContent;