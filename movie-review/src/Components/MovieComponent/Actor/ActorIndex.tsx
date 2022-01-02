import { actorUrl } from "../../../endpoints";
import Index from "../../Entities/Index";
import { actorDTO } from "./IActor";
import Moment from 'moment';

export const ActorIndex = () => {
    return (
        <>
            <Index<actorDTO>
                urlBase={actorUrl}
                urlCreate="dien-vien/them"
                title="Diễn viên"
            >
                {(actors, buttons) => (
                    <>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Diễn viên</th>
                                <th>Ngày sinh</th>
                                <th>Chức năng</th>
                            </tr>
                        </thead>
                        <tbody className="align-text-bottom">
                            {actors.map((e, i) => (
                                <tr key={i}>
                                    <td>
                                        <img
                                            style={{ width: '6vw', borderRadius: '10px'}}
                                            src={`${e.picture}`} alt={e.name}
                                        />
                                    </td>
                                    <td>{e.name}</td>
                                    <td>{Moment(e.dob).format("DD-MM-YYYY")}</td>
                                    <td>{buttons(`dien-vien/sua/${e.id}`, e.id)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </>
                )}

            </Index>
        </>
    );
}