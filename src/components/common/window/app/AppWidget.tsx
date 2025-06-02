"use client";

import styles from "@/style/page.module.scss";
import AppLink from "./AppLink";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useState, useEffect } from "react";
import { widgetApps } from "./AppData";
import { motion } from "motion/react";
import MailApp from "./MailApp";
import { AppItem } from "./AppType";
import { usePathname } from "next/navigation";

const AppWidget = () => {
    const [apps, setApps] = useState(widgetApps);
    const [isMounted, setIsMounted] = useState(false);

    const pathname = usePathname();
    
    useEffect(() => {
        setIsMounted(true);
    }, []);

    const onDragEnd = (result: any) => {
        if (!result.destination) return;
        
        const items = Array.from(apps);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        
        setApps(items);
    };

    const addNewApp = (newApp: AppItem) => {
        setApps(prevApps => [...prevApps, newApp]);
    };

    useEffect(() => {
        if (pathname !== "/") {
            if (pathname.includes("/resume")) {
                addNewApp({ type: "folder", label: "Resume", name: "resume", color: "rgb(224,64,47)", link: "/resume" });
            } else if (pathname.includes("/about")) {
                addNewApp({ type: "folder", label: "About", name: "about", color: "rgb(238,188,17)", link: "/about" })
            } else if (pathname.includes("/game")) {
                addNewApp({ type: "img", imgSrc: "/assets/game/sticker_slime_logo.png", className: "square", label: "1인 개발", name: "game", color: "rgb(121, 120, 120)", link: "/game" })
            } else if (pathname.includes("/project")) {
                addNewApp({ type: "img", label: "Project", name: "project", color: "rgb(46,142,214)", link: pathname })
            }
        }else{
            setApps(widgetApps);
        }
    }, [pathname]);


    if (!isMounted) return null;

    return (
        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 , ease: "easeInOut", delay: 0.3 }}
            className={styles["app-widget-container"]}>
            <div className={styles["widget-wrapper"]}>
                <div className={styles["widget-wrapper-dim"]}></div>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="apps" direction="horizontal">
                        {(provided) => (
                            <div 
                                className={styles["item-wrapper"]}
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                {apps.map((app, index) => (
                                    <Draggable 
                                        key={app.name} 
                                        draggableId={app.name} 
                                        index={index}
                                    >
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={{
                                                    ...provided.draggableProps.style,
                                                    opacity: snapshot.isDragging ? 0.9 : 1,
                                                }}
                                                className={styles["drag-item"]}
                                            >
                                                <AppLink 
                                                    type={app.type}
                                                    imgSrc={app.imgSrc}
                                                    label={app.label} 
                                                    color={app.color}
                                                    link={app.link} 
                                                    className={app.className}
                                                    outlink={app.outlink}
                                                    name={app.name}
                                                />
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
                <MailApp/>
            </div>
        </motion.div>
    );
};

export default AppWidget;