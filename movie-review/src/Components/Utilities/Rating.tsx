import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthenContext } from "../Security/AuthenContext";
import './Rating.css';

interface IRating {
    maxValue: number,
    selectedValue: number,
    onChange(rate: number): void
}
export const Rating = (props: IRating) => {

    const [maxValueArr, setMaxValueArr] = useState<number[]>([]);
    const [selectedValue, setSelectedValue] = useState(props.selectedValue);
    const { claims } = useContext(AuthenContext);

    useEffect(() => {
        setMaxValueArr(Array(props.maxValue).fill(0));
    }, [props.maxValue])

    const handleMouseOver = (rate: number) => {
        setSelectedValue(rate);
    }

    const handleOnClick = (rate: number) => {
        const isAnyLogging = claims.length >= 1;

        if (isAnyLogging) {
            setSelectedValue(rate);
            props.onChange(rate);
            // console.log(selectedValue)
        } else {
            Swal.fire({
                title: 'Lỗi',
                timer: 3000,
                icon: 'error',
                confirmButtonText: 'Hủy bỏ',
                html:
                    `Bạn cần <a href="${window.location.origin}/dang-nhap">Đăng nhập</a> để đánh giá`
            })
        }
    }
    return (
        <>
            {maxValueArr.map((_, i) => (
                <FontAwesomeIcon key={i} icon='star'
                    className={`fa-lg pointer ${selectedValue >= i + 1 ? 'checked' : null}`}
                    onMouseOver={() => handleMouseOver(i + 1)}
                    onClick={() => handleOnClick(i + 1)}
                />
            ))}
        </>
    );
}

Rating.defaultProps = {
    maxValue: 5
}