import { useEffect, useState } from "react"
import { Routes, Route } from "react-router-dom"
import Index from "../pages/Index"
import Show from "../pages/Show"




function Main(props) {
    const [babies, setBabies] = useState(null)
    const URL = "https://mern-mobile-backend.herokuapp.com/babies"

    const getBabies = async () => {
        const response = await fetch(URL)
        const data = await response.json()
        setBabies(data)
    }

    const createBabies = async (baby) => {
        // make post request to create babies
        await fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "Application/json",
            },
            body: JSON.stringify(baby),
        })
        getBabies()
    }
    const updateBabies = async (baby, id) => {
        await fetch(URL + id, {
            method: "PUT",
            headers: {
                "Content-Type": "Application/json",
            },
            body:JSON.stringify(baby),
        })
   // update list of babies
   getBabies()
}

    const deleteBabies = async (id) =>{
        await fetch(URL + id, {
            method:'DELETE',
        })
        getBabies()
    }

    useEffect(() => {
        getBabies()
    }, [])

    return (
        <main>
            <Routes>
                <Route
                    path="/" element={<Index babies={babies} createBabies={createBabies} />} />
                <Route path="/babies/:id"  element={
                <Show
                    babies={babies}
                    updateBabies={updateBabies}
                    deleteBabies={deleteBabies}
/>
                }
                />
            </Routes>
        </main>
    )
}

export default Main