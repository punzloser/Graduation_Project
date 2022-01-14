import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

interface IRating {
    maxValue: number,
    selectedValue: number,
    onChange(rate: number): void
}
export const Rating = (props: IRating) => {
    const [maxValueArr, setMaxValueArr] = useState<number[]>([]);

    useEffect(() => {
        setMaxValueArr(Array(props.maxValue).fill(0));
    }, [props.maxValue])
    return (
        <>
            {maxValueArr.map((_, i) => (
                <FontAwesomeIcon key={i} icon='star' className="fa-lg pointer" />
            ))}
        </>
    );
}

Rating.defaultProps = {
    maxValue: 5
}