import { t } from "i18next";
import { useEffect, useRef, useState } from "react"

import Button from "../components/Button"

interface CreateNoteHeaderProps {
    className?: string
    handleCreateNote: (title: string) => void
}

const CreateNoteHeader = ({ className = "", handleCreateNote } : CreateNoteHeaderProps) => {
    const titleInput = useRef<HTMLInputElement>(null)
    const fileInput = useRef<HTMLInputElement>(null)
    const [selectedFile, setSelectedFile] = useState<File|null>(null)
    const fileReader = new FileReader()
        
    fileReader.onloadend = () => {
        console.log(fileReader.result)
    }

    useEffect(() => {
        if (!selectedFile)
            return

        fileReader.readAsText(selectedFile)
    })

    return (
        <div className={ `bg-gray-800 p-3 rounded-lg lg:mx-auto flex flex-wrap space-x-4 lg:w-1/2 ${className}` }>
            <input type="text" placeholder={ t("title") } ref={ titleInput } className="text-input flex-1" />
            <Button text={ t("upload-file") } size="sm" onClick={ () => fileInput.current?.click() } />
            <Button text={ t("create") } size="sm" onClick={ () => handleCreateNote(titleInput.current?.value || "") } />

            <input type="file" ref={ fileInput } onChange={ (e) => {
                const fileList = e.target.files
                
                setSelectedFile(fileList ? fileList[0] : null)
            } } hidden />
        </div>
    )
}

export default CreateNoteHeader