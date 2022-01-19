import axios, { AxiosResponse } from "axios";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link, useParams } from "react-router-dom";
import { movieUrl, ratingUrl } from "../../../endpoints";
import { Loading } from "../../Utilities/Loading";
import { movieDTO } from "./IMovie";
import { Map } from './../../Utilities/Map';
import ICoordinate from "../../Utilities/ICoordinate";
import { Rating } from "../../Utilities/Rating";
import Swal from "sweetalert2";
import './MovieDetail.css';

export const MovieDetail = () => {
    const [movieDetail, setMovieDetail] = useState<movieDTO>();
    const { id }: any = useParams();
    const isMountedRef = useRef(false);

    const render = async () => {
        await axios.get(`${movieUrl}/${id}`)
            .then((response: AxiosResponse<movieDTO>) => {
                if (isMountedRef.current) {
                    setMovieDetail(response.data);
                }
            })
    }
    useEffect(() => {
        isMountedRef.current = true;
        render();
        return () => { isMountedRef.current = false }
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

    const handleRate = (rate: number) => {
        axios.post(ratingUrl, { rateStar: rate, movieId: id })
            .then(() => {
                Swal.fire({
                    title: 'Đánh giá thành công !',
                    timer: 1500,
                    showConfirmButton: false,
                    icon: 'success'
                })
            })
            .then(() => render());
    }

    return (
        <div className="container mt-3">
            {!movieDetail ? <Loading /> :
                <>
                    <h2>{movieDetail.title} -
                        <span className="text-muted">{moment(movieDetail?.releaseDate).format('YYYY')}</span>
                    </h2>

                    <div className="d-flex justify-content-between my-3">
                        <h5>Đánh giá
                            <div>
                                <Rating selectedValue={movieDetail.rateUser} onChange={handleRate} />
                            </div>
                        </h5>
                        <p className="border badge text-wrap text-muted text-info fst-italic">
                            Tổng lượt bình chọn : {movieDetail.totalOfVote}
                        </p>
                        <p className="border badge text-wrap text-muted text-info fst-italic">
                            Trung bình sao : {movieDetail.starRateAverage}
                        </p>
                    </div>

                    Khởi chiếu : {moment(movieDetail.releaseDate).format('DD/MM/YYYY')}
                    {movieDetail?.genres?.map((e, i) =>
                        <Link key={i}
                            to={`/filter?the-loai=${e.id}`}
                            className="btn btn-primary rounded-pill ms-2 my-1"
                        >
                            {e.name}
                        </Link>
                    )}

                    <section className="row">

                        <div className="col py-3">
                            <div className="clearfix">
                                <img
                                    src={movieDetail.poster}
                                    className="me-2 col-md-4 mb-3 ms-md-3 rounded float-sm-start" alt="pic"
                                    style={{ width: '350px', maxHeight: '400px' }}
                                />

                                <h3>Tóm tắt phim</h3>
                                {!movieDetail.summary ? null :
                                    <ReactMarkdown>{movieDetail.summary}</ReactMarkdown>
                                }
                            </div>
                        </div>
                    </section>

                    {movieDetail.trailer ?
                        <div className="video-wrapper">
                            <iframe
                                className="rounded-end responsive-iframe"
                                title="youtube-trailer"
                                width="650px"
                                height="350px"
                                src={transferEmbeddedUrl(movieDetail.trailer)}
                                frameBorder={0}
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div> : null}

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