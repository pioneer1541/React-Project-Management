import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
import Button from "../Button";
const Error = forwardRef(function ({ message, buttonCaption = "Close", ...props }, ref) {
    const dialogRef = useRef();
    useImperativeHandle(ref, () => ({
        open: () => {
            dialogRef.current.showModal();
        },
        close: () => {
            dialog.current.close();
        },
    }));


    return createPortal(
        <dialog ref={dialogRef}  {...props} className="backdrop:bg-stone-900/90 p-4 rounded-md shadow-md">
            <h2 className="text-xl font-bold text-stone-900 my-4">{message}</h2>
            <form method="dialog" className="mt-4 text-right">
                <Button>{buttonCaption}</Button>
            </form>
        </dialog>, document.getElementById("modal-root")
    );
});

export default Error;