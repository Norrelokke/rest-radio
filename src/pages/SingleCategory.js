import { useContext } from "react";
import { RadioContext } from "../contexts/RadioContext";
import style from "../css/Home.module.css";
import { Container } from "react-bootstrap";
import { UserContext } from "../contexts/UserContext";

const SingleCategory = (props) => {
  const { category } = useContext(RadioContext);
  const { loginState } = useContext(UserContext);
  const { addProgramToFavorite, user } = useContext(UserContext);

  let maincontent;
  if (category !== null) {
    maincontent = (
      <>
        <div>
          {category.programs.map((program, index) => {
            return (
              <div
                className={style.programCard}
                key={index}>
                <img src={program.programimage} alt={program.programimage} />
                <h4>{program.name}</h4>
                {program.tagline}
                {program.description}

                {!loginState ?
                  <h5>Logga in för att lägga till programmet som favorit</h5>
                  :
                  <>
                    <div className={style.like} onClick={() =>
                      addProgramToFavorite({

                        userId: user.id,
                        id: program.id,
                        name: program.name,
                        description: program.description,

                      })
                    }><h5>Lägg till programmet som favorit</h5> <img src={program.programimage} alt="likebtn" /></div>
                  </>
                }
              </div>
            );
          })}
        </div>
      </>
    )
  }
  return (
    <Container >
      <div className='text-center'>{maincontent}</div>
    </Container>
  );
};

export default SingleCategory;
