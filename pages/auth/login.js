import { FcGoogle } from 'react-icons/fc';
import { signInWithPopup, GoogleAuthProvider, updateProfile } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Login() {

    const route = useRouter();
    const [user, loading] = useAuthState(auth);

    const googleProvider = new GoogleAuthProvider();
    const GoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            route.push("/dashboard");
        } catch (e) {
            console.log("Error signing", e);
        }
    }

    useEffect(() => {
        if (user) {
            route.push("/dashboard");
        } else {
            console.log("login");
        }
    }, [user]);

    return (
        <div className="flex flex-col items-center mt-32 p-12 drop-shadow-lg bg-white rounded-lg text-gray-700 md:max-w-xl md:px-32 mx-auto">
            <h2 className="text-3xl font-medium">Welcome to Niyam</h2>
            <div className="pt-8 flex flex-col">
                <button
                    onClick={GoogleLogin}
                    className="text-white bg-gray-700 p-4 w-full font-medium rounded-lg flex align-middle gap-2">
                    <FcGoogle className="text-2xl" />Sign in with Google
                </button>
            </div>
        </div>
    )
}