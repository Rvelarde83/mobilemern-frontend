import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useLocation } from 'react-router-dom';
const moment = require('moment')

export default function ShowFeeding(props) {

    const { id } = useParams();
    const location = useLocation();
    let result = [];
    const data = location.state;
    // console.log(data)
    for (let i=0; i< data.length; i++){
        if(data[i]._id===id){
            result.push(data[i])
        }
    }

  
    const feedId = result[0].baby
    const babyIdStr = feedId[0]
    console.log(babyIdStr)


    // state 
    const [feedings, setFeedings] = useState(null)
    const URL = "https://mern-mobile-backend.herokuapp.com/feeding/"
    const URLCreate = `https://mern-mobile-backend.herokuapp.com/babies/${babyIdStr}/feeding/`

    const getFeedings = async () => {
        const response = await fetch(URL)
        const data2 = await response.json()
        setFeedings(data2)
    }
    const [feedingsC, setFeedingsC] = useState(null)
    const getFeedingsCreate = async () => {
        const responseC = await fetch(URLCreate)
        const dataC = await responseC.json()
        setFeedingsC(dataC)
    }
    const createFeedings = async (feeding) => {
        // make post request to create feedings
        await fetch(URLCreate, {
            method: "POST",
            headers: {
                "Content-Type": "Application/json",
            },
            body: JSON.stringify(feeding),
        })
        getFeedingsCreate()
    }
    // const updateFeedings = async (feeding, babyIdStr) => {
    //     await fetch(URL + babyIdStr, {
    //         method: "PUT",
    //         headers: {
    //             "Content-Type": "Application/json",
    //         },
    //         body:JSON.stringify(feeding),
    // })
    // update list of feedings
    //    getFeedings()
    // }

    const deleteFeedings = async (id) => {
        await fetch(URL + id, {
            method: 'DELETE',
        })
        getFeedings()
    }

    useEffect(() => {
        getFeedings()
    }, [])



    const [newForm, setNewForm] = useState({
        // clear the form to start aFresh

        milk: "",
        bottleAmount: "",
        BreastTime: "",
        baby: babyIdStr,


    })

    // handleChange function for form
    const handleChange = (event) => {
        setNewForm({ ...newForm, [event.target.name]: event.target.value })
    }

    // handle submit function for form
    const handleSubmit = (event) => {
        event.preventDefault()
        createFeedings(newForm)
        setNewForm({
            milk: "",
            bottleAmount: "",
            BreastTime: "",
            baby: babyIdStr,

        })
    }

    // loaded function
    const loaded = () => {
        const date = moment(data[0].createdAt)
        // console.log(date)
        var dateComponent = date.utc().format('MM-DD-YYYY');
        var timeComponent = date.utc().format('HH:mm');
        // console.log (data[0]._id)


        return result.map((feed) => (
            <div key={feed._id} className="feed">
                <h1> Feeding created at:    <br>
                </br> {dateComponent} at: {timeComponent}</h1>
                <h2>  </h2>
                <h2> Type of milk: {feed.milk} </h2>
                <h2> Amount of formula fed: {feed.bottleAmount}</h2>
                <h2> Time spent feeding: {feed.BreastTime}</h2>

            </div>
        ))


    }
    const loading = () => {
        return <h1>Loading...</h1>
    }

    return (
        <section className="centered">
            <h2 >Create a new Feeding</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={newForm.milk}
                    name="milk"
                    placeholder="type of milk"
                    onChange={handleChange}
                />
                <input
                    type="text"
                    value={newForm.bottleAmount}
                    name="bottleAmount"
                    placeholder="ammount of ml"
                    onChange={handleChange}
                />
                <input
                    type="text"
                    value={newForm.BreastTime}
                    name="BreastTime"
                    placeholder="Time spent feeding"
                    onChange={handleChange}
                />

                <br>
                </br>
                <input type="submit" value="Create New Feeding" />
                <div className="space-index">
                    <h3> Feeding data</h3>
                </div>
            </form>
            {data ? loaded() : loading()}
        </section>
    )
}