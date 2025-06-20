"use client";

import ModalLeftContainer from "@/components/common/page/layout/ModalLeftContainer";
import Category from "@/components/common/page/container/CategoryItem";
import ModalRightContainer from "@/components/common/page/layout/ModalRightContainer";
import { useCallback, useEffect, useRef, useState } from "react";
import { gameData } from "@/utils/categoryDatas";
import styles from "@/style/sub-page.module.scss";
import Header from "@/components/common/page/container/Header";
import ContentContainer from "@/components/common/page/container/ContentContainer";
import ContentOne from "./ContentOne";
import ContentTwo from "./ContentTwo";
import ContentThree from "./ContentThree";


const UnityContainer = () => {
    const [currentSection, setSection] = useState(0);
    const rightContainerRef = useRef<HTMLDivElement>(null);
    const categoryRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [category, setCategory] = useState(gameData);
    const [title, setTitle] = useState("1인 개발 여정");

    const onClick = (e: React.MouseEvent<HTMLElement>) => {
        const id = e.currentTarget.id;
        const activeIndex = category.findIndex((el) => el.id === id);
        const targetRef = categoryRefs.current[activeIndex];

        if (targetRef && rightContainerRef.current) {
        rightContainerRef.current.scrollTo({
            top: targetRef ? targetRef.offsetTop - 100 : 0,
            behavior: "smooth",
        });
        }
    };

    const autoChange = useCallback(() => {
        setCategory(
        category.map((el) => (el.id === currentSection + "" ? { ...el, active: true } : { ...el, active: false }))
        );
    },[category, currentSection,]);

    useEffect(() => {
        setTitle(category[currentSection].name);
    }, [category, currentSection]);

    useEffect(() => {
        const currentRef = rightContainerRef.current;

        function onHandlScroll() {
            const scrollPosition = rightContainerRef.current ? rightContainerRef.current.scrollTop + 440 : 0;
            const sectionPositions = categoryRefs.current.map((ref) => (ref ? ref.offsetTop : 0));

            for (let i = 0; i < sectionPositions.length; i++) {
                const nextIndex = i + 1;
                if (scrollPosition >= sectionPositions[i] && scrollPosition < (sectionPositions[nextIndex] || Infinity)) {
                    setSection(i);
                    autoChange();
                    break;
                }
            }
        }

        currentRef?.addEventListener("scroll", onHandlScroll);

        return () => {
        currentRef?.removeEventListener("scroll", onHandlScroll);
        };
    }, [currentSection, autoChange]);

    // ref 설정을 위한 함수
    const setCategoryRef = useCallback((element: HTMLDivElement | null, index: number) => {
        categoryRefs.current[index] = element;
    }, []);

    return (
        <>
            <ModalLeftContainer>
                <div className={styles["unity-left-container"]}>
                    <Category>
                        {category.map((item) => (
                            <Category.Item onClick={onClick} key={item.id} id={item.id} text={item.name} isActive={item.active}/>
                        ))}
                    </Category>
                </div>
            </ModalLeftContainer>
            <ModalRightContainer scroll={true} header={<Header title={title}/>} ref={rightContainerRef}>
                {category.map((item, index) => (
                    <ContentContainer 
                        key={item.id}
                        id={item.id} 
                        ref={(element) => setCategoryRef(element, index)}
                    >
                        {index === 0 && <ContentOne />}
                        {index === 1 && <ContentTwo />}
                        {index === 2 && <ContentThree />}
                    </ContentContainer>
                ))}
            </ModalRightContainer>
        </>
    )
}

export default UnityContainer;