import axios, { AxiosResponse } from "axios";
import { useState } from "react";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import { actorUrl } from "../../endpoints";
import { actorMovieDTO } from "./Actor/IActor";

interface ITypeAheadActor {
    displayName: string,
    actors: actorMovieDTO[],
    onAdd(actors: actorMovieDTO[]): void,
    onDel(actor: actorMovieDTO): void,
    listUI(actor: actorMovieDTO): React.ReactElement
}
export const TypeAheadActor = (props: ITypeAheadActor) => {

    const [loading, setLoading] = useState(false);
    const [actors, setActors] = useState<actorMovieDTO[]>([]);

    const handleSearch = (name: string) => {
        setLoading(true);

        axios.get(`${actorUrl}/search?name=${name}`)
            .then((response: AxiosResponse<actorMovieDTO[]>) => {
                setLoading(false);
                setActors(response.data);
            })
    }

    const selected: actorMovieDTO[] = [];
    return (
        <>
            <label>{props.displayName}</label>
            <AsyncTypeahead
                className="my-3 w-25"
                id="typeahead"
                onChange={actors => {

                    if (props.actors.findIndex(a => a.id === actors[0].id) === -1) {
                        actors[0].character = '';
                        props.onAdd([...props.actors, actors[0]])
                    }

                }}
                options={actors}
                labelKey={actor => actor.name}
                filterBy={() => true}
                isLoading={loading}
                onSearch={handleSearch}
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