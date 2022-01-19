import { accountUrl } from "../../endpoints";
import Index from "../Entities/Index";
import { UserDTO } from "./IAuth";
import { Btn } from './../Utilities/Btn'
import { CustomConfirm } from "../Utilities/CustomConfirm";
import axios from "axios";
import Swal from "sweetalert2";

export const UserIndex = () => {

    const delUser = async (id: string) => {
        await axios.delete(`${accountUrl}/removeuser?id=${id}`);
    }

    const handleAsign = (id: string, urlAction: string) => {

        axios({
            method: 'post',
            url: `${accountUrl}/${urlAction}`,
            data: JSON.stringify(id),
            headers: { 'Content-Type': 'application/json' }
        });

        Swal.fire({
            title: 'Thành công !',
            timer: 1000,
            showConfirmButton: false,
            icon: 'success'
        });
    }

    const addAsignUser = async (id: string) => {
        await handleAsign(id, "setadmin")
    }

    const removeAsignUser = async (id: string) => {
        await handleAsign(id, "removeadmin")
    }
    return (
        <>
            <Index<UserDTO>
                urlBase={`${accountUrl}/listuser`}
                title="Tài khoản"
            >
                {users => (
                    <>
                        <thead>
                            <tr>
                                <td></td>
                                <td>Email tài khoản</td>
                                <td>Trạng thái</td>
                                <td>Gán quyền Admin</td>
                                <td></td>
                            </tr>
                        </thead>
                        <tbody>
                            {users?.map((e, i) => (
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>{e.email}</td>
                                    <td>{e.isAdmin ? 'Quản trị viên' : 'Khách'}</td>
                                    <td>
                                        {
                                            e.isAdmin ?
                                                <Btn
                                                    bgColor="btn btn-warning"
                                                    children="Hủy quyền"
                                                    onClick={() => {
                                                        CustomConfirm(() => {
                                                            removeAsignUser(e.id);
                                                            setTimeout(() => window.location.reload(), 1000);
                                                        }, `Xóa quyền quản trị ${e.email} ?`)
                                                    }}
                                                /> :
                                                <Btn
                                                    children="Gán quyền"
                                                    onClick={() => {
                                                        CustomConfirm(() => {
                                                            addAsignUser(e.id);
                                                            setTimeout(() => window.location.reload(), 1000);
                                                        }, `Chọn ${e.email} làm quản trị ?`)
                                                    }}
                                                />
                                        }
                                    </td>
                                    <td>
                                        <Btn
                                            bgColor="btn btn-lg btn-danger"
                                            children="Xóa tài khoản"
                                            onClick={() => CustomConfirm(() => {
                                                delUser(e.id);
                                                setTimeout(() => window.location.reload(), 1000);
                                            }, `Đồng ý xóa tài khoản ${e.email} này ?`)}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </>
                )}

            </Index>
        </>
    );
}