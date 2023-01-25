import axios from 'axios'
import { Loading } from '@/components/Loading/Loading'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { Hero } from '@/components/Hero/Hero'
import { useState,useEffect } from 'react'


const inter = Inter({ subsets: ['latin'] })



export default function Home() {

  const [movies, setmovies] = useState<any>([])

  async function getMovies() {
    const data = axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=332bbed1717d46c67174b3e563235770&language=en-US&page=1`);
    const result = await data;
    result.data.resultrs.forEach((movie: any) => {
      movies.push(movie);
    });
  }



  return (
    <>
    <div className="home">
      <Hero /> 
    </div>
    </>
  )
}
