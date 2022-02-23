import React, { useEffect } from 'react'

export default function TryKey() {
    useEffect(()=>{
        fetch("", {
            "method" : "POST",
            "headers" : {
                "x-rapidapi-host": "apikey",
                "content-type":"application/json",
                "accept":"application/json"
            },
           "body": JSON.stringify({
                    name: this.val,
                    note: this.note
                })            
        })
        .then(response => response.json())
        .then(response => {
            console.log(response)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    }
    return (
        <div>
            
        </div>
    )
}
