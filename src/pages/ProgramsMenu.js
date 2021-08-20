import { useContext } from "react";
import { Container } from "react-bootstrap";
import { RadioContext } from "../contexts/RadioContext";
import { useHistory } from "react-router-dom";
 import style from "../css/Home.module.css";

function ProgramsMenu() {
  const { channels, getProgramById } = useContext(RadioContext);
  const history = useHistory();

  const handlethisClick = (channelId) => {
    getProgramById(channelId);
    history.push(`/programs/${channelId}`);
  };

  const renderChannels = () => {
    return channels.channels.map((channel) => (
      <div
      className={style.channelCard} 
      key={channel.id}
      onClick={() => handlethisClick(channel.id)}
      >
        <img src={channel.image} alt={channel.name}/>   
        </div>
    ));
  };

    return (

      <>
        <div  className={style.ProgramList}>  <h1> Välj Kanal för att se programlista:</h1> </div>
      <Container fluid className="d-flex justify-content-center align-content-center flex-wrap">
          
                {channels  && renderChannels()} 
      </Container>
   </>
    );
  }
  
  export default ProgramsMenu;