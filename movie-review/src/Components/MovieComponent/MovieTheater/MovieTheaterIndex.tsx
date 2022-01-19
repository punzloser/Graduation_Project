import { movieTheaterUrl } from "../../../endpoints";
import Index from "../../Entities/Index";
import { movieTheaterDTO } from "./IMovieTheater";

export const MovieTheaterIndex = () => {
    return (
        <>
            <Index<movieTheaterDTO>
                urlBase={movieTheaterUrl}
                urlCreate="rap/them"
                title="Rạp phim"
            >
                {(movieTheaters, buttons) => (
                    <>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Tên rạp</th>
                                <th>Chức năng</th>
                            </tr>
                        </thead>
                        <tbody>
                            {movieTheaters.map((e, i) => (
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>{e.name}</td>
                                    <td>{buttons(`rap/sua/${e.id}`, e.id)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </>
                )}

            </Index>
        </>
    );
}