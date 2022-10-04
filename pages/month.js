import { auth } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import { IoIosAdd } from 'react-icons/io'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
export default function Month() {


    const [user, loading] = useAuthState(auth);
    const route = useRouter();

    const [goals, setGoals] = useState([
        {
            id: uuidv4(),
            body: 'Increase weight',
            done: false,
            date: new Date()
        },
        {
            id: uuidv4(),
            body: 'Workout for atleast 15 days',
            done: true,
            date: new Date()
        },
        {
            id: uuidv4(),
            body: 'Get an internship',
            done: false,
            date: new Date()
        }
    ])
    const [gInputV, setGInputV] = useState(false);

    const [events, setEvents] = useState([
        {
            id: uuidv4(),
            date: new Date(),
            body: 'City Trip'
        }
    ]);
    const [eDate, setEDate] = useState(new Date());
    const [eInputV, setEInputV] = useState(false);

    const [habits, setHabits] = useState([
        {
            title: 'Workout',
            tracker: Array.from({ length: 31 }, (x, i) => [0, 1][Math.floor(Math.random() * 2)])
        },
        {
            title: 'Meditation',
            tracker: Array.from({ length: 31 }, (x, i) => [0, 1][Math.floor(Math.random() * 2)])
        },
        {
            title: 'Running',
            tracker: Array.from({ length: 31 }, (x, i) => [0, 1][Math.floor(Math.random() * 2)])
        }
    ])

    const [inputText, setInputText] = useState('');

    if (loading) {
        return <h2>Loading...</h2>
    }

    if (!user) {
        route.push("/auth/login");
        return;
    }

    return (
        <div className="my-12 w-full lg:flex lg:flex-row lg:gap-12">

            <section className="xl:w-1/3">
                <section className="shadow-lg shadow-pink px-10 py-4 mb-12 md:mr-8">
                    <h2 className="text-xl font-mono mt-4 mb-6 font-bold">Goals</h2>
                    {goals.map((goal, index) => {
                        return (
                            <div className="my-3 font-mono" onContextMenu={(e) => {
                                e.preventDefault();

                                setGoals([...goals.map((t, id) => {
                                    if (t.id != goal.id) return t;
                                    else {
                                        goal.done = !goal.done;
                                        return goal;
                                    }
                                })])
                            }}>
                                <h2 className={classNames(
                                    goal.done ? 'line-through' : '',
                                    'text-lg cursor-default'
                                )} >{goal.body}</h2>
                            </div>
                        )
                    })}

                    {gInputV && (<input
                        className="w-full h-8 bg-qgray px-3 font-mono text-lg"
                        value={inputText}
                        type="text"
                        onChange={(e) => {
                            setInputText(e.target.value)
                        }}
                        placeholder="ex. increase weight"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                if (inputText.length > 0) {
                                    var nTodo = {
                                        id: uuidv4(),
                                        date: new Date(),
                                        body: inputText,
                                        done: false
                                    }
                                    var pr = goals;
                                    pr.push(nTodo);
                                    setGoals(pr);
                                    setInputText('');
                                    setGInputV(false);
                                }
                            }
                        }}
                    />)}
                    <IoIosAdd className="text-2xl my-4" onClick={() => {
                        setGInputV(!gInputV)
                        setEInputV(false);
                    }} />
                </section>

                <section className="shadow-lg shadow-pink px-10 py-4 mb-12 md:mr-8">
                    <h2 className="text-xl font-mono mt-4 mb-6 font-bold">Events</h2>
                    {events.map((event, index) => {
                        return (
                            <div className="my-4 font-mono">
                                <h2 className="text-lg mb-2">{event.date.toDateString()} | <span className="text-gray-600">{event.date.toTimeString().slice(0, 5)}</span></h2>
                                <h2 className="text-xl">{event.body}</h2>
                            </div>
                        )
                    })}
                    {eInputV && (
                        <div>
                            <input
                                className="w-full h-8 bg-qgray px-3 font-mono text-lg"
                                value={inputText}
                                type="text"
                                onChange={(e) => {
                                    setInputText(e.target.value)
                                }}
                                placeholder="ex. city trip"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        if (inputText.length > 0) {
                                            var nEvent = {
                                                id: uuidv4(),
                                                date: new Date(),
                                                body: inputText,
                                            }
                                            var pr = events;
                                            pr.push(nEvent);
                                            setEvents(pr);
                                            setInputText('');
                                            setEInputV(false);
                                        }
                                    }
                                }}
                            />
                            <div className="3xl:flex 3xl:gap-8 mt-4">
                                <div className="flex gap-4 font-mono">
                                    <h2 className="mt-1">Date: </h2>
                                    <input type="date" className="h-8 bg-qgray px-3 font-mono text-lg mb-4" onChange={(e) => {
                                        setEDate(new Date(e.target.value))
                                    }} />
                                </div>
                                <div className="flex gap-4 font-mono">
                                    <h2 className="mt-1">Time: </h2>
                                    <input type="time" className="h-8 bg-qgray px-3 font-mono text-lg mb-4" onChange={(e) => {
                                        setEDate(new Date(eDate.toDateString() + ' ' + e.target.value))
                                    }} />
                                </div>
                                <div className="cursor-default" onClick={() => {
                                    if (inputText.length > 0 && eDate) {
                                        var nSchedule = {
                                            id: uuidv4(),
                                            date: eDate,
                                            body: inputText
                                        }
                                        var pr = events;
                                        pr.push(nSchedule);
                                        setEvents(pr);
                                        setInputText('');
                                        setEInputV(false);
                                    }
                                }}>
                                    <p className="text-center bg-bush px-3 py-1 font-mono">Add</p>
                                </div>
                            </div>
                        </div>)}
                    <IoIosAdd className="text-2xl my-4" onClick={() => {
                        setEInputV(!gInputV)
                        setGInputV(false);
                    }} />
                </section>
            </section>

            <section className="hidden xl:flex xl:flex-col xl:w-1/2">
                <h2 className="text-xl font-mono mt-4 mb-6 font-bold">Habit Tracker</h2>

                <div className="flex items-center mb-6">
                    <h2 className="text-xl font-mono w-8 invisible">Dates</h2>
                    <div className="flex gap-2 overflow-wrap ml-24">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31].map((value, index) => {
                            return (
                                <div className="h-6 w-6" >{value}</div>
                            )
                        })}
                    </div>
                </div>

                {habits.map((habit, index) => {
                    return (
                        <div className="flex items-center mb-6">
                            <h2 className="text-xl font-mono w-8">{habit.title}</h2>
                            <div className="flex gap-2 overflow-wrap ml-24">
                                {habit.tracker.map((value, index) => {
                                    return (
                                        <>
                                            {value == 1 && (
                                                <div className="h-6 w-6 bg-pink" />
                                            )}
                                            {value == 0 && (
                                                <div className="h-6 w-6 bg-qgray" />
                                            )}
                                        </>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
            </section>
        </div>
    )
}