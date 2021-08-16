import React, { useEffect, useState } from "react"

const useFetch = (url = "", options = null) => {
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        const isMounted = true

        fetch(url, options)
            .then(res => res.json())
            .then((data) => {
                if(isMounted){
                    setData(data)
                    setError(null)
                }
            })
            .catch(error=>{
                if(isMounted){
                    setError(error)
                    setData(null)
                }
            })

            setLoading(true)
        return () => isMounted = false;
    }, [url])

    return { data, error, loading }
}

export default useFetch;