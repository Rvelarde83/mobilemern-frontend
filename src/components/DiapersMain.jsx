import { useEffect, useState } from "react"
import { Routes, Route } from "react-router-dom"
// import Index from "../pages/Index"
import Show from "../pages/Show"




function DiapersMain(props) {
    const [diapers, setDiapers] = useState(null)
    const URL = "http://localhost:3001/diapers/"

    const getDiapers
     = async () => {
        const response = await fetch(URL)
        const data = await response.json()
        setDiapers(data)
    }

    const createDiapers = async (diaper) => {
        // make post request to create diapers
        await fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "Application/json",
            },
            body: JSON.stringify(diaper),
        })
        getDiapers
        ()
    }
    const updateDiapers = async (diaper, id) => {
        await fetch(URL + id, {
            method: "PUT",
            headers: {
                "Content-Type": "Application/json",
            },
            body:JSON.stringify(diaper),
        })
   // update list of diapers
   getDiapers
   ()
}

    const deleteDiapers = async (id) =>{
        await fetch(URL + id, {
            method:'DELETE',
        })
        getDiapers
        ()
    }

    useEffect(() => {
        getDiapers
        ()
    }, [])

    return (
        <main>
            <Routes>
                {/* <Route
                    path="/" element={<Index diapers={diapers}  />} /> */}
                <Route path="/diapers/:id" element={
                <Show
                    diapers={diapers}
                    updateDiapers={updateDiapers}
                    deleteDiapers={deleteDiapers}
                    createDiapers={createDiapers}
/>
                }
                />
            </Routes>
        </main>
    )
}

export default DiapersMain