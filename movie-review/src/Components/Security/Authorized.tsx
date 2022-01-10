import { useState } from "react";
import { ReactElement } from "react-markdown/lib/react-markdown";

interface IAuthorized {
    authorized: ReactElement;
    notAuthorized?: ReactElement;
    role?: string
}
export const Authorized = (props: IAuthorized) => {
    const [isAuthor, setIsAuthor] = useState(true);

    return (
        <>
            {isAuthor ? props.authorized : props.notAuthorized}
        </>
    );
}