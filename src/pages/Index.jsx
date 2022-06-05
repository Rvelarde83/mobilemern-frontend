import { useState } from "react"
import { Link } from "react-router-dom"

export default function Index(props) {
    // state to hold formData
    const [newForm, setNewForm] = useState({
        // clear the form to start aFresh

        babyName: "",
        birthday: "",
        image: "",
        parents: "",
       
    })

    // handleChange function for form
    const handleChange = (event) => {
        setNewForm({ ...newForm, [event.target.name]: event.target.value })
    }

    // handle submit function for form
    const handleSubmit = (event) => {
        event.preventDefault()
        props.createBabies(newForm)
        setNewForm({
            babyName: "",
            birthday: "",
            image: "",
            parents: ""
        })
    }

    // loaded function
    const loaded = () => {
        
        return props.babies.map((baby) => (
            <div key={baby._id} className="baby">
                <Link className="names-index" to={`/babies/${baby._id}`}>
                    <h1 >{baby.babyName}</h1>
                   
                </Link>
                {/* <h2>{baby.birthday}</h2> */}
                <img className= "img-index" src={baby.image} alt={baby.babyName} />
                {/* <h3>Parents's Name: {baby.parents} </h3> */}
            </div>
        ))

        
    }
    const loading = () => {
        return <h1>Loading...</h1>
    }

    return (
        <section className="centered">
            <h2 >Create a new baby profile</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={newForm.babyName}
                    name="babyName"
                    placeholder="name of the baby"
                    onChange={handleChange}
                />
                <input
                    type="text"
                    value={newForm.birthday}
                    name="birthday"
                    placeholder="birthday yyyy-mm-dd"
                    onChange={handleChange}
                />
                <input
                    type="text"
                    value={newForm.image}
                    name="image"
                    placeholder="image URL"
                    onChange={handleChange}
                />
                <input
                    type="text"
                    value={newForm.parents}
                    name="parents"
                    placeholder="parents's name"
                    onChange={handleChange}
                />
                <br>
                </br>
                <input type="submit" value="Create Baby" />
                <div className="space-index">
                   <h3>Click to view babies</h3>
                </div>
            </form>
            {props.babies ? loaded() : loading()}
        </section>
    )
}