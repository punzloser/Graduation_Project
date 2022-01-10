import { useContext, useEffect, useState } from "react";
import { ReactElement } from "react-markdown/lib/react-markdown";
import {AuthenContext} from "./AuthenContext";

interface IAuthorized {
    authorized: ReactElement;
    notAuthorized?: ReactElement;
    role?: string
}
export const Authorized = (props: IAuthorized) => {
    const [isAuthor, setIsAuthor] = useState(true);
    const { claims } = useContext(AuthenContext);

    useEffect(() => {
        if (props.role) {
            const findIndex =
                claims.findIndex(a => a.name === 'role' && a.value === props.role);
            setIsAuthor(findIndex > -1);
        } else {
            setIsAuthor(claims.length > 0);
        }
    }, [claims, props.role])

    return (
        <>
            {isAuthor ? props.authorized : props.notAuthorized}
        </>
    );
}