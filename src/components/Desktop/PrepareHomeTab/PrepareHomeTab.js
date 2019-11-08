import React, { useState, useEffect } from "react";

const PrepareHomeTab = () => {
  const [statea, setStatea] = useState([]);

  useEffect(() => {
    // const result = axios({
    //   method: 'post',
    //   url: "/api/cat",
    //   // data
    // });
    // return result;
    fetch("/prepare")
      .then(response => {
        if (!response.ok) {
          throw new Error (response.statusText)
        }
        return response
      })
      .then(response => response.json())
      .then(data => setStatea(data))
  },[])
  return (
    <p>PrepareHomeTabPrepareHomeTabPrepareHomeTab</p>
  )
}

export default PrepareHomeTab;