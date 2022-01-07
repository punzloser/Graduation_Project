import axios, { AxiosResponse } from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { movieUrl } from "../../../endpoints";
import { Loading } from "../../Utilities/Loading";
import { movieDTO } from "./IMovie";

export const MovieDetail = () => {
    const [movieDetail, setMovieDetail] = useState<movieDTO>();
    const { id }: any = useParams();

    const render = async () => {
        await axios.get(`${movieUrl}/${id}`)
            .then((response: AxiosResponse<movieDTO>) => {
                setMovieDetail(response.data);
            })
    }
    useEffect(() => {
        render();
        // eslint-disable-next-line react-hooks/exhaustive-deps 
    }, [id]);

    const transferEmbeddedUrl = (link: string): string => {
        if (!link) { return '' }

        let videoId = link.split('v=')[1];
        const ampersandPosition = videoId.indexOf('&');
        if (ampersandPosition !== -1) {
            videoId = videoId.substring(0, ampersandPosition);
        }

        return `https://www.youtube.com/embed/${videoId}`;
    }

    return (
        <div className="container mt-3">
            {!movieDetail ? <Loading /> :
                <>
                    <h2>{movieDetail.title} -
                        <span className="text-muted">{moment(movieDetail?.releaseDate).format('YYYY')}</span>
                    </h2>

                    Khởi chiếu : {moment(movieDetail.releaseDate).format('DD/MM/YYYY')}
                    {movieDetail?.genres?.map((e, i) =>
                        <Link key={i}
                            to={`/filter?the-loai=${e.id}`}
                            className="btn btn-primary rounded-pill ms-2"
                        >
                            {e.name}
                        </Link>
                    )}

                    <div className="mt-3 d-flex flex-wrap">
                        <span style={{ display: 'inline-block', marginRight: '1rem' }}>
                            <img src={movieDetail.poster}
                                className="rounded-start"
                                style={{ width: '450px', height: '350px' }}
                                alt="poster"
                            />
                        </span>
                        {movieDetail.trailer ? <div>
                            <iframe
                                className="rounded-end"
                                title="youtube-trailer"
                                width="650px"
                                height="350px"
                                src={transferEmbeddedUrl(movieDetail.trailer)}
                                frameBorder={0}
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div> : null}
                    </div>

                </>
            }
        </div>
    );
}