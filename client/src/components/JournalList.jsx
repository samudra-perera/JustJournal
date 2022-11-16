import React, {useEffect, useState} from 'react'
import axios from 'axios'

const JournalList = () => {
  const [data, setData] = useState([])

  
  useEffect(() => {
    const getFeed = async () => {
      try {
        const res = await axios.get(process.env.REACT_APP_API_URL + '/dashboard', {
          withCredentials: true
        })
        console.log(res.data)
        setData(res.data)  
      } catch (err) {
        console.log(err)
      }
    }
    getFeed()
  }, [])
  

  return (
    <div>
      
    </div>
  )
}

export default JournalList