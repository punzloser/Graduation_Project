import err from '../../assets/404.png'
import loader from '../../assets/loader.gif'
interface ILoading {
    check?: boolean | false;
}
export const Loading = (props: ILoading) => {
    return props.check ? <img alt='error' src={err}></img> :
        <>
            <img style={{ width: '250px', height: '140px' }} src={loader} alt="loading" />
        </>
}