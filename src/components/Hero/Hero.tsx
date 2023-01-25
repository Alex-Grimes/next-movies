import React from 'react'
import Image from 'next/image'
import hero from '../../assets/imgs/movieHero.jpg'
import styles from '@/styles/Hero.module.scss'


export const Hero = () => {
  return (
    <div className={styles.hero}>
    <Image src= {hero} alt="An Image showing popcorn"/>
    <div className={styles.textcontainer}>
        <div className={styles.text}>
            <span className={styles.miniheading}>Now Playing</span>
            <h1><span>Now</span> Playing</h1>
            <a href="#movie-grid" className={styles.button}>View Movies</a>
        </div>
    </div>
</div>
  )
}
