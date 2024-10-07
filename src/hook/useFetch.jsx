import React, { useEffect, useState } from 'react'

const useFetch =  (path) =>  {
    const [data,  setData] = useState([])
    useEffect(() => {
        async function getRequest(){
            const response = await fetch(`http://localhost:3000${path}`)
            const result = await response.json()
            setData(result)
        }
        getRequest()
}, [])
return data
}

export default useFetch
