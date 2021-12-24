import axios, { AxiosResponse } from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { genreDTO } from './IGenre';

export const GenreIndex = () => {

    useEffect(() => {
        axios.get('https://localhost:5001/api/the-loai')
            .then((response: AxiosResponse<genreDTO[]>) => {
                console.log(response.data);
            })
    }, [])

    return (
        <div className="container-fluid">
            <h3 className="text-muted">Thể loại</h3>
            <div className="btn-group">
                <Link className="btn btn-lg btn-primary" to="/the-loai/them">Khởi tạo</Link>
                <Link className="btn btn-lg btn-warning" to="/the-loai/sua">Sửa đổi</Link>
            </div>
        </div>
    );
}