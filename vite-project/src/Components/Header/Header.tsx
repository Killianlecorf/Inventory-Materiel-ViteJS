import logoNWS from "../../assets/logo_nws.svg";

interface IHeader {
    buttonCreateStudent: () => void ;
}

const Header: React.FC<IHeader> = ({buttonCreateStudent}) => {  

    return (
        <div className="header">
            <div className="imageHeaderContent">
                <img src={logoNWS} alt="logo Normandie web school" />
            </div>
            <div className="navigationHeaderContent">
                <button className="navigationButton">Create Material</button>
                <button onClick={buttonCreateStudent} className="navigationButton">Create Student</button>
                <button className="navigationButton">Show Students</button>
            </div>
        </div>
    );
};

export default Header;