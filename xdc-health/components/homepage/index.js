import React from 'react'
import styles from "./Homepage.module.scss"
import { useWeb3 } from "@3rdweb/hooks"


const Homepage = () => {
  return (
    <div className={styles.homepage}>
   
    <div className={styles.Top_container}>
    <img className={styles.topbar} src="./assets/TopBar.png"></img>
    <div className={styles.header}>
    <img className={styles.headerbar} src="./assets/Headerbar.png"></img>
    <div className={styles.title}>
        <img className={styles.heart} src="./assets/heart.png"></img>
        <div className={styles.head}>
          <h1>XDC-Health</h1> <p>PRIVACY & SECURITY </p>
        </div>
    </div>
    </div>
    </div>

    <div className={styles.started}>
    <div className={styles.getstarted}>GET STARTED
    </div>
    Continue as
    </div>

    <div className={styles.slide}>
    <div className={styles.slide1}>
    <img className={styles.person} src="./assets/doctor.png"></img>
    <div className={styles.person}>Doctor</div>

    </div>

    <div className={styles.slide1}>
    <img className={styles.person} src="./assets/patient.png"></img>
    <div className={styles.person}>Patient</div>
    </div>

    <div className={styles.slide1}>
    <img className={styles.person} src="./assets/admin.png"></img>

    <div className={styles.person}>Admin</div>
    </div>
    
    </div>

  
</div>
  
  );
}

export default Homepage