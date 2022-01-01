import { Typeahead } from "react-bootstrap-typeahead";
import { actorMovieDTO } from "./Actor/IActor";

interface ITypeAheadActor {
    displayName: string,
    actors: actorMovieDTO[],
    onAdd(actors: actorMovieDTO[]): void,
    onDel(actor: actorMovieDTO): void,
    listUI(actor: actorMovieDTO): React.ReactElement
}
export const TypeAheadActor = (props: ITypeAheadActor) => {
    const actors: actorMovieDTO[] = [
        { id: 1, name: 'Nguyễn Thanh', character: '', picture: 'https://1.bigdata-vn.com/wp-content/uploads/2021/10/Ngam-Bo-Hinh-Anh-Anime-Dep-Va-Sieu-De-Thuong.jpg' },
        { id: 2, name: 'Triệu Vy', character: '', picture: 'https://i1.sndcdn.com/artworks-000248908839-wlug27-t500x500.jpg' }
    ]

    const selected: actorMovieDTO[] = [];
    return (
        <>
            <label>{props.displayName}</label>
            <Typeahead
                className="my-3 w-25"
                id="typeahead"
                onChange={actors => {

                    if (props.actors.findIndex(a => a.id === actors[0].id) === -1) {
                        props.onAdd([...props.actors, actors[0]])
                        console.log(actors);
                    }

                }}
                options={actors}
                labelKey={actor => actor.name}
                filterBy={['name']}
                placeholder="Nhập tên diễn viên ..."
                minLength={1}
                flip={true}
                selected={selected}

                renderMenuItemChildren={actor => (
                    <>
                        <img
                            style={{ height: '65px', width: '65px' }}
                            src={actor.picture} alt=""
                        />
                        <span>{actor.name}</span>
                    </>
                )}
            />
            <ul className="list-group ms-3">
                {props.actors.map(actor =>
                    <li key={actor.id}>
                        <span className="badge bg-primary mb-3">
                            {props.listUI(actor)}
                        </span>

                        <span style={{ cursor: 'pointer' }} onClick={() => props.onDel(actor)}> x </span>
                    </li>
                )}
            </ul>
        </>
    );
}