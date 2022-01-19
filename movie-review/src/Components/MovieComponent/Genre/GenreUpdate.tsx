import { genreUrl } from "../../../endpoints";
import Update from "../../Entities/Update";
import { GenreForm } from "./GenreForm";
import { genreDTO, genreCreationDTO } from "./IGenre";

export const GenreUpdate = () => {

    return (
        <>
            <Update<genreCreationDTO, genreDTO>
                urlBase={genreUrl}
                urlIndex="/the-loai"
            >
                {(entity, update) =>
                    <GenreForm
                        initValue={entity}
                        onSubmit={async (e) => {
                            await update(e);
                        }} />
                }
            </Update>
        </>
    );
}