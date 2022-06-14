import React, {useState, forwardRef, useImperativeHandle } from "react"

const Toaster = forwardRef((props, ref) => {
    const [showSnackbar, setShowSnackbar] = useState(false)

    useImperativeHandle(ref, () => ({
        show() {
            setShowSnackbar(true)
        },
    }))
    return (
        <>
            <CToast autohide={true} visible={showSnackbar} color={props.type} style={{ position: "absolute", right: 13, color: "white" }}>
            <div className="d-flex">
                <CToastBody>{props.message}</CToastBody>
                <CToastClose className="me-2 m-auto" white />
            </div>
            </CToast>            
        </>
    )
})