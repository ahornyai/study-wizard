import { faTimes } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useRef } from "react"
import { RefObject, useState } from "react"

interface ModalProps {
    title: string
    toggleButton: RefObject<HTMLElement>
    content: React.ReactNode
    footer: React.ReactNode
}

const Modal = ({ title, toggleButton, content, footer }: ModalProps) => {
    const [isOpen, setOpen] = useState(false)
    const modal = useRef<HTMLDivElement>(null)

    useEffect(() => {
        toggleButton.current?.addEventListener("click", () => setOpen(open => !open))
        Array.from(document.getElementsByClassName("modal-close")).forEach(btn => btn.addEventListener("click", () => setOpen(false)))
    }, [toggleButton])

    return (
        <div ref={ modal } className={ "modal " + (isOpen ? "modal-active" : "opacity-0 pointer-events-none")}>
            <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50 modal-close"></div>
            
                <div className="bg-gray-900 w-11/12 md:max-w-md mx-auto rounded-lg shadow-lg z-50 overflow-y-auto">
                    <div className="py-4 text-left px-6">
                        <div className="flex justify-between items-center pb-3">
                            <p className="text-2xl font-bold">{ title }</p>
                            <FontAwesomeIcon className="cursor-pointer z-50 hover:text-gray-300 modal-close" icon={ faTimes } size={"lg"} />
                        </div>

                        { content }

                        <div className="flex justify-end pt-4">
                            { footer }
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default Modal