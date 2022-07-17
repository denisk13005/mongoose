import { useEffect, useState } from "react";
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export const getServerSideProps = async () => {
  const restaurants = await fetch("/api/list").then(res => res.json() )
  console.log(restaurants);
  return {
    props:{
      restaurants 
    }
  }
}

export default function Home({restaurants}) {

    // const [restaurants, setRestaurants] = useState([]);

    // useEffect(() => {
    //     (async () => {
    //         const results = await fetch("/api/list").then(response => response.json());
    //         setRestaurants(results);
    //     })();
    // }, []);

    return (
        <div className={styles.container}>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>
                    MongoDB with <a href="https://nextjs.org">Next.js!</a> Example
                </h1>
                <br />
                <div className={styles.grid}>
                    {restaurants.map(restaurant => (
                        <div className={styles.card} key={restaurant._id}>
                            <h2>{restaurant.name}</h2>
                            <p>{restaurant.address.street}</p>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    )
}