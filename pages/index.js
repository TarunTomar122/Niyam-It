import Head from 'next/head'
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";

export default function Home() {

  const [user, loading] = useAuthState(auth);

  return (
    <div>
      <Head>
        <title>NiyamIt</title>
        <meta name="description" content="Life Manager" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="mt-10">
        {(!user && !loading) && (<h2 className="text-2xl font-mono">Niyamit helps you manage your entire life with just one application!</h2>)}
        {user && (
          <div>
            <h2 className="text-2xl font-mono">This is the homepage of the application for a signed user!</h2>
          </div>
        )}
      </main>
    </div>
  )
}
