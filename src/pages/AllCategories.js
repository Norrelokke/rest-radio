import { useContext, useEffect } from "react";
import { Jumbotron } from "react-bootstrap";
import { RadioContext } from "../contexts/RadioContext";
import { useHistory } from "react-router-dom";
import style from "../css/Home.module.css";


function AllCategories() {
  const history = useHistory();
  const { getCategoryById } = useContext(RadioContext);


  useEffect(() => {
    getCategoryById(history.id);
    //eslint-disable-next-line
  }, [history.id]);

  const handleClick = (channelId) => {
    getCategoryById(channelId);
    history.push(`/category/${channelId}`);
  };

  return (
    <Jumbotron>
    <div className={style.Categories}>
 
        <h4> Välj programkategori:</h4>
       
        <div  onClick={() => handleClick(5)} className={style.Categories}><img  className={style.Categories} src="/assets/5.png" alt="musikimage" /> <h3>Musik</h3> </div>

        <div  onClick={() => handleClick(4)} className={style.Categories}>  <img  className={style.Categories} src="/assets/3.png" alt="musikimage" /><h3>Livsåskådning</h3></div>

        <div onClick={() => handleClick(14)} className={style.Categories}>  <img  className={style.Categories} src="/assets/2.png" alt="musikimage" /><h3>Livsstil</h3></div>

        <div  onClick={() => handleClick(82)} className={style.Categories}>  <img  className={style.Categories} src="/assets/6.png" alt="musikimage" /><h3>Dokumentär</h3></div>
      
        <div  onClick={() => handleClick(133)} className={style.Categories}>  <img  className={style.Categories} src="/assets/7.png" alt="musikimage" /><h3>Humor</h3></div>
 
        <div onClick={() => handleClick(135)} className={style.Categories}>  <img  className={style.Categories} src="/assets/4.jpg" alt="musikimage" /><h3>Ekonomi</h3></div>
       
        <div onClick={() => handleClick(3)} className={style.Categories}>  <img  className={style.Categories} src="/assets/1.png" alt="musikimage" /> <h3>Kultur & Nöje</h3> </div>
   
        <div onClick={() => handleClick(2)} className={style.Categories}>  <img  className={style.Categories} src="/assets/9.jpg" alt="musikimage" /><h3>Barn 3-8 år</h3></div>
  
        <div onClick={() => handleClick(132)} className={style.Categories}>  <img  className={style.Categories} src="/assets/8.png" alt="musikimage" /><h3>Barn 9-13 år</h3> </div>
     
    </div>
    </Jumbotron>
  );
}

export default AllCategories;