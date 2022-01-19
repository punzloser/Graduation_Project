import { actorCreationDTO } from "../MovieComponent/Actor/IActor";
import movieCreationDTO from "../MovieComponent/Movie/IMovie";

export const ActorToFormData = (actor: actorCreationDTO): FormData => {
    const fd = new FormData();
    fd.append('name', actor.name);

    if (actor.biography) {
        fd.append('biography', actor.biography);
    }
    if (actor.dob) {
        fd.append('dob', FormatDate(actor.dob));
    }
    if (actor.picture) {
        fd.append('picture', actor.picture);
    }
    return fd;
}

export const MovieToFormData = (movie: movieCreationDTO) => {
    const fd = new FormData();

    fd.append('title', movie.title);
    fd.append('inTheaters', String(movie.inTheaters));
    fd.append('trailer', movie.trailer);

    if (movie.poster) {
        fd.append('poster', movie.poster);
    }

    if (movie.releaseDate) {
        fd.append('releaseDate', FormatDate(movie.releaseDate));
    }

    if (movie.summary) {
        fd.append('summary', movie.summary);
    }

    fd.append('genreIds', JSON.stringify(movie.genreIds));
    fd.append('movieTheaterIds', JSON.stringify(movie.movieTheaterIds));
    fd.append('actors', JSON.stringify(movie.actors));

    return fd;
}

const FormatDate = (date: Date) => {
    const format = new Intl.DateTimeFormat('en', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });

    const [{ value: month }, , { value: day }, , { value: year }] = format.formatToParts(date);
    return `${year}-${month}-${day}`
}