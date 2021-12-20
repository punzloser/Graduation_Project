interface IBtn {
    children: string,
    bgColor?: string,
    onClick?(): void,
    type?: 'button' | 'submit',
    disabled: boolean
}

export const Btn = (props: IBtn) => {
    return (
        <button disabled={props.disabled} type={props.type} onClick={props.onClick} className={props.bgColor}>
            {props.children}
        </button>
    );
}

Btn.defaultProps = {
    bgColor: "btn btn-success",
    type: 'button',
    disabled: false
}
