import { auth } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router"

export default function Dashboard() {

    const [user, loading] = useAuthState(auth);
    const route = useRouter();

    if (loading) {
        return <h2>Loading...</h2>
    }

    if (!user) {
        route.push("/auth/login");
        return;
    }

    return (
        <div className="mt-10">
            <h1 className="text-3xl">Welcome to your Dashboard {user.displayName}</h1>
            <button onClick={() => auth.signOut()} className="p-3 bg-teal-600 text-white text-lg rounded-lg my-8">Sign out</button>
        </div>
    )
}