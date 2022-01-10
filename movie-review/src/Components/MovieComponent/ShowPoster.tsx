import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { movieUrl } from "../../endpoints";
import { Authorized } from "../Security/Authorized";
import { AlertContext } from "./AlertContext";
import { IListPoster } from "./IListPoster";
import { ListPoster } from "./ListPoster";

export const ShowPoster = () => {

    const [poster, setPoster] = useState<IListPoster>({});

    const loadData = async () => {
        await axios.get(movieUrl)
            .then((response: AxiosResponse<IListPoster>) => {
                setPoster(response.data);
            })
    }

    useEffect(() => {
        loadData();
    }, []);

    return (
        <AlertContext.Provider value={() => loadData()}>

            <Authorized authorized={<>True</>} notAuthorized={<>False</>} />
            <div className="container mb-5">
                <h1>Đang chiếu</h1>
                <ListPoster list={poster.inTheaters} />
                <h1>Sắp chiếu</h1>
                <ListPoster list={poster.upcomingReleases} />
            </div>
        </AlertContext.Provider>
    );
}