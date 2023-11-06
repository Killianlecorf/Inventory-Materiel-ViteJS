import { useState } from "react";
import { useNavigate } from "react-router-dom";
import fetchApi from "../../utils/Request";

interface ISendMail {
    to: string;
    subject: string;
    text: string;
}

const FormMail = () => {

    const navigate = useNavigate()
    const [mail, setMail] = useState<ISendMail>({
        to: "",
        subject: "",
        text: "",
      });

    const handleLogin = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const nameInput = event.target.name;
        const materialsText = event.target.value;
        setMail(prevState => ({
          ...prevState,
          [nameInput]: nameInput === "number" ? parseInt(materialsText, 10) : materialsText
        }));
      };

      const SendMailTo = async () => {
        try {
          const sendMailer = {
            to: mail.to,
            subject: mail.subject,
            text: mail.text,
          };
    
          const response = await fetchApi(`/service/send-email/`, 'POST', sendMailer);
    
          if (response.ok) {
            console.log("ok");
            navigate('/')
          } else if (response.status === 404) {
            console.log("non.");
            
          }
        } catch (error) {
          console.error('Une erreur s\'est produite :', error);
        }
      };
      
    return (
        <div className="FormMail">
            <div className="form">
                <h2>Send mail</h2>
                <div>
                    <label htmlFor="to">To:</label>
                    <input
                    type="text"
                    id="to"
                    name="to"
                    onChange={handleLogin}
                    />
                </div>
                <div>
                    <label htmlFor="subject">Subject:</label>
                    <input
                    type="text"
                    id="subject"
                    name="subject"
                    onChange={handleLogin}
                    />
                </div>
                <div>
                    <label htmlFor="text">Text:</label>
                    <textarea
                    id="text"
                    name="text"
                    onChange={handleLogin}
                    />
                </div>
                <div>
                    <button onClick={SendMailTo} type="submit">Submit</button>
                </div>
            </div>
        </div>
    );
};

export default FormMail;