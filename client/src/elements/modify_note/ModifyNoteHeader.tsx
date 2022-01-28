import { t } from "i18next";
import { useEffect, useRef, useState } from "react"
import Note from "../../classes/note";

import Button from "../components/Button"

interface ModifyNoteHeaderProps {
    note?: Note
    className?: string
    handleModifyNote: (title: string) => void
}

const ModifyNoteHeader = ({ note, className = "", handleModifyNote } : ModifyNoteHeaderProps) => {
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
        <div className={ `bg-gray-800 p-3 rounded-lg lg:mx-auto flex flex-wrap space-x-4 lg:w-1/2 justify-center ${className}` }>
            <input defaultValue={ note?.title } min={ 5 } max={ 50 } type="text" placeholder={ t("title") } ref={ titleInput } className="text-input flex-1" />
            <div className="space-x-4 sm:mt-0 mt-2">
                <Button text={ t("import-file") } size="sm" onClick={ () => fileInput.current?.click() } />
                <Button text={ note === undefined ? t("create") : t("edit") } size="sm" onClick={ () => handleModifyNote(titleInput.current?.value || "") } />
            </div>

            <input type="file" ref={ fileInput } onChange={ (e) => {
                const fileList = e.target.files
                
                setSelectedFile(fileList ? fileList[0] : null)
            } } hidden />
        </div>
    )
}

export default ModifyNoteHeader