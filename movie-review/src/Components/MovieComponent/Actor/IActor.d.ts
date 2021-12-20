export interface IActor {
    name: string,
    dateOfBirth?: Date,
    picture?: File,
    pictureUrl?: string,
    biography?: string
}

export interface actorDTO {
    id: number,
    name: string,
    character: string,
    picture: string
}