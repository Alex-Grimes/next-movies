import React from 'react'
import axios from 'axios';
import { useRouter } from 'next/router'
import { Loading } from '@/components/Loading/Loading';
import Link from 'next/link';
import { useQuery } from 'react-query';
import styles from '@/styles/Home.module.scss'
import Image from 'next/image';

const Movieid = () => {

  const router = useRouter()
  const { movieid } = router.query

  
  async function getSingleMovie() {
    const {data} = await axios.get(`https://api.themoviedb.org/3/movie/${movieid}?api_key=332bbed1717d46c67174b3e563235770&language=en-US&page=1`);
    return data
  }

  function imageLoader({ src, width, quality}: any){
    return `https://image.tmdb.org/t/p/w500/${src}?w=${width}&q=${quality || 75}`
  }

  function RenderMovies() {
    const {data, isError, isLoading} = useQuery('movies', getSingleMovie)
    if(isLoading){
      return <Loading/>
    }
    if(isError){
      return <div>Error!</div>
  }
  if(data){
      return (
      <div className={styles.movieimg}>       
          <Image className={styles.imageWrapper} loader={imageLoader} src={data.poster_path} alt="Movie Poster" width={800} height={800}/>
          <p className={styles.review}>{data.vote_average}</p>
          <p className={styles.overview}>{data.overview}</p>
      </div>

/* <div class="movie-info">
  <div class="movie-img">
    <img
      :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"
      alt=""
    />
  </div>
  <div class="movie-content">
    <h1>Title: {{ movie.title }}</h1>
    <p class="movie-fact tagline">
      <span>Tagline:</span> "{{ movie.tagline }}"
    </p>
    <p class="movie-fact">
      <span>Released:</span>
      {{
        new Date(movie.release_date).toLocaleString('en-us', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        })
      }}
    </p>
    <p class="movie-fact">
      <span>Duration:</span> {{ movie.runtime }} minutes
    </p>
    <p class="movie-fact">
      <span>Revenue:</span>
      {{
        movie.revenue.toLocaleString('en-us', {
          style: 'currency',
          currency: 'USD',
        })
      }}
    </p>
    <p class="movie-fact"><span>Overview:</span> {{ movie.overview }}</p>
  </div>
</div>
</div> */
    
    )}}
  

  return (
    <div className={`${styles.container} ${styles.singlemovie}`}>
      {RenderMovies()}
      <Link className={styles.button} href={'/'}>Back</Link>
      </div>
  )
}

export default Movieid
