import { useSelector } from "react-redux";
import ContactCard from "../ContactCard/ContactCard.jsx";
import "./Contacts.css";

const Contacts = () => {
  // Use useSelector to access the chats from the Redux store
  const contacts = useSelector((state) => state.chat.chats);
  
 
  

  return (
    <div className="contacts">
      <div className="contacts__heading">
        <h1> Contacts </h1>
      </div>
      <div className="contacts__list">
        {contacts.map((contact) => (
          <ContactCard key={contact.id} contact={contact} />
        ))}
      </div>
    </div>
  );
};

export default Contacts;
