import { useContext } from "react";
import { RadioContext } from "../contexts/RadioContext";
import { UserContext } from "../contexts/UserContext";
import { Container } from "react-bootstrap";
import style from "../css/Home.module.css";

function Profile() {


  const { favoriteChannels, favoritePrograms } = useContext(RadioContext);
  // const { user } = useContext(UserContext);
  // console.log(user.id);
  const { loginState } = useContext(UserContext);


  let maincontent;
  if (loginState) {
    maincontent = (
<>
      <div>
        <h2>Mina favoritkanaler</h2>
        {!favoriteChannels ? ""
          : favoriteChannels.map((channel) => {
            return (
              <div className={style.favorite} key={channel.id}>
                {channel.channelName} {channel.channelType}{" "}
              </div>
            );
          })}

      </div>

<div>
<h2>Mina favoritProgram</h2>
{!favoritePrograms ? ""
  : favoritePrograms.map((program) => {
    return (
      <div className={style.favorite} key={program.id}>
        {program.programName} {program.programDescription}{" "}
      </div>
    );
  })}

</div>
</>
    )
  }
  else {
    maincontent = (<h1>Du måste logga in för att se din profil</h1>)
  }

  return (
    <Container >
      <div className='text-center'>{maincontent}</div>
    </Container>
  );
}

export default Profile;