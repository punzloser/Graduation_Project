import { Form, Formik, FormikHelpers } from "formik";
import movieCreationDTO from "./IMovie";
import * as Yup from 'yup';
import { Btn } from "../../Utilities/Btn";
import { Link } from "react-router-dom";
import { TextField } from "../TextField";
import { DateField } from "../DateField";
import { ImageField } from "../ImageField";
import { CheckBoxField } from "../CheckBoxField";
import IMultiSelectorModel, { MultiSelector } from "../MultiSelector";
import { useState } from "react";
import { genreDTO } from "../Genre/IGenre";
import { movieTheaterDTO } from "../MovieTheater/IMovieTheater";
import { TypeAheadActor } from "../TypeAheadActor";
import { actorMovieDTO } from "../Actor/IActor";
import { MarkdownField } from "../MarkdownField";

interface IMovieForm {
    model: movieCreationDTO,
    onSubmit(values: movieCreationDTO, actions: FormikHelpers<movieCreationDTO>): void,
    selectedGenres: genreDTO[],
    nonSelectedGenres: genreDTO[],
    selectedMovieTheaters: movieTheaterDTO[],
    nonSelectedMovieTheaters: movieTheaterDTO[],
    selectedActors: actorMovieDTO[]
}

export const MovieForm = (props: IMovieForm) => {

    const mapToModel = (items: { id: number, name: string }[]): IMultiSelectorModel[] => {
        return items.map(item => {
            return { key: item.id, value: item.name }
        })
    }

    const [selectedGenres, setSelectedGenres] = useState(mapToModel(props.selectedGenres));
    const [nonSelectedGenres, setNonSelectedGenres] = useState(mapToModel(props.nonSelectedGenres));
    const [selectedMovieTheaters, setSelectedMovieTheaters] = useState(mapToModel(props.selectedMovieTheaters));
    const [nonSelectedMovieTheaters, setNonSelectedMovieTheaters] = useState(mapToModel(props.nonSelectedMovieTheaters));
    const [selectedActors, setSelectedActors] = useState(props.selectedActors)

    return (
        <Formik
            initialValues={props.model}
            onSubmit={(values, actions) => {
                values.genreIds = selectedGenres.map(item => item.key);
                values.movieTheaterIds = selectedMovieTheaters.map(item => item.key);
                values.actors = selectedActors;
                props.onSubmit(values, actions);
            }}
            validationSchema={Yup.object({
                title: Yup.string().required('Nhập tựa phim').firstLetterUppercase()
            })}
        >

            {formProps => (
                <Form>
                    <TextField field="title" displayName="Tựa phim" />
                    <CheckBoxField field="inTheaters" displayName="Đang chiếu" />
                    <TextField field="trailer" displayName="Trailer" />
                    <DateField displayName="Ngày chiếu" field="releaseDate" />
                    <ImageField displayName="Poster" field="poster" imageUrl={props.model.posterUrl} />

                    <div className="d-flex">
                        <MultiSelector
                            displayName="Chọn thể loại"
                            nonSelected={nonSelectedGenres}
                            selected={selectedGenres}
                            onChange={(selected, nonSelected) => {
                                setSelectedGenres(selected);
                                setNonSelectedGenres(nonSelected);
                            }}
                        />
                        <MultiSelector
                            displayName="Chọn rạp"
                            nonSelected={nonSelectedMovieTheaters}
                            selected={selectedMovieTheaters}
                            onChange={(selected, nonSelected) => {
                                setSelectedMovieTheaters(selected);
                                setNonSelectedMovieTheaters(nonSelected);
                            }}
                        />

                    </div>
                    <TypeAheadActor
                        displayName="Diễn viên"
                        actors={selectedActors}
                        onAdd={(actors: actorMovieDTO[]) => {
                            setSelectedActors(actors);
                        }}
                        onDel={(actor: actorMovieDTO) => {
                            const actors = selectedActors.filter(a => a !== actor);
                            setSelectedActors(actors);
                        }}
                        listUI={(actor: actorMovieDTO) => (
                            <div>
                                {actor.name}
                                <input
                                    className="ms-2 border border-white rounded"
                                    type="text"
                                    placeholder="Nhân vật"
                                    value={actor.character}
                                    onChange={e => {
                                        const index = selectedActors.findIndex(a => a.id === actor.id);
                                        const actors = [...selectedActors];
                                        actors[index].character = e.currentTarget.value;
                                        setSelectedActors(actors);
                                    }}
                                />
                            </div>
                        )}
                    />
                    <MarkdownField displayName="Tóm tắt phim" field="summary" isDemo={false} />
                    <div className="my-5">
                        <Btn type="submit" disabled={formProps.isSubmitting}>Lưu lại</Btn>
                        <Link className="btn btn-md btn-warning ms-2" to="/phim">Hủy</Link>
                    </div>
                </Form>
            )}

        </Formik>
    );
}