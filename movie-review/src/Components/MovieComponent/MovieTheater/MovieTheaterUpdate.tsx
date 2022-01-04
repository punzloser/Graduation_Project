import { movieTheaterUrl } from "../../../endpoints";
import Update from "../../Entities/Update";
import { movieTheaterCreationDTO, movieTheaterDTO } from "./IMovieTheater";
import { MovieTheaterForm } from "./MovieTheaterForm";

export const MovieTheaterUpdate = () => {
    return (
        <>
            <Update<movieTheaterCreationDTO, movieTheaterDTO>
                urlBase={movieTheaterUrl}
                urlIndex="/rap"
            >
                {(movieTheaters, update) => (
                    <MovieTheaterForm
                        model={movieTheaters}
                        onSubmit={async e => {
                            await update(e);
                        }}
                    />
                )}
            </Update>
        </>
    );
}