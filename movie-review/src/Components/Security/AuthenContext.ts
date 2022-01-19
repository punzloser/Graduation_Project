import { createContext } from "react";
import claim from "./IAuth";

export const AuthenContext = createContext<{
    claims: claim[],
    update(claims: claim[]): void
}>({ claims: [], update: () => { } });
