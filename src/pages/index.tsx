import axios from 'axios'
import { Loading } from '@/components/Loading/Loading'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.scss'
import { Hero } from '@/components/Hero/Hero'
import { useState,useEffect, KeyboardEvent, SetStateAction } from 'react'
import { useQuery } from 'react-query'
import Image from 'next/image'
import Link from 'next/link'





export default function Home() {

  const [searchInput, setsearchInput] = useState('')
  const [search, setSearch] = useState('')
  const [isLoading, setisLoading] = useState(false)

  async function getMovies() {
    const {data} = await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=332bbed1717d46c67174b3e563235770&language=en-US&page=1`);
    return data
  }

  async function searchMovies() {
    const {data} = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=332bbed1717d46c67174b3e563235770&language=en-US&page=1&query=${searchInput}`);
    return data
  }


  function clearSearch() {
    setsearchInput('');
  }

  const handleChange = (event: { target: { value: SetStateAction<string> } }) => {
    setSearch(event.target.value);
  };

  const handleKeyUp = (event: { key: string }) => {
    if (event.key === 'Enter') {
      
      setsearchInput(search);
    }

  };

  function imageLoader({ src, width, quality}: any){
    return `https://image.tmdb.org/t/p/w500/${src}?w=${width}&q=${quality || 75}`
  }

  function RenderMovies() {
    const {data, isError, isLoading} = useQuery('movies', getMovies)
    if(isLoading){
      return <Loading/>
    }
    if(isError){
      return <div>Error!</div>
  }
  if(data){
    return data.results.map((movie: any, index: number) => {
      return (
      <div key={index} className={styles.movieImg}>
        <Link href={{
          pathname: "movies/[movieid]",
          query: {movieid: movie.id},
          }}>        
          <Image  loader={imageLoader} src={movie.poster_path} alt="Movie Poster" height={400} width={400} />
          <p className={styles.review}>{movie.vote_average}</p>
          <p className={styles.overview}>{movie.overview}</p>
        </Link>

      </div>
    
    )})}
  }

  function SearchedRenderMovies() {
    const {data, isError, isLoading} = useQuery('movies', searchMovies)
    if(isLoading){
      return <Loading/>
    }
    if(isError){
      return <div>Error!</div>
  }
  if(data){
    return data.results.map((movie: any, index: number) => {
      return (
      <div key={index} className={styles.movieImg}>
        <Image  loader={imageLoader} src={movie.poster_path} alt="Movie Poster" height={400} width={400} />
        <p className={styles.review}>{movie.vote_average}</p>
        <p className={styles.overview}>{movie.overview}</p>
      </div>
    
    )})}
  }



  return (
    <>
    <div className={styles.home}>
      <Hero /> 
      <div className={`${styles.container} ${styles.search}`}>
        <input type="text" placeholder="Search" onChange={handleChange} onKeyDown={handleKeyUp}/>
        <button className='button' onClick={clearSearch}>Clear Search</button>
      </div>
      { isLoading &&
        <Loading />
      }
      <div className={`${styles.container} ${styles.movies}`}>
          <div className={styles.moviesgrid} id='movies-grid'>
            { searchInput !== '' &&
              SearchedRenderMovies()
            }
            { searchInput === '' &&
              
              RenderMovies()
            }
            </div>
          
        
      </div>
    </div>
    </>
  )
}


