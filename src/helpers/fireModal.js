import Swal from "sweetalert2";

export const fireModal = ({ title = '', text = '', icon = 'error' }) => {
    Swal.fire({
        title,
        html: text,
        icon,
        background: 'rgb(64 64 64)',
        color: '#fff',
    });
};