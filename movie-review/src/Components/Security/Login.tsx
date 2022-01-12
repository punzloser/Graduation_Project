import axios from "axios";
import { useState } from "react";
import { accountUrl } from "../../endpoints";
import { DisplayErrors } from "../Utilities/DisplayErrors";
import { AuthenForm } from "./AuthenForm";
import { authenResponse, userCredsRequest } from "./IAuth";

export const Login = () => {

    const [errs, setErrs] = useState<string[]>([]);

    const login = async (model: userCredsRequest) => {
        try {
            setErrs([]);
            const result = await axios.post<authenResponse>(`${accountUrl}/login`, model);
            console.log(result);

        } catch (error: any) {
            if (error && error.response) {
                setErrs(error.response.data);
            }
        }
    }
    return (
        <div className="container-fluid">
            <h3 className="text-muted">Đăng nhập</h3>
            <DisplayErrors errors={errs} />
            <AuthenForm model={{ email: '', pass: '' }}
                onSubmit={async e => {
                    await login(e);
                }}
            />
        </div>
    );
}