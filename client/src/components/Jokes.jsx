import React from 'react'
import { useAxios } from '../hooks/useAxios'
import axios from '../api/dadJokes'

const Jokes = () => {
    const [joke, error, loading] = useAxios({
        axiosInstance: axios,
        method: 'GET',
        url: '/',
        requestConfig: {
            headers: {
                'Content-Language': 'en-US'
            },
            // withCredentials: true,
        }
    })

  return (
    <article>
        <h2>Random Joke</h2>
        {loading && <p>Loading...</p>}
        {!loading && error && <p className='errMsg'>{error}</p>}
        {!loading && !error && joke && <p>{joke.joke}</p>}
        {!loading && !error && !joke && <p>No Dad joke to display</p>}
    </article>
  )
}

export default Jokes