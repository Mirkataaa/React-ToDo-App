import { useEffect, useRef } from "react"

export default function Modal ({
    isOpen,
    hasCloseBtn = true,
    onClose,
    children
}) {
    const modalRef = useRef(null);

    const HandleCloseModal = () => {
        if(onClose) {
            onClose();
        }
    };

    const handleKeyDown = (e) => {
        if(e.key === 'Escape') {
            HandleCloseModal()
        }
    };

    useEffect(() => {
        const modalElement = modalRef.current;

        if(!modalElement) return;

        if(isOpen) {
            modalElement.showModal();
        }else {
            modalElement.close();
        }
    } , [isOpen])

    return (
        <dialog ref={modalRef} onKeyDown={handleKeyDown} className="modal" >
            {hasCloseBtn && (
                <button className="modal-close-btn" onClick={HandleCloseModal}>
                    Close
                </button>
            )}
            {children}
        </dialog>
    );
}