import axios from 'axios'
import { Loading } from '@/components/Loading/Loading'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.scss'
import { Hero } from '@/components/Hero/Hero'
import { useState,useEffect, KeyboardEvent, SetStateAction } from 'react'


const inter = Inter({ subsets: ['latin'] })



export default function Home() {

  let movies: any[] = [];
  let searchedMovies: [];
  const [searchInput, setsearchInput] = useState('')
  const [search, setSearch] = useState('')
  const [isLoading, setisLoading] = useState(false)

  async function getMovies() {
    setisLoading(true)
    const data = axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=332bbed1717d46c67174b3e563235770&language=en-US&page=1`);
    const result = await data;
    if(result){
      setisLoading(false);
    }
    result.data.results.forEach((movie: any) => {
      movies.push(movie);
    });
  }

  async function searchMovies() {
    setisLoading(true);
    const data = axios.get(`https://api.themoviedb.org/3/search/movie?api_key=332bbed1717d46c67174b3e563235770&language=en-US&page=1&query=${searchInput}`);
    const result = await data;
    if(result){
      setisLoading(false);
    }
    result.data.results.forEach((movie: any) => {
      searchedMovies.push(movie);
    })
  }

  function clearSearch() {
    setsearchInput('');
    searchedMovies = [];
  }

  const handleChange = (event: { target: { value: SetStateAction<string> } }) => {
    setSearch(event.target.value);
  };

  const handleKeyUp = (event: { key: string }) => {
    if (event.key === 'Enter') {
      
      setsearchInput(search);
    }

  };

  useEffect(() => {
    return () => {
      getMovies();

    };
  }, [])


  const renderMovies = (movies:any) => {
    return movies.map((movie:any, index:number) => {
      {console.log(movie)}
      <div className={styles.movieImg}>
      <img src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`" alt="Movie Poster" />
      <p key={index} className={styles.review}>{movie.vote_average}</p>
      <p key={index} className={styles.overview}>{movie.overview}</p>
    </div>
    })
  }



  return (
    <>
    <div className={styles.home}>
      <Hero /> 
      <div className={`${styles.container} ${styles.search}`}>
        <input type="text" placeholder="Search" onChange={handleChange} onKeyUp={handleKeyUp}/>
        <button className='button' onClick={clearSearch}>Clear Search</button>
      </div>
      { isLoading &&
        <Loading />
      }
      <div className={`${styles.container} ${styles.movies}`}>
          <div className={styles.moviesgrid} id='movies-grid'>
              {renderMovies(movies)}
            </div>
          
        
      </div>
    </div>
    </>
  )
}
