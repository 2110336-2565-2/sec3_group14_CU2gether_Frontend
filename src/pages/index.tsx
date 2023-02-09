import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
//import styles from '@/styles/Home.module.css'
import Menubar from '@/components/Menubar'
import Content from '@/components/Content'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <div className={inter.className}  style={{backgroundImage: `url(background_page.png)` ,
        backgroundSize: 'cover',
        backgroundPosition: `center center`,
        backgroundRepeat: `no-repeat`,
        backgroundAttachment: `fixed`
        // height: `3876px`
      }}>
        <Menubar/>
        <Content/>
      </div>
    </>
  )
}
