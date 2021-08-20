import { useContext, useEffect } from "react";
import { Jumbotron, Container } from "react-bootstrap";
import { RadioContext } from "../contexts/RadioContext";
import { useParams } from "react-router-dom";
import style from "../css/Home.module.css";
import { UserContext } from "../contexts/UserContext";

function SingleChannel(props) {
  let { getChannelById, singleChannel, schedule, getSchedule } = useContext(RadioContext);
  const historyParam = useParams();
 const { loginState, addChannelToFavorite, user, deleteFavorite  } = useContext(UserContext);

  useEffect(() => {
    getChannelById(historyParam.id);
    getSchedule(historyParam.id);
    //eslint-disable-next-line
  }, [historyParam.id]);

  let maincontent;
  if (singleChannel && schedule) {
    maincontent = (
      <>
        <Jumbotron fluid className="d-flex justify-content-center align-content-center flex-wrap mx-auto">
          <div className={style.SingleChannel} key={singleChannel.channelId}>
            <div className="text-center"><img src={singleChannel.channel.image} alt={singleChannel.channel.name} />
              <div className={style.SingleChannelText}><p>{singleChannel.channel.tagline}</p>
          
              </div></div>

          </div>
          <div className='text-center'>  {!loginState ?
         <h6>Logga in för att lägga till kanalen som favorit</h6>
        : 
        <>
       <div className={style.like} onClick={() =>
        addChannelToFavorite({
          userId: user.id,
          id: singleChannel.channel.id,
          name: singleChannel.channel.name,
          tagline: singleChannel.channel.tagline,
          channeltype: singleChannel.channel.channeltype,
        })
      }><h6>Lägg till kanalen som favorit</h6> <img src={singleChannel.channel.image} alt={singleChannel.channel.name} /></div>
         <div className={style.like} onClick={() =>
        deleteFavorite ({
          userId: user.id,
          id: singleChannel.channel.id,
          name: singleChannel.channel.name,
          tagline: singleChannel.channel.tagline,
          channeltype: singleChannel.channel.channeltype,
        })
      }><h6>Ta bort kanalen som favorit</h6> <img src={singleChannel.channel.image} alt={singleChannel.channel.name} /></div>
      </>
        }
        </div> 
        </Jumbotron>
    

        {schedule.map((scheduledepisode, index) => {
          return (
            <Container className={style.episode} key={index}>
              <img src={scheduledepisode.imageurl} alt={scheduledepisode.imageurl} />
              <div >
                {scheduledepisode.title}
                
                <div>{scheduledepisode.starttimeutc} -{" "}
                {scheduledepisode.endtimeutc}{" "}
                </div> 
                <div> {scheduledepisode.description}</div> 
              </div>

            

            </Container>
          );
        })}


      </>
    )
  }

return (
    <div> {maincontent} </div>
  );
}

export default SingleChannel;