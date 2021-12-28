import { useEffect, useState } from "react";

interface IPagination {
    currentPage: number,
    totalOfPages: number,
    onChange(page: number): void,
    radio: number
}

export const Pagination = (props: IPagination) => {

    const [linkModels, setLinkModels] = useState<linkModel[]>([]);
    const selectPage = (link: linkModel) => {
        if (link.page == props.currentPage) {
            return;
        }
        if (!link.enabled) {
            return;
        }
        props.onChange(link.page);
    }
    const getClass = (link: linkModel) => {
        if (link.active) {
            return 'active pointer';
        }
        if (!link.enabled) {
            return 'disabled';
        }
        return 'pointer';
    }

    useEffect(() => {
        const previousPageEnabled = props.currentPage !== 1;
        const previousPage = props.currentPage - 1;
        const links: linkModel[] = [];

        links.push({
            active: false,
            enabled: previousPageEnabled,
            page: previousPage,
            text: 'Trước'
        });

        for (let i = 1; i < props.totalOfPages; i++) {
            if (i >= props.currentPage - props.radio && i <= props.currentPage + props.radio) {
                links.push({
                    active: props.currentPage === i,
                    enabled: true,
                    page: i,
                    text: `${i}`
                });
            }
        }

        const nextPageEnabled = props.currentPage !== props.totalOfPages && props.totalOfPages > 0;
        const nextPage = props.currentPage + 1;

        links.push({
            active: false,
            enabled: nextPageEnabled,
            page: nextPage,
            text: 'Sau'
        });

        setLinkModels(links);
    }, [props.currentPage, props.totalOfPages, props.radio]);

    return (
        <nav>
            <ul className="pagination justify-content-center">
                {linkModels.map((link, i) => (
                    <li key={i} className={`page-item cursor ${getClass(link)}`}
                        onClick={() => selectPage(link)}
                    >
                        <span className="page-link">{link.text}</span>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

Pagination.defaultProps = {
    radio: 3
}

interface linkModel {
    page: number,
    enabled: boolean,
    active: boolean,
    text: string
}