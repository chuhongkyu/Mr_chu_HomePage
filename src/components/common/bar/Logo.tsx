import styles from "@/style/page.module.scss";

interface ILogoProps{
    onHandleSlide: ()=> void;
}

function Logo({onHandleSlide}:ILogoProps) {
    return (
        <button className={styles["bar-logo-icon"]} onClick={onHandleSlide}>
            <picture>
                <source type="image/webp" srcSet={"/assets/img/mrchu.webp"}/>
                <source type="image/jpeg" srcSet={"/assets/img/mrchu.jpeg"}/>
                <img src={"/assets/img/mrchu.webp"} alt="3"/>
            </picture>
        </button>
    )
}

export default Logo