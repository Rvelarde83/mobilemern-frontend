import { useEffect, useState } from "react"
import { Routes, Route } from "react-router-dom"
// import Index from "../pages/Index"
import Show from "../pages/Show"



function FeedingMain(props) {
    
    const [feedings, setFeedings] = useState(null)
    const URL = "http://localhost:3001/feeding/"

    const getFeedings = async () => {
        const response = await fetch(URL)
        const data = await response.json()
        setFeedings(data.feed)
    }

    const createFeedings = async (feeding) => {
        // make post request to create feedings
        await fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "Application/json",
            },
            body: JSON.stringify(feeding),
        })
        getFeedings()
    }
    const updateFeedings = async (feeding, id) => {
        await fetch(URL + id, {
            method: "PUT",
            headers: {
                "Content-Type": "Application/json",
            },
            body:JSON.stringify(feeding),
        })
   // update list of feedings
   getFeedings()
}

    const deleteFeedings = async (id) =>{
        await fetch(URL + id, {
            method:'DELETE',
        })
        getFeedings()
    }

    useEffect(() => {
        getFeedings()
    }, [])
    console.log(feedings)

    return (
        <main>
            <Routes>
                {/* <Route
                    path="/" element={<Index feedings={feedings}  />} /> */}
                {/* <Route path="/feeding/:id" element={
                <ShowFeedings
                    feedings={feedings}
                    updateFeedings={updateFeedings}
                    deleteFeedings={deleteFeedings}
                    createFeedings={createFeedings}
/>
                } *
                {/* /> */}
            </Routes>
        </main>
    )
}

export default FeedingMain