import React, { useState, useEffect, useRef } from "react";
import Draggable from "react-draggable";
import { v4 as uuidv4 } from "uuid";
import ContentEditable from "react-contenteditable";

import { auth } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";

export default function Dump() {

    const [user, loading] = useAuthState(auth);
    const route = useRouter();

    if (loading) {
        return <h2>Loading...</h2>
    }

    if (!user) {
        route.push("/auth/login");
        return;
    }

    const [items, setItems] = useState(
        []
    );
    const [color, setColor] = useState([
        "#CAE7E3",
        "#EEB8C5",
        "#FEC7BC",
        "#B2B2B2",
    ]);

    useEffect(() => {
        var items = JSON.parse(localStorage.getItem("items"));
        setItems(items);
    })

    const timer = useRef()

    const onClickHandler = (event, itemm) => {
        clearTimeout(timer.current);

        if (event.type === "contextmenu") {
            // console.log("right click");

            event.preventDefault();

            let itemColor = itemm.color;
            // choose a different than itemColor from color array
            let newColor = color.filter(color => color !== itemColor);

            let newArr = [...items];
            for (let i = 0; i < newArr.length; i++) {
                if (newArr[i].id === itemm.id) {
                    newArr[i].color = newColor[Math.floor(Math.random() * newColor.length)];
                }
            }

            setItems(newArr);
            localStorage.setItem("items", JSON.stringify(items));

        }

        if (event.detail === 1) {
            // timer.current = setTimeout(onClick, 200)
        } else if (event.detail === 2) {
            deleteNote(itemm.id)
        }
    }

    const handleChange = (itemm, evt) => {


        // console.log("items", items)
        // localStorage.setItem("items", JSON.stringify([]));
        console.log("itemm", itemm, evt.target.value);
        // itemm.item = evt.target.value;

        let newArr = [...items];
        for (let i = 0; i < newArr.length; i++) {
            if (newArr[i].id === itemm.id) {
                newArr[i].item = evt.target.value;
            }
        }
        setItems(newArr);
        localStorage.setItem("items", JSON.stringify(items));

        // clear the evt.target.value
        evt.target.value = "";

        // console.log("items", items)

    };


    const newitem = () => {
        const newItem = {
            id: uuidv4(),
            item: 'Hey there',
            color: color[Math.floor(Math.random() * color.length)],
        }
        setItems([...items, newItem]);
        localStorage.setItem("items", JSON.stringify([...items, newItem]));
    };

    const updatePos = (data, index) => {
        // console.log("items", items)
        let newArr = [...items];
        newArr[index].defaultPos = { x: data.x, y: data.y };
        setItems(newArr);
        localStorage.setItem("items", JSON.stringify(items));
    };

    const deleteNote = (id) => {
        // setItems(items.filter((item) => item.id !== id));
        let newArr = [...items];
        newArr = newArr.filter((item) => item.id !== id);
        setItems(newArr);
        localStorage.setItem("items", JSON.stringify(newArr));
    };

    return (
        <div className="my-12 h-full">
            <div onClick={newitem}>
                <h1 className="text-2xl font-mono">Brain Dump</h1>
            </div>
            <div id="items">
                {items.map((item, index) => {
                    return (
                        <Draggable
                            key={item.id}
                            defaultPosition={item.defaultPos}
                            onStop={(e, data) => {
                                updatePos(data, index);
                            }}
                        >
                            <div style={{ backgroundColor: item.color }} className="box"
                                onClick={(event) => onClickHandler(event, item)}
                                onContextMenu={(event) => onClickHandler(event, item)}
                            >
                                <ContentEditable
                                    html={item.item} // innerHTML of the editable div
                                    disabled={false}       // use true to disable editing
                                    onChange={(evt) => handleChange(item, evt)} // handle innerHTML change
                                    tagName='div' // Use a custom HTML tag (uses a div by default)
                                    className='p-3 text-lg font-mono'
                                />
                            </div>
                        </Draggable>
                    );
                })}
            </div>
        </div>
    );
}

