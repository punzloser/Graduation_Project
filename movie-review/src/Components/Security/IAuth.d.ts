export default interface claim {
    name: string,
    value: string
}

export interface userCredsRequest {
    email: string,
    pass: string
}

export interface authenResponse {
    token: string,
    expiration: Date
}

export interface UserDTO {
    id: string,
    email: string,
    isAdmin: boolean
}