"use client"

import AppLink from "@/components/common/window/app/AppLink";
import styles from "@/style/page.module.scss";
import { useAppContext } from "./AppContext";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { motion } from "motion/react";

const AppHeader = ({children}: {children: React.ReactNode}) => {
    return (
        <div className={styles["app-header"]}>
            {children}
        </div>
    )
}


const AppWrapper = () => {
    const { areas, dispatch } = useAppContext();
    
    const onDragEnd = (result: any) => {
        if (!result.destination) return;
        
        dispatch({
            type: "MOVE_APP",
            payload: {
                sourceAreaId: result.source.droppableId,
                destinationAreaId: result.destination.droppableId,
                sourceIndex: result.source.index,
                destinationIndex: result.destination.index
            }
        });
    };
    
    return (
        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 , ease: "easeInOut" }}
            className={styles["app-container"]}
            >
            <div className={styles["app-areas-wrapper"]}>
                <AppHeader>
                    <h5>Career History</h5>
                </AppHeader>
            
                <DragDropContext onDragEnd={onDragEnd}>
                        <div className={styles["app-areas"]}>
                            {areas.map((area) => (
                                <Droppable key={area.id} droppableId={area.id} direction="horizontal">
                                    {(provided) => (
                                        <div 
                                            className={styles["app-wrapper"]}
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                        >
                                            {area.apps.map((app, index) => (
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
                                                                className={app.className}
                                                                color={app.color}
                                                                link={app?.link} 
                                                                outlink={app?.outlink}
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
                            ))}
                        </div>
                </DragDropContext>
            </div>
        </motion.div>
    );
};

export default AppWrapper;