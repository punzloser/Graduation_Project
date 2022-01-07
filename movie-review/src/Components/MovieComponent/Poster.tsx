import { Link } from "react-router-dom";
import { IPoster } from "./IPoster";
import css from "./Poster.module.css"

export const Poster = (props: IPoster) => {

    return (
        <div className={css.div}>

            <Link to={`phim/${props.id}`}>
                <img src={props.poster} alt={props.title} />
                <p>{props.title}</p>
            </Link>

        </div>
    );
}