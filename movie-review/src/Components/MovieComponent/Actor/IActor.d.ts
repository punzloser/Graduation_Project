export interface actorCreationDTO {
    name: string,
    dob?: Date,
    picture?: File,
    pictureUrl?: string,
    biography?: string
}

export interface actorMovieDTO{
    id: number,
    name: string,
    character: string,
    picture: string
}

export interface actorDTO{
    id: number;
    name: string;
    biography: string;
    dob: Date;
    picture: string;
}