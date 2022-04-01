import styles from "./styles.module.scss";
import { FaGithub } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import { signIn, signOut , useSession } from "next-auth/client";

export function SignInButton() {
    const [session] = useSession()

    return session ? (
        <button type="button" className={styles.signInButton}>
            <FaGithub color="var(--green)" />
            {session.user.name}
            <FiX color="#737380" className="closeIcon" onClick={() => signOut()}/>
        </button>
    ) : (
        <button
         type="button" 
         className={styles.signInButton}
         onClick={() => signIn('github')}
        >
            <FaGithub color="var(--yellow)" />
            Sign In With GitHub
        </button>
    );
}
