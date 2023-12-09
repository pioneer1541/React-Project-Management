import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
import Button from "./Button";
const Modal = forwardRef(function ({ children, buttonCaption = "Close", ...props }, ref) {
    const dialogRef = useRef();
    let isComfirmed = "";
    useImperativeHandle(ref, () => ({
        open: () => {
            dialogRef.current.showModal();
        }
    }));


    return createPortal(
        <dialog ref={dialogRef}  {...props} className="backdrop:bg-stone-900/90 p-4 rounded-md shadow-md">
            {children}
            <form className="mt-4 text-right">
                <Button>{buttonCaption}</Button>
            </form>
        </dialog>, document.getElementById("modal-root")
    );
});

export default Modal;