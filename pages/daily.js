import { auth } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import { IoIosAdd } from 'react-icons/io'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

var today = new Date();

export default function Daily() {

    const [user, loading] = useAuthState(auth);
    const route = useRouter();

    const [priorities, setPriorities] = useState([
        {
            id: uuidv4(),
            body: 'Meditation',
            date: new Date()
        },
        {
            id: uuidv4(),
            body: 'Workout',
            date: new Date()
        },
        {
            id: uuidv4(),
            body: 'Stream',
            date: new Date()
        }
    ]);
    const [pInputV, setPInputV] = useState(false);

    const [todos, setTodos] = useState([
        {
            id: uuidv4(),
            body: 'Stream for 4 hours',
            done: false,
            date: new Date()
        },
        {
            id: uuidv4(),
            body: 'Talk to harsh',
            done: true,
            date: new Date()
        },
        {
            id: uuidv4(),
            body: 'Cognitive Assignment',
            done: false,
            date: new Date()
        }
    ])
    const [tInputV, setTInputV] = useState(false);

    const [schedules, setSchedules] = useState([
        {
            id: uuidv4(),
            from: new Date(),
            to: new Date(today.toDateString() + ' ' + '23:00'),
            body: 'Interview',
        }
    ])
    const [sInputV, setSInputV] = useState(false);

    const [inputText, setInputText] = useState('');
    const [to, setTo] = useState(new Date());
    const [from, setFrom] = useState(new Date());

    if (loading) {
        return <h2>Loading...</h2>
    }

    if (!user) {
        route.push("/auth/login");
        return;
    }

    return (
        <div className="mt-8 flex flex-col md:flex-row w-full">

            <section className="shadow-lg shadow-pink px-10 py-4 mb-12 md:w-1/3 md:mr-8">
                <h2 className="text-xl font-mono mt-4 mb-6 font-bold">Priorities</h2>
                {priorities.map((priority, index) => {
                    return (
                        <div className="my-3 font-mono" onContextMenu={(e) => {
                            e.preventDefault();

                            setPriorities([...priorities.filter((p) => p.id != priority.id)])
                        }}>
                            <h2 className="text-lg cursor-default" >{priority.body}</h2>
                        </div>
                    )
                })}
                {pInputV && (<input
                    className="w-full h-8 bg-qgray px-3 font-mono text-lg"
                    value={inputText}
                    type="text"
                    onChange={(e) => {
                        setInputText(e.target.value)
                    }}
                    placeholder="ex. meditation"
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            if (inputText.length > 0) {
                                var nPriority = {
                                    id: uuidv4(),
                                    date: new Date(),
                                    body: inputText
                                }
                                var pr = priorities;
                                pr.push(nPriority);
                                setPriorities(pr);
                                setInputText('');
                                setPInputV(false);
                            }
                        }
                    }}
                />)}
                <IoIosAdd className="text-2xl my-4" onClick={() => {
                    setPInputV(!pInputV)
                    setTInputV(false);
                    setSInputV(false);
                }} />
            </section>

            <section className="shadow-lg shadow-pink px-10 py-4 mb-12 md:w-1/3 md:mr-8">
                <h2 className="text-xl font-mono mt-4 mb-6 font-bold">Today's Schedule</h2>

                {schedules.map((schedule, index) => {
                    return (
                        <div className="my-4 font-mono">
                            <h4>{schedule.from.toTimeString().slice(0, 5)}- {schedule.to.toTimeString().slice(0, 5)}</h4>
                            <h2 className="text-lg">{schedule.body}</h2>
                        </div>
                    )
                })}
                {sInputV && (
                    <div>
                        <input
                            className="w-full h-8 bg-qgray px-3 font-mono text-lg mb-4"
                            value={inputText}
                            type="text"
                            onChange={(e) => {
                                setInputText(e.target.value)
                            }}
                            placeholder="ex. class"
                        />
                        <div className="md:flex md:gap-8">
                            <div className="flex gap-4 font-mono">
                                <h2 className="mt-1">From: </h2>
                                <input type="time" className="h-8 bg-qgray px-3 font-mono text-lg mb-4" onChange={(e) => {
                                    setFrom(new Date(today.toDateString() + ' ' + e.target.value))
                                }} />
                            </div>
                            <div className="flex gap-4 font-mono">
                                <h2 className="mt-1">To: </h2>
                                <input type="time" className="h-8 bg-qgray px-3 font-mono text-lg mb-4" onChange={(e) => {
                                    setTo(new Date(today.toDateString() + ' ' + e.target.value))
                                }} />
                            </div>
                            <div className="cursor-default" onClick={() => {
                                if (inputText.length > 0 && to && from) {
                                    var nSchedule = {
                                        id: uuidv4(),
                                        to: to,
                                        from: from,
                                        body: inputText
                                    }
                                    var pr = schedules;
                                    pr.push(nSchedule);
                                    setSchedules(pr);
                                    setInputText('');
                                    setSInputV(false);
                                }
                            }}>
                                <p className="text-center bg-bush px-3 py-1 font-mono">Add</p>
                            </div>
                        </div>
                    </div>
                )
                }

                <IoIosAdd className="text-2xl my-4" onClick={() => {
                    setPInputV(false)
                    setTInputV(false);
                    setSInputV(!sInputV);
                }} />
            </section >

            <section className="shadow-lg shadow-pink px-10 py-4 mb-12 md:w-1/3 md:mr-8">
                <h2 className="text-xl font-mono mt-4 mb-6 font-bold">Todos</h2>
                {todos.map((todo, index) => {
                    return (
                        <div className="my-3 font-mono" onContextMenu={(e) => {
                            e.preventDefault();

                            setTodos([...todos.map((t, id) => {
                                if (t.id != todo.id) return t;
                                else {
                                    todo.done = !todo.done;
                                    return todo;
                                }
                            })])
                        }}>
                            <h2 className={classNames(
                                todo.done ? 'line-through' : '',
                                'text-lg cursor-default'
                            )} >{todo.body}</h2>
                        </div>
                    )
                })}

                {tInputV && (<input
                    className="w-full h-8 bg-qgray px-3 font-mono text-lg"
                    value={inputText}
                    type="text"
                    onChange={(e) => {
                        setInputText(e.target.value)
                    }}
                    placeholder="ex. assignment"
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            if (inputText.length > 0) {
                                var nTodo = {
                                    id: uuidv4(),
                                    date: new Date(),
                                    body: inputText,
                                    done: false
                                }
                                var pr = todos;
                                pr.push(nTodo);
                                setTodos(pr);
                                setInputText('');
                                setTInputV(false);
                            }
                        }
                    }}
                />)}
                <IoIosAdd className="text-2xl my-4" onClick={() => {
                    setTInputV(!tInputV)
                    setPInputV(false);
                    setSInputV(false);
                }} />

            </section>

        </div >
    )
}