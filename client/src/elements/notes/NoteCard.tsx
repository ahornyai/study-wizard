import Avatar from "../components/Avatar"

import { createAvatar } from '@dicebear/avatars';
import * as style from '@dicebear/avatars-jdenticon-sprites';
import { useTranslation } from "react-i18next";
import { format } from "timeago.js";
import i18n from "../../i18n";
import { useNavigate } from "react-router-dom";
import Note from "../../classes/note";

interface NoteCardProperties {
    note: Note
}

const NoteCard = ({ note } : NoteCardProperties) => {
    const avatar = createAvatar(style, {
        seed: note.author.username,
        dataUri: true
    });
    const { t } = useTranslation()
    const navigate = useNavigate()

    return (
        <div onClick={ () => navigate("/notes/" + note.id) } className="w-72 max-w-full bg-gray-800 rounded-md hover:outline-thickblue outline-zerowidth transition-all ease-in-out duration-200 cursor-pointer">
            <div className="p-6 pb-3 text-gray-200 text-left">
                <h5 className="text-lg font-bold">{ note.title }</h5>
                <p className="text-gray-400">{ t("your-notes.last-update") }: { format(note.updatedAt, i18n.language) }</p>

                <Avatar className="mt-4 inline-block" image={ avatar } size="sm" />
                <span className="ml-2 mt-5 font-semibold absolute">{ note.author.username }</span>
            </div>
        </div>
    )
}

export default NoteCard