"use client";

import styles from "@/style/page.module.scss";
import AppLink from "./AppLink";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useState } from "react";
import { widgetApps } from "./AppData";

const AppWidget = () => {
    const [apps, setApps] = useState(widgetApps);

    const onDragEnd = (result: any) => {
        if (!result.destination) return;
        
        const items = Array.from(apps);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        
        setApps(items);
    };

    return (
        <div className={styles["app-widget-container"]}>
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
                                                
                                            >
                                                <AppLink 
                                                    type={app.type}
                                                    imgSrc={app.imgSrc}
                                                    label={app.label} 
                                                    color={app.color}
                                                    link={app.link} 
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
            </div>
        </div>
    )
}

export default AppWidget;