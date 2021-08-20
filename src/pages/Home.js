
import { useContext } from "react";
import { RadioContext } from "../contexts/RadioContext";
import { Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import style from "../css/Home.module.css";

function Home() {
  const { channels } = useContext(RadioContext);

  const history = useHistory();
  const handleClick = (channelId) => {
    if (channelId === undefined) {
      history.push(`/AllChannels`);
    } else {
      history.push(`/channels/${channelId}`);
    }
  };
  const renderChannels = () => {
    return channels.channels.map((channel, index) => index < 4 && (
      <div
        className={style.channelCard}
        key={channel.id}
        onClick={() => handleClick(channel.id)} >
        <img src={channel.image} alt={channel.name} />
       <div>Tablå</div> 
      </div>
    ));
  };

  return (
    <Container className={style.channels}>
      <div className='text-center' ><h1>Populära kanaler</h1></div>
          <Container fluid className="d-flex justify-content-center align-content-center flex-wrap">
            {channels && renderChannels()}
          </Container>
      <div className='text-center'>
        <div className={style.channelText}><p onClick={() => handleClick()}>Visa alla kanaler..</p>
        </div>
      </div>
    </Container>
  )
}

export default Home;