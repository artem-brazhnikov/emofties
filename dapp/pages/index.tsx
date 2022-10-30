import Head from "next/head"
import EmotionsCardsBlock from "../components/EmotionsCardsBlock"
// import { Web3ModalProfile } from "../components/Web3ModalProfile"
import { RainbowProfile } from "../components/RainbowProfile"
import styles from "../styles/Home.module.css"

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Emofties</title>
                <meta name="Emofties Protocol" content="Emofties Protocol" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {/* <Web3ModalProfile /> */}
            <RainbowProfile />
            <EmotionsCardsBlock />
        </div>
    )
}
