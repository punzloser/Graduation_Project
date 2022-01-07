import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { movieUrl } from "../../endpoints";
import { IListPoster } from "./IListPoster";
import { ListPoster } from "./ListPoster";

export const ShowPoster = () => {

    const [poster, setPoster] = useState<IListPoster>({});

    function loadData() {
        axios.get(movieUrl)
            .then((response: AxiosResponse<IListPoster>) => {
                setPoster(response.data);
                console.log(response.data.upcomingReleases)
            })
    }

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div className="container mb-5">
            <h1>Đang chiếu</h1>
            <ListPoster list={poster.inTheaters} />
            <h1>Sắp chiếu</h1>
            <ListPoster list={poster.upcomingReleases} />
        </div>
    );
}