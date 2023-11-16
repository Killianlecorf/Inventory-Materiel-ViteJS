import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import fetchApi from "../../utils/Request";

interface IMaterialsComponents {
    id :string;
    name : string,
    number: number;
}

const MaterialsComponents: React.FC<IMaterialsComponents> = ({id, name, number}) => {

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

    console.log(getNumber.length);

    return (
        <NavLink to={`/students/${id}`}>
            <div className='MaterialsComponents'>
                <div>name : {name}</div>
                <div>number : {number - getNumber.length}</div>
            </div>
        </NavLink>
    );
};

export default MaterialsComponents;
