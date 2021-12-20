import { IPoster } from "./IPoster";
import css from "./Poster.module.css"
export const Poster = (props: IPoster) => {
    return (
        <div className={css.div}>
           
            <a href="/">
                <img src={props.img} alt={props.title} />
                <p>{props.title}</p>
            </a>

        </div>
    );
}