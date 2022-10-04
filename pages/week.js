import { auth } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";

import { IoIosAdd } from 'react-icons/io'

export default function Week() {

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

            <section className="lg:flex justify-center">
                <div className="shadow-bush shadow-sm py-6 px-6 mb-10 md:mr-6">
                    <h2 className="my-4 font-mono text-xl">02-Oct | Sun</h2>
                    <div className="my-4 font-mono">
                        <h4>11:00AM - 12:00PM</h4>
                        <h2 className="text-lg">Interview</h2>
                    </div>
                    <div className="my-4 font-mono">
                        <h2 className="text-lg font-medium">Stream for 4 hours</h2>
                    </div>
                    <IoIosAdd className="text-2xl my-4" />
                </div>
                <div className="shadow-bush shadow-sm py-6 px-6 mb-10 md:mr-6">
                    <h2 className="my-4 font-mono text-xl">03-Oct | Mon</h2>
                    <div className="my-4 font-mono">
                        <h4>11:00AM - 12:00PM</h4>
                        <h2 className="text-lg">Interview</h2>
                    </div>
                    <div className="my-4 font-mono">
                        <h2 className="text-lg font-medium">Stream for 4 hours</h2>
                    </div>
                    <div className="my-4 font-mono">
                        <h4>11:00AM - 12:00PM</h4>
                        <h2 className="text-lg">Interview</h2>
                    </div>
                    <div className="my-4 font-mono">
                        <h2 className="text-lg font-medium">Stream for 4 hours</h2>
                    </div>
                    <IoIosAdd className="text-2xl my-4" />
                </div>
                <div className="shadow-skeptic shadow-lg py-6 px-6 mb-10 md:mr-6">
                    <h2 className="my-4 font-mono text-xl">04-Oct | Tue</h2>
                    <div className="my-4 font-mono">
                        <h4>11:00AM - 12:00PM</h4>
                        <h2 className="text-lg">Interview</h2>
                    </div>
                    <div className="my-4 font-mono">
                        <h2 className="text-lg font-medium">Stream for 4 hours</h2>
                    </div>
                    <IoIosAdd className="text-2xl my-4" />
                </div>
                <div className="shadow-bush shadow-sm py-6 px-6 mb-10 md:mr-6">
                    <h2 className="my-4 font-mono text-xl">05-Oct | Wed</h2>
                    <div className="my-4 font-mono">
                        <h4>11:00AM - 12:00PM</h4>
                        <h2 className="text-lg">Interview</h2>
                    </div>
                    <div className="my-4 font-mono">
                        <h2 className="text-lg font-medium">Stream for 4 hours</h2>
                    </div>
                    <IoIosAdd className="text-2xl my-4" />
                </div>
                <div className="shadow-bush shadow-sm py-6 px-6 mb-10 md:mr-6">
                    <h2 className="my-4 font-mono text-xl">06-Oct | Thur</h2>
                    <div className="my-4 font-mono">
                        <h4>11:00AM - 12:00PM</h4>
                        <h2 className="text-lg">Interview</h2>
                    </div>
                    <div className="my-4 font-mono">
                        <h2 className="text-lg font-medium">Stream for 4 hours</h2>
                    </div>
                    <IoIosAdd className="text-2xl my-4" />
                </div>
                <div className="shadow-bush shadow-sm py-6 px-6 mb-10 md:mr-6">
                    <h2 className="my-4 font-mono text-xl">07-Oct | Fri</h2>
                    <div className="my-4 font-mono">
                        <h4>11:00AM - 12:00PM</h4>
                        <h2 className="text-lg">Interview</h2>
                    </div>
                    <div className="my-4 font-mono">
                        <h2 className="text-lg font-medium">Stream for 4 hours</h2>
                    </div>
                    <IoIosAdd className="text-2xl my-4" />
                </div>
                <div className="shadow-bush shadow-sm py-6 px-6 mb-10 md:mr-6">
                    <h2 className="my-4 font-mono text-xl">08-Oct | Sat</h2>
                    <div className="my-4 font-mono">
                        <h4>11:00AM - 12:00PM</h4>
                        <h2 className="text-lg">Interview</h2>
                    </div>
                    <div className="my-4 font-mono">
                        <h2 className="text-lg font-medium">Stream for 4 hours</h2>
                    </div>
                    <IoIosAdd className="text-2xl my-4" />
                </div>
            </section>

            <div className="lg:flex">
                <section className="md:mx-8 py-2 mb-10">

                    <h2 className="text-2xl font-mono font-medium mb-2">Habits</h2>
                    <div className="my-6">
                        <h2 className="text-lg font-mono mb-3">Workout</h2>
                        <div className="flex gap-4">
                            <div className="h-6 w-6 bg-pink" />
                            <div className="h-6 w-6 bg-pink" />
                            <div className="h-6 w-6 bg-qgray" />
                            <div className="h-6 w-6 bg-pink" />
                            <div className="h-6 w-6 bg-qgray" />
                            <div className="h-6 w-6 bg-qgray" />
                            <div className="h-6 w-6 bg-qgray" />
                        </div>
                    </div>
                    <div className="my-6">
                        <h2 className="text-lg font-mono mb-3">Meditation</h2>
                        <div className="flex gap-4">
                            <div className="h-6 w-6 bg-qgray" />
                            <div className="h-6 w-6 bg-pink" />
                            <div className="h-6 w-6 bg-qgray" />
                            <div className="h-6 w-6 bg-pink" />
                            <div className="h-6 w-6 bg-qgray" />
                            <div className="h-6 w-6 bg-qgray" />
                            <div className="h-6 w-6 bg-qgray" />
                        </div>
                    </div>
                    <div className="my-6">
                        <h2 className="text-lg font-mono mb-3">Journal</h2>
                        <div className="flex gap-4">
                            <div className="h-6 w-6 bg-pink" />
                            <div className="h-6 w-6 bg-pink" />
                            <div className="h-6 w-6 bg-pink" />
                            <div className="h-6 w-6 bg-pink" />
                            <div className="h-6 w-6 bg-qgray" />
                            <div className="h-6 w-6 bg-qgray" />
                            <div className="h-6 w-6 bg-qgray" />
                        </div>
                    </div>

                </section>

                <section className="py-2 mb-12 lg:ml-24">

                    <h2 className="text-2xl font-mono font-medium mb-2">Weekly Goals</h2>
                    <div className="lg:grid lg:grid-cols-4">
                        <div className="shadow-sm shadow-qgray p-6 mr-6 my-6">
                            <h2 className="text-lg font-mono font-medium">Debasis Speech analysis on stream</h2>
                        </div>
                        <div className="shadow-sm shadow-qgray p-6 mr-6 my-6">
                            <h2 className="text-lg font-mono font-medium">Debasis Speech analysis on stream</h2>
                        </div>
                        <div className="shadow-sm shadow-qgray p-6 mr-6 my-6">
                            <h2 className="text-lg font-mono font-medium">Debasis Speech analysis on stream</h2>
                        </div>
                        <div className="shadow-sm shadow-qgray p-6 mr-6 my-6">
                            <h2 className="text-lg font-mono font-medium">Debasis Speech analysis on stream</h2>
                        </div>
                        <div className="shadow-sm shadow-qgray p-6 mr-6 my-6">
                            <h2 className="text-lg font-mono font-medium">Debasis Speech analysis on stream</h2>
                        </div>
                        <div className="shadow-sm shadow-qgray p-6 mr-6 my-6">
                            <IoIosAdd className="text-2xl my-4 mx-auto" />
                        </div>
                    </div>

                </section>
            </div>

        </div>
    )
}