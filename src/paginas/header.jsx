import React from "react";
import './css.css';



function nada(){
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        title: "NADA?"
      });
}



function base()
{
    return (
        <ol>
            <li onClick={ nada }>API LENTA</li>
            <li onClick={ nada }>nd</li>
            <li onClick={ nada }>nd</li>
            <li onClick={ nada }>nd</li>
            <li onClick={ nada }>nd</li>
            <li onClick={ nada }>nd</li>
        </ol>
    )
}
export default base