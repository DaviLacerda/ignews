import { useSession, signIn } from 'next-auth/client'
import { useRouter } from 'next/router'
import { api } from '../../services/api'
import { getStripeJs } from '../../services/stripe-js'
import styles from './styles.module.scss'

function SubscribeButton(){
    const [session] = useSession()
    const router = useRouter()

    const handleSubscribe = async () => {
        if(!session){
            signIn('github')
            return
        }

        if(session.activeSubscription){
            router.push('/posts')
            return
        }

        try {
            const response = await api.post('/subscribe')

            const { sessionId } = response.data

            const stripe = await getStripeJs()

            await stripe.redirectToCheckout({ sessionId })
        } catch (error) {
            alert(error.message)
        }
    }

    return (
        <button
         type='button'
         className={styles.subscribeButton}
         onClick={handleSubscribe}
        >
            Subscribe Now
        </button>
    )
}

export default SubscribeButton