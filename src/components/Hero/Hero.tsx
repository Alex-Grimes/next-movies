import React from 'react'
import Image from 'next/image'
import "../Hero/Hero.scss"

export const Hero = () => {
  return (
    <div className="hero">
    <Image src="../assets/imgs/movieHero.jpg" alt="An Image showing popcorn" />
    <div className="text-container">
        <div className="text">
            <span className="mini-heading">Now Playing</span>
            <h1><span>Now</span> Playing</h1>
            <a href="#movie-grid" className="button">View Movies</a>
        </div>
    </div>
</div>
  )
}
