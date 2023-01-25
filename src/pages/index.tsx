import axios from 'axios'
import { Loading } from '@/components/Loading/Loading'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { Hero } from '@/components/Hero/Hero'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
    <div className="home">
      <Hero /> 
    </div>
    </>
  )
}
