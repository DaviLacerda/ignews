import Head from "next/head";
import { GetStaticProps } from "next";
import SubscribeButton from "../components/SubscribeButton";
import styles from '../styles/home.module.scss'
import { stripe } from "../services/stripe";

const COUNTDOWN_DAY_IN_SECONDS = 60 * 60 * 24;

interface HomeProps{
    product: {
        priceId: string,
        amount: string,
    };
}

export default function Home({ product }: HomeProps) {
    return (
        <>
            <Head>
                <title>Home | ig.news</title>
            </Head>
            <div className={styles.contentContainer}>
                <section className={styles.hero}>
                    <span>👏 Hey, welcome</span>
                    <h1>News about the <span>React</span> World</h1>
                    <p>Get acess to all the publications <br />
                     <span>for {product.amount} month</span>
                    </p>
                    <SubscribeButton />
                </section>
                <img src="/images/avatar.svg" alt="Girl coding" />
            </div>
        </>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    const price = await stripe.prices.retrieve('price_1KZHfgBVOXi7Rbr7yN6c4Joy')

    const product = {
        priceId: price.id,
        amount: new Intl.NumberFormat('en-US', {
            style:'currency',
            currency:'USD'
        }).format((price.unit_amount / 100)),
    }

    return {
        props:{
            product,
        },
        revalidate:COUNTDOWN_DAY_IN_SECONDS
    }
}