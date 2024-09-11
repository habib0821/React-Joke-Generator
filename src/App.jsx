import axios from 'axios'
import React, { useEffect, useState } from 'react'

const App = () => {

  const [joke, setjoke] = useState('')
  const [loading, setloading] = useState(false)


  const fetchJoke = async () => {
    setloading(true);
    try {
      const response = await axios.get('https://v2.jokeapi.dev/joke/Any');
      const jokeData = response.data;
      if (jokeData.type === 'single') {
        setjoke(jokeData.joke)
      } else {
        setjoke(`${jokeData.setup}-${jokeData.delivery}`);
      }
    }
    catch (error) {
      setjoke("Something went wrong: ", error)
    }
    setloading(false)
  };

  useEffect(() => {
    fetchJoke();
  }, []);



  return (
    <div className='bg-[#251605] h-screen gap-5 w-full flex flex-col justify-center items-center'>
      <h1 className='text-5xl text-[#E2C391] font-bold '>Random Joke Generator</h1>
      {loading ? (
        <p className='text-2xl px-3 py-2 w-[70%] rounded-lg bg-[#9BBEC7] text-[#251605] font-semibold'>Loading...</p>
      ) : (
        <p className='text-2xl px-3 py-2 w-[70%] rounded-lg bg-[#9BBEC7] text-[#251605] font-semibold'>{joke}</p>
      )
    }
    <button className='bg-[#9BBEC7] font-bold px-3 py-2 rounded-lg text-black text-xl' onClick={fetchJoke}>Get a joke</button>

    </div>
  )
}

export default App
