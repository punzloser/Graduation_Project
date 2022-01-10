import axios from "axios";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { movieUrl } from "../../endpoints";
import { Btn } from "../Utilities/Btn";
import { CustomConfirm } from "../Utilities/CustomConfirm";
import { AlertContext } from "./AlertContext";
import { IPoster } from "./IPoster";
import css from "./Poster.module.css"

export const Poster = (props: IPoster) => {
    const alertDel = useContext(AlertContext);

    const delMovie = async () => {
        await axios.delete(`${movieUrl}?id=${props.id}`)
            .then(() => alertDel())
    }
    return (
        <div
            style={{ marginRight: '5px', marginBottom: '5px' }}
            className={css.div}
        >

            <Link to={`phim/${props.id}`}>
                <img src={props.poster} alt={props.title} />
                <p>{props.title}</p>
            </Link>

            <Link className="btn btn-warning" to={`phim/sua/${props.id}`} children={`Sửa`} />
            <Btn bgColor="btn btn-danger ms-2" children={`Xóa`}
                onClick={() => CustomConfirm(() => delMovie())}
            />
        </div>
    );
}