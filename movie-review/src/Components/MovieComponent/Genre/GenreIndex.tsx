import { genreUrl } from "../../../endpoints";
import Index from "../../Entities/Index";
import { genreDTO } from './IGenre';

export const GenreIndex = () => {
    return (
        <>
            <Index<genreDTO>
                urlBase={genreUrl}
                urlCreate="the-loai/them"
                title="Thể loại"
            >
                {(genres, buttons) => (
                    <>
                        <thead>
                            <tr>
                                <th>Thể loại</th>
                                <th>Chức năng</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                genres?.map((e, i) =>
                                    <tr key={i}>
                                        <td>{e.name}</td>
                                        <td>
                                            {buttons(`the-loai/sua/${e.id}`, e.id)}
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </>
                )}
            </Index>
        </>
    );
}