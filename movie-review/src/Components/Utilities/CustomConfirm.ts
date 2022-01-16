import Swal from "sweetalert2"

export const CustomConfirm = (
    onConfirm: any,
    title: string = 'Xác nhận xóa ?'
) => {
    Swal.fire({
        title: title,
        confirmButtonText: 'Đồng ý',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonText: 'Hủy',
        cancelButtonColor: '#d33'
    })
        .then(result => {
            if (result.isConfirmed) {
                onConfirm();
            }
        })
}