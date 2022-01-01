import { actorCreationDTO } from "../MovieComponent/Actor/IActor";

export const ToFormData = (actor: actorCreationDTO): FormData => {
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

const FormatDate = (date: Date) => {
    const format = new Intl.DateTimeFormat('en', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });

    const [{ value: month }, , { value: day }, , { value: year }] = format.formatToParts(date);
    return `${year}-${month}-${day}`
}