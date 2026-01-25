import React from 'react'
import { Bounce, ToastContainer } from 'react-toastify'

function layout({ children }: { children: React.ReactNode }) {
    <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
    />


    return (
        <>
            {children}
        </>

    )
}

export default layout