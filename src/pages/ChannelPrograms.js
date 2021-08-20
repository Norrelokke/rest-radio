import { useContext } from "react";
import { RadioContext } from "../contexts/RadioContext";
import style from "../css/Home.module.css";
import { Container } from "react-bootstrap";
import { UserContext } from "../contexts/UserContext";

const ChannelPrograms = (props) => {
  const { program } = useContext(RadioContext);
  console.log(program);
  const { loginState, addProgramToFavorite, user, deleteFavoriteProgram  } = useContext(UserContext);

  return (
    <>

      {program === null
        ? ""
        : program.programs.map((program) => {
          return (
            <Container>
              <div
                className={style.programCard}
                key={program.id}>
                <img src={program.programimage} alt={program.name} />
                <div>
                  <div> {program.name} </div> {" "}
                  <div>{program.description} </div> {" "}
                  <div>{program.broadcastinfo} </div>
                </div>
         <Container>
              <div className='text-center'>  {!loginState ?
         <h6>Logga in för att lägga till Programmet som favorit</h6>
        : 
        <>
       <div className={style.like} onClick={() =>
        addProgramToFavorite({
          userId: user.id,
          id: program.id,
          name: program.name,
          tagline: program.description,
          channeltype: program.channeltype,
        })
      }><h6>Lägg till kanalen som favorit</h6> <img src={program.programimage} alt={program.name} width="20px"/></div>
         <div className={style.like} onClick={() =>
        deleteFavoriteProgram ({
          userId: user.id,
          id: program.id,
          name: program.name,
          tagline: program.description,
          channeltype: program.channeltype,
        })
      }><h6>Ta bort programmet som favorit</h6> <img src={program.programimage} alt={program.name} /></div>
      </>
        }
        </div> 
        </Container>
        </div>
            </Container>
          );
        })}
    </>
  );

};

export default ChannelPrograms;
