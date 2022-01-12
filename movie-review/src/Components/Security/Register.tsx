import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { accountUrl } from "../../endpoints";
import { DisplayErrors } from "../Utilities/DisplayErrors";
import { AuthenForm } from "./AuthenForm";
import { authenResponse, userCredsRequest } from "./IAuth";

export const Register = () => {

    const [errs, setErrs] = useState<string[]>([]);
    const history = useHistory();

    const register = async (model: userCredsRequest) => {

        try {
            const result =
                await axios.post<authenResponse>(`${accountUrl}/register`, model);
            history.push('/');
        } catch (error: any) {
            if (error && error.response) {
                setErrs(error.response.data);
            }
        }
    }
    return (
        <div className="container-fluid">
            <h3 className="text-muted">Đăng kí</h3>
            <DisplayErrors errors={errs} />
            <AuthenForm model={{ email: '', pass: '' }}
                onSubmit={async e => {
                    await register(e);
                }}
            />
        </div>
    );
}