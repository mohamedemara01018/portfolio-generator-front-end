import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from './PortfolioHero.module.css';
import { HeroData } from '@/types';
import Model from '../model/Model';

// interface PortfolioHeroProps {
//   name: string;
//   title: string;
//   bio: string;
//   avatar: string;
//   contact: {
//     email: string;
//     phone?: string;
//     linkedin?: string;
//     github?: string;
//     website?: string;
//   };
// }

export default function PortfolioHero() {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [isopenInput, setOpenInput] = useState({
    name: false,
    title: false,
    bio: false,
    avatar: false,
    contact: {
      email: false,
      phone: false,
      linkedin: false,
      github: false,
      website: false,
    },
  })
  const [heroData, setHeroData] = useState<HeroData>({
    name: "John Doe",
    title: "Full Stack Developer",
    bio: "Passionate developer with 5+ years of experience creating innovative web applications. I love turning complex problems into simple, beautiful designs.",
    avatar: "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png",
    contact: {
      email: "john.doe@example.com",
      phone: "+1 (555) 123-4567",
      linkedin: "https://linkedin.com/in/johndoe",
      github: "https://github.com/johndoe",
      website: "https://johndoe.dev"
    },
  })



  function handleChange(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) {
    const { name, value } = e.target;
    let isInFlatObject = false;
    if (heroData.hasOwnProperty(name)) {
      isInFlatObject = true;
    }
    const newHeroData: () => HeroData = () => (
      (isInFlatObject) ?
        {
          ...heroData,
          [name]: value

        } : {
          ...heroData,
          contact: {
            ...heroData.contact,
            [name]: value
          },
        })
    setHeroData(newHeroData)
  }


  useEffect(() => {
    console.log(heroData)
  }, [heroData])


  function handleOpenInput(name: string, value: boolean) {
    let isInFlatObject = false
    if (isopenInput.hasOwnProperty(name)) {
      isInFlatObject = true;
    }
    const newOpenInput = isInFlatObject ? {
      ...isopenInput,
      [name]: value
    } : {
      ...isopenInput,
      contact: {
        ...isopenInput.contact,
        [name]: value
      }
    }
    setOpenInput(newOpenInput)
  }


  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files ? e.target.files[0] : '';
    if (file) {
      const urlImage = URL.createObjectURL(file)

      setHeroData({
        ...heroData,
        avatar: urlImage
      })
    }
  }


  function hanleClickOnInputFile() {
    if (inputRef.current) {
      inputRef.current?.click()
    }
  }

  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <div className={styles.textContent}>
          <div className={styles.nameContainer}>
            {isopenInput.name ?
              <div className={styles.inputsContainer}>
                <input
                  className={`${styles.nameInput} ${styles.input}`}
                  type="text"
                  value={heroData.name}
                  name='name'
                  onChange={handleChange}
                />

                <button className={`${styles.saveBtn}`} onClick={() => handleOpenInput('name', false)}>
                  Save
                </button>

              </div>
              :
              <h1
                className={styles.name}
                onDoubleClick={() => handleOpenInput('name', true)}
              >{heroData.name}</h1>
            }
          </div>
          <div className={styles.titleContainer}>
            {
              isopenInput.title ?
                <div className={styles.inputsContainer}>
                  <input
                    className={`${styles.titleInput} ${styles.input}`}
                    type="text"
                    value={heroData.title}
                    name='title'
                    onChange={handleChange}
                  />

                  <button className={`${styles.saveBtn}`} onClick={() => handleOpenInput('title', false)}>
                    Save
                  </button>
                </div> :
                <h2
                  className={styles.title}
                  onClick={() => handleOpenInput('title', true)}
                >{heroData.title}</h2>
            }
          </div>
          <div className={styles.bioContainer}>
            {
              isopenInput.bio ?
                <div className={styles.inputsContainer}>
                  <textarea
                    className={`${styles.bioInput} ${styles.input}`}
                    value={heroData.bio}
                    name='bio'
                    onChange={handleChange}
                  />
                  <button className={`${styles.saveBtn}`} onClick={() => handleOpenInput('bio', false)}>
                    Save
                  </button>
                </div> :
                <p
                  onDoubleClick={() => handleOpenInput('bio', true)}
                  className={styles.bio}
                >{heroData.bio}</p>
            }
          </div>

          <div className={styles.socialLinks}>

            <div>
              <a
                onClick={() => handleOpenInput('linkedin', true)}
                rel="noopener noreferrer" className={styles.socialLink}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <Model value={heroData.contact.linkedin} name='linkedin' handleChange={handleChange} handleOpenInput={() => handleOpenInput('linkedin', false)} isOpen={isopenInput.contact.linkedin} />
            </div>


            <div>
              <a
                onClick={() => handleOpenInput('github', true)}
                rel="noopener noreferrer" className={styles.socialLink}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <Model value={heroData.contact.github} name='github' handleChange={handleChange} handleOpenInput={() => handleOpenInput('github', false)} isOpen={isopenInput.contact.github} />
            </div>


            <div>

              <a
                onClick={() => handleOpenInput('email', true)}
                className={styles.socialLink}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z" />
                </svg>
              </a>
              <Model value={heroData.contact.email} name='email' handleChange={handleChange} handleOpenInput={() => handleOpenInput('email', false)} isOpen={isopenInput.contact.email} />

            </div>
          </div>

          <div className={styles.cta}>
            <a href={`mailto:${heroData.contact.email}`} className={styles.primaryButton}>
              Get In Touch
            </a>
            <a href="#projects" className={styles.secondaryButton}>
              View My Work
            </a>
          </div>
        </div>

        <div className={styles.imageContent}>
          <div className={styles.avatarContainer}>
            <Image
              src={heroData.avatar}
              alt={`${heroData.name}'s profile picture`}
              width={300}
              height={300}
              className={styles.avatar}
              priority
            />
            <div className={styles.editImgContainer}>
              <button
                onClick={hanleClickOnInputFile}
                className={`${styles.btn} ${styles.changeBtn}`}>
                Change Picture
              </button>
            </div>
          </div>
          <input
            ref={inputRef}
            type="file"
            name='avatar'
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />
        </div>
      </div>
    </section >
  );
}
