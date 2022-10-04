import { Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon,  } from '@heroicons/react/24/outline'

import { useState } from 'react';
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
import { useRouter } from 'next/router';


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Nav() {

    const [user, loading] = useAuthState(auth);
    const [navigation, setNavigation] = useState([
        { name: 'Today', href: '/daily', current: false },
        { name: 'Week', href: '/week', current: false },
        { name: 'Month', href: '/month', current: false },
        { name: 'Clockify', href: '/clockify', current: false },
        { name: 'Reflections', href: '/reflections', current: false },
        { name: 'Dump', href: '/dump', current: false },
    ]);
    const router = useRouter();

    return (
        <Disclosure as="nav" className="bg-skeptic">
            {({ open }) => (
                <>
                    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                        <div className="relative flex h-16 items-center justify-between">
                            {user && (
                                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:text-gray-800">
                                        <span className="sr-only">Open main menu</span>
                                        {open ? (
                                            <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                        ) : (
                                            <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                        )}
                                    </Disclosure.Button>
                                </div>
                            )}
                            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                <div className="flex flex-shrink-0 items-center">
                                    <Link href={"/"}><h2 className="text-3xl cursor-pointer font-burtons">Niyam-It</h2></Link>
                                </div>

                            </div>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                {!user && (
                                    <Link href={"/auth/login"} >
                                        <div className="flex text-lg items-center cursor-pointer font-medium">
                                            Login
                                        </div>
                                    </Link>
                                )}

                                {user && (
                                    <>
                                        <div className="hidden sm:ml-6 sm:block mr-5">
                                            <div className="flex space-x-4">
                                                {navigation.map((item) => (
                                                    <Link
                                                        key={item.name}
                                                        href={item.href}

                                                    >
                                                        <p className={classNames(
                                                            router.pathname == item.href ? 'bg-gray-900 text-white' : 'text-black hover:bg-gray-700 hover:text-white',
                                                            'px-3 py-2 rounded-md text-sm font-medium cursor-pointer'
                                                        )}>
                                                            {item.name}
                                                        </p>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                        <Link href="/dashboard">
                                            <img
                                                referrerPolicy="no-referrer"
                                                className="w-8 rounded-full cursor-pointer ml-4"
                                                src={user.photoURL}
                                                alt=""
                                            />
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                    {user && (
                        <Disclosure.Panel className="sm:hidden">
                            <div className="space-y-1 px-2 pt-2 pb-3">
                                {navigation.map((item) => (
                                    <Disclosure.Button
                                        key={item.name}
                                        as="a"
                                        href={item.href}
                                        className={classNames(
                                            router.pathname == item.href ? 'bg-gray-700 text-white' : 'text-black hover:bg-qgray hover:text-black',
                                            'block px-3 py-2 rounded-md text-base font-medium'
                                        )}
                                        aria-current={item.current ? 'page' : undefined}
                                    >
                                        {item.name}
                                    </Disclosure.Button>
                                ))}
                            </div>
                        </Disclosure.Panel>
                    )}

                </>
            )}
        </Disclosure>
    )
}
