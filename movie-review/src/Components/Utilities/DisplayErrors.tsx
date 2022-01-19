interface IDisplayErrors {
    errors?: string[]
}

export const DisplayErrors = (props: IDisplayErrors) => {
    return (
        <>
            {!props.errors ? null :
                <ul>
                    {props.errors.map((err, i) => (
                        <li className="text-danger" key={i}>{err}</li>
                    ))}
                </ul>
            }
        </>
    );
}