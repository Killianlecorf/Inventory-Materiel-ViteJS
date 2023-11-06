import { NavLink } from "react-router-dom";
import logoNWS from "../../assets/logo_nws.svg";

interface IHeader {
    buttonCreateStudent: () => void ;
}

const Header: React.FC<IHeader> = ({buttonCreateStudent}) => {  

    return (
        <div className="header">
            <div className="imageHeaderContent">
                <NavLink to='/'>
                    <img src={logoNWS} alt="logo Normandie web school" />
                </NavLink>
            </div>
            <div className="navigationHeaderContent">
                <button onClick={buttonCreateStudent} className="navigationButton">Create Material</button>
                <NavLink to='/sendmail' style={{width: "100px"}}><button className="navigationButton">Send mail</button></NavLink>
                <NavLink to='/lend' style={{width: "200px"}}><button className="navigationButton">Lend materials</button></NavLink>
            </div>
        </div>
    );
};

export default Header;