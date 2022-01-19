interface IRecordsFilter {
    onChange(recordsPerPage: number): void
}

export const RecordsFilter = (props: IRecordsFilter) => {
    return (
        <div style={{ width: "150px" }}>
            <label className="text-info">Nhóm bản ghi</label>
            <select
                className="form-control"
                onChange={e => {
                    props.onChange(parseInt(e.currentTarget.value, 10));
                }}
            >
                <option value={2}></option>
                <option value={1}>1</option>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
            </select>
        </div>
    );
}