import React, { Children } from "react";

interface IStateError {
    hasError: boolean

}

interface IPropsError {
    errMessage: React.ReactNode
}

class FixError extends React.Component<IPropsError, IStateError>{
    constructor(props: IPropsError) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: any) {
        return { hasError: true }
    }

    componentDidCatch(error: any) {
        console.log(error);
    }

    render() {
        if (this.state.hasError) {
            return this.props.errMessage
        }
        return this.props.children;
    }
}

export default FixError;