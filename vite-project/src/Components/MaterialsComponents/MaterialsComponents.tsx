import React from 'react';
import { NavLink } from 'react-router-dom';

interface IMaterialsComponents {
    id :string;
    name : string,
    number: number;
}

const MaterialsComponents: React.FC<IMaterialsComponents> = ({id, name, number}) => {
    return (
        <NavLink to={`/students/${id}`}>
            <div className='MaterialsComponents'>
                <div>name : {name}</div>
                <div>number : {number}</div>
            </div>
        </NavLink>
    );
};

export default MaterialsComponents;