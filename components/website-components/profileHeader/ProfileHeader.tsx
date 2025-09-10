'use client';
import Image from 'next/image'
import styles from './profileHeader.module.css'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { appdispatch } from '@/RTK/store'
import { fetchLogoutUser, logoutUserState } from '@/RTK/slices/userSlice/logoutSlice'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

function ProfileHeader({ image }: { image: string }) {
    const router = useRouter();
    const dispatch = useDispatch<appdispatch>();
    // const logoutState = useSelector(logoutUserState);
    const [showMenu, setShowMenu] = useState(false)

    async function handleLogout() {
        let res = await dispatch(fetchLogoutUser())
        if (fetchLogoutUser.fulfilled.match(res)) {
            router.push('/')
        }
    }
    // useEffect(() => {
    //     dispatch(fetchLogoutUser())  
    // }, [])
    return (
        <div className={styles.profileHeaderContainer}>
            <div className={styles.profileImage} onClick={() => setShowMenu(!showMenu)}>
                <Image src={image} alt='profileImage' width={40} height={40} className={styles.image} />
            </div>
            {
                showMenu && <div className={styles.profileMenu}>
                    <ul className={styles.navList} onClick={() => setShowMenu(!showMenu)}>
                        <li className={styles.li}>
                            <Link className={styles.navLink} href={'/profile'}>Profile</Link>
                        </li>

                    </ul>
                    <button className={styles.logout} onClick={handleLogout}>Logout</button>
                </div>
            }
        </div>
    )
}

export default ProfileHeader