import { useContext } from "react";
import { Container } from "react-bootstrap";
import { RadioContext } from "../contexts/RadioContext";
import { useHistory } from "react-router-dom";
 import style from "../css/Home.module.css";

function AllChannels() {
  const { channels } = useContext(RadioContext);
  const history = useHistory();

  const handleClick = (channelId) => {
    history.push(`/channels/${channelId}`);
  };

  const renderChannels = () => {
    return channels.channels.map((channel) => (
      <div
      className={style.channelCard} 
      key={channel.id}
      onClick={() => handleClick(channel.id)}
      >
        <img src={channel.image} alt={channel.name}/>   
        </div>
    ));
  };

    return (
      <Container fluid className="d-flex justify-content-center align-content-center flex-wrap">
                {channels  && renderChannels()} 
      </Container>
   
    );
  }
  
  export default AllChannels;