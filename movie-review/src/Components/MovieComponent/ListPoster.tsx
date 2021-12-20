import { IPoster } from "./IPoster";
import { Poster } from "./Poster";
import css from "./ListPoster.module.css";
import { GeneralPosterList } from "../Utilities/GeneralPosterList";

interface IListPoster {
    list?: IPoster[]
}
export const ListPoster = (props: IListPoster) => {
    return (
        <GeneralPosterList _list={props.list} >
            <div className={css.flex}>

                {
                    props.list?.map(a => <Poster {...a} key={a.id} />)
                }

            </div>
        </GeneralPosterList>
    );

}