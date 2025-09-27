import Image from "next/image";
import styles from "./templates.module.css";
import { Metadata } from "next";
import Link from "next/link";
import { getTemplates } from "@/functions";
import { Suspense } from "react";
import { RingLoader } from "react-spinners";

export const metadata: Metadata = {
  title: 'home page'
}

export default async function Home() {
  const templates = await getTemplates();
  console.log(templates)

  return (

    <div className={styles.templatesContianer}>
      <div className={styles.header}>
        <h1>Templates</h1>
      </div>
      <Suspense fallback={<RingLoader />}>
        <div className={styles.templates}>
          {
            templates && templates.templates.map((template: any) => {
              return <Link href={`/templates/${template._id}`} className={styles.template}>
                <div className={styles.imgContainer}>
                  <Image src={template.image} className={styles.img} fill alt="image template" />
                </div>
                <div className={styles.details}>
                  <h1 className={styles.name}>{template.type}</h1>
                  <p className={styles.desc}>{template.description}</p>
                </div>
              </Link>
            })
          }
        </div >
      </Suspense>
    </div>

  );
}
