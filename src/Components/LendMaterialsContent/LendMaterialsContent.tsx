import { useEffect, useState } from "react";
import fetchApi from "../../utils/Request";
import LendComponents from "../LendComponent";

interface ILendMaterials {
    _id : string;
    email: string;
    material: string;
    date: Date;
}

const LendMaterialsContent = () => {

    const [lendMaterials, setLendMaterials] = useState<ILendMaterials[]>([]);

    const getLendMaterials = async () => {
        try {
            const response = await fetchApi(`/lend/`, 'GET');
            const data: ILendMaterials[] = response.data;
            setLendMaterials(data);
        } catch (error) {
            console.error('Une erreur s\'est produite lors de la récupération des matériaux :', error);
        }
    };

    useEffect(() => {
        getLendMaterials();
    }, []);

    console.log(lendMaterials);

    return (
        <div className='LendMaterialsContent'>
            {
                lendMaterials.map((materialItem: ILendMaterials) => (
                    <LendComponents _id={materialItem._id} email={materialItem.email} materials={materialItem.material} date={materialItem.date} />
                ))
            }   
        </div>
    );
};

export default LendMaterialsContent;
