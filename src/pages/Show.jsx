
import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState, } from "react"
import { Link } from "react-router-dom"
import { Routes, Route } from "react-router-dom"
import ShowFeeding from "../pages/ShowFeeding"
const moment= require('moment')

function Show(props) {
  const { id } = useParams();
  const babies = props.babies;
  const baby = babies.find((b) => b._id === id);
  let navigate = useNavigate();

  const [feedings, setFeedings] = useState(null)
  const URL = `https://mern-mobile-backend.herokuapp.com/babies/${id}`

  const getFeedings = async () => {
      const response = await fetch(URL)
      const data2 = await response.json()
      setFeedings(data2)
      
  }

console.log(props)

  const [editForm, setEditForm] = useState(baby);

  // handleChange function for form
  const handleChange = (event) => {
    setEditForm(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.updateBabies(editForm, id);
    navigate("/");
  };

  const removeBaby = () => {
    props.deleteBabies(id);
    navigate("/");
  };
  useEffect(() => {
    getFeedings()
}, [])







const loaded = () => {
  const feed= feedings.feed   
   const date = moment(feed.createdAt)
        // console.log(date)
        var dateComponent = date.utc().format('MM-DD-YYYY');
        var timeComponent = date.utc().format('HH:mm');
     
  return feed.map((feeding) => (
      <div key={feed._id} className="feeding">
          
          <Link to={`/feeding/${feeding._id}`} state={feed}>
                <h3>Feeding of: {dateComponent} at:{timeComponent} </h3>
                </Link>
                
      </div>
  ))
  
  
}
const loading = () => {
  return <h1>Loading...</h1>
}
  return (
        <div className="centered">

    <div className="baby">
      <h2 className="name-show">{baby.babyName}</h2>
      <h3 >Day of Birth: {baby.birthday}</h3>
      <h3>Parents: {baby.parents} </h3>
      <img className="img-show" src={baby.image} alt={baby.babyName} />
      
   
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={editForm.babyName}
          name="babyName"
          placeholder="babyName"
          onChange={handleChange}
          />
        <input
          type="text"
          value={editForm.birthday}
          name="birthday"
          placeholder="birthday yyyy-mm-dd"
          onChange={handleChange}
          />
        <input
          type="text"
          value={editForm.image}
          name="image"
          placeholder="image URL"
          onChange={handleChange}
          />
        <input className="input"
          type="text"
          value={editForm.parents}
          name="parents"
          placeholder="parents's name"
          onChange={handleChange}
          />
          <br>
          </br>
        <input type="submit" value="Update Baby" />
        <button id="delete" onClick={removeBaby}>
        DELETE BABY
      </button>
      </form>
       <h2>{}</h2>
    </div>
    
<h2 className="name-show"> Feedings</h2>
 
    {feedings ? loaded() : loading()}
          </div>
  );
}

export default Show;