import claim, { authenResponse } from './IAuth'

const tokenKey = 'token_key';
const expirationKey = 'token_exp';

export const setToken = (model: authenResponse) => {

    localStorage.setItem(tokenKey, model.token);
    localStorage.setItem(expirationKey, model.expiration.toString());
}

export const removeToken = () => {

    localStorage.removeItem(tokenKey);
    localStorage.removeItem(expirationKey);
}

export const getClaim = (): claim[] => {

    const token = localStorage.getItem(tokenKey);
    const exp = localStorage.getItem(expirationKey)!;
    const expDay = new Date(exp);
    const today = new Date();

    if (!token || token === undefined) {
        return [];
    }

    if (expDay <= today) { return [] }

    const thisClaimList: claim[] = [];
    let decodeData = atob(token.split('.')[1]);
    const result = JSON.parse(decodeData);

    for (const prop in result) {
        thisClaimList.push({ name: prop, value: result[prop] })
    }

    return thisClaimList;
}  