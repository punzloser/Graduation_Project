import { useEffect, useState } from "react";
import { IListPoster } from "./IListPoster";
import { ListPoster } from "./ListPoster";

export const ShowPoster = () => {

    const [poster, setPoster] = useState<IListPoster>({});
    useEffect(() => {
        const timeId = setTimeout(() => {
            setPoster({
                inTheaters: [
                    {
                        id: 1,
                        img: `https://zingtv-photo.zadn.vn/channel/e/7/a/4/e7a437da409c65dad156f356aef7e9ba.jpg`,
                        title: 'Sự trỗi dậy của khiên anh hùng 1'
                    },
                    {
                        id: 2,
                        img: `https://api.toploigiai.vn/storage/uploads/tom-tat-truyen-5cm-s_1`,
                        title: '5 Centimet trên giây'
                    }
                ],
                upComingReleases: [
                    {
                        id: 1,
                        img: `https://tuoitrechinhphuc.com/wp-content/uploads/2020/12/your-name-696x484-1.jpg`,
                        title: 'Your name'
                    },
                    {
                        id: 2,
                        img: `https://zingtv-photo.zadn.vn/channel/e/7/a/4/e7a437da409c65dad156f356aef7e9ba.jpg`,
                        title: 'Sự trỗi dậy của khiên anh hùng 2'
                    }
                ]
            })
        }, 500);
        return () => clearTimeout(timeId);
    });
    return (
        <div className="container">
            <h1>Đang chiếu</h1>
            <ListPoster list={poster.inTheaters} />
            <h1>Sắp chiếu</h1>
            <ListPoster list={poster.upComingReleases} />
        </div>
    );
}