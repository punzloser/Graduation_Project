import { Loading } from "./Loading";

interface IGeneralP {
    _list: any,
    displayUI?: React.ReactElement,
    children: React.ReactElement
}

export const GeneralPosterList = (props: IGeneralP) => {
    if (!props._list) {
        if (props.displayUI)
            return props.displayUI
        return <Loading />
    } else if (props._list.length === 0) {
        return <>Danh sách trống ...</>
    } else {
        return props.children
    }
}