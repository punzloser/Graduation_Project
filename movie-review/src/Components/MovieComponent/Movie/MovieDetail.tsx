import axios, { AxiosResponse } from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link, useParams } from "react-router-dom";
import { movieUrl } from "../../../endpoints";
import { Loading } from "../../Utilities/Loading";
import { movieDTO } from "./IMovie";
import { Map } from './../../Utilities/Map';
import ICoordinate from "../../Utilities/ICoordinate";

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

    const transformCoordinates = (): ICoordinate[] => {
        if (movieDetail?.movieTheaters) {
            const coordinates = movieDetail.movieTheaters.map(e => {
                return { lat: e.latitude, lng: e.longitude, name: e.name } as ICoordinate
            })
            return coordinates;
        }

        return [];
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

                    {!movieDetail.summary ? null :
                        <div className="my-5">
                            <h3>Tóm tắt phim</h3>
                            <div className="d-flex flex-wrap justify-content-center">
                                <ReactMarkdown>{movieDetail.summary}</ReactMarkdown>
                            </div>
                        </div>
                    }

                    {movieDetail.actors && movieDetail.actors.length > 0 ?
                        <div className="my-5">

                            <h3>Diễn viên lồng tiếng</h3>
                            <div className="d-flex">
                                {movieDetail.actors.map((e, i) =>
                                    <div className="d-flex flex-column" key={i}>
                                        <img className="rounded-pill w-25" src={e.picture} alt="pic" />
                                        <span className="font-monospace">{e.name}</span>
                                        <span className="font-monospace">{` .. ${e.character}`}</span>
                                    </div>
                                )}
                            </div>

                        </div> : null
                    }

                    {movieDetail.movieTheaters && movieDetail.movieTheaters.length > 0 ?
                        <div className="my-5">
                            <h3>Rạp đang chiếu</h3>
                            <div className="d-flex justify-content-center">
                                <Map coordinates={transformCoordinates()} zoom={13} readOnly={true} />
                            </div>
                        </div> : null
                    }
                </>
            }
        </div >
    );
}