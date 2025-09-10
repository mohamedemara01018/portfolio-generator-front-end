import Image from "next/image";
import styles from "./templates.module.css";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: 'home page'
}

export default function Home() {
  return (

    <div className={styles.templatesContianer}>
      <div className={styles.header}>
        <h1>Templates</h1>
      </div>
      <div className={styles.templates}>
        <Link href={'/templates/1'} className={styles.template}>
          <div className={styles.imgContainer}>
            <Image src={'https://images.pexels.com/photos/31735711/pexels-photo-31735711.jpeg'} className={styles.img} fill alt="image template" />
          </div>
          <div className={styles.details}>
            <h1 className={styles.name}>classic</h1>
            <p className={styles.desc}>Ea non, esse commodi dolore architecto rem numquam aut placeat? Assumenda, iure.</p>
          </div>
        </Link>

        <Link href={'/templates/1'} className={styles.template}>
          <div className={styles.imgContainer}>
            <Image src={'https://images.pexels.com/photos/31735711/pexels-photo-31735711.jpeg'} className={styles.img} fill alt="image template" />
          </div>
          <div className={styles.details}>
            <h1 className={styles.name}>classic</h1>
            <p className={styles.desc}>Ea non, esse commodi dolore architecto rem numquam aut placeat? Assumenda, iure.</p>
          </div>
        </Link>


        <Link href={'/templates/1'} className={styles.template}>
          <div className={styles.imgContainer}>
            <Image src={'https://images.pexels.com/photos/31735711/pexels-photo-31735711.jpeg'} className={styles.img} fill alt="image template" />
          </div>
          <div className={styles.details}>
            <h1 className={styles.name}>classic</h1>
            <p className={styles.desc}>Ea non, esse commodi dolore architecto rem numquam aut placeat? Assumenda, iure.</p>
          </div>
        </Link>


        <Link href={'/templates/1'} className={styles.template}>
          <div className={styles.imgContainer}>
            <Image src={'https://images.pexels.com/photos/31735711/pexels-photo-31735711.jpeg'} className={styles.img} fill alt="image template" />
          </div>
          <div className={styles.details}>
            <h1 className={styles.name}>classic</h1>
            <p className={styles.desc}>Ea non, esse commodi dolore architecto rem numquam aut placeat? Assumenda, iure.</p>
          </div>
        </Link>


        <Link href={'/templates/1'} className={styles.template}>
          <div className={styles.imgContainer}>
            <Image src={'https://images.pexels.com/photos/31735711/pexels-photo-31735711.jpeg'} className={styles.img} fill alt="image template" />
          </div>
          <div className={styles.details}>
            <h1 className={styles.name}>classic</h1>
            <p className={styles.desc}>Ea non, esse commodi dolore architecto rem numquam aut placeat? Assumenda, iure.</p>
          </div>
        </Link>


        <Link href={'/templates/1'} className={styles.template}>
          <div className={styles.imgContainer}>
            <Image src={'https://images.pexels.com/photos/31735711/pexels-photo-31735711.jpeg'} className={styles.img} fill alt="image template" />
          </div>
          <div className={styles.details}>
            <h1 className={styles.name}>classic</h1>
            <p className={styles.desc}>Ea non, esse commodi dolore architecto rem numquam aut placeat? Assumenda, iure.</p>
          </div>
        </Link>

        <Link href={'/templates/1'} className={styles.template}>
          <div className={styles.imgContainer}>
            <Image src={'https://images.pexels.com/photos/31735711/pexels-photo-31735711.jpeg'} className={styles.img} fill alt="image template" />
          </div>
          <div className={styles.details}>
            <h1 className={styles.name}>classic</h1>
            <p className={styles.desc}>Ea non, esse commodi dolore architecto rem numquam aut placeat? Assumenda, iure.</p>
          </div>
        </Link>

      </div >
    </div>

  );
}
