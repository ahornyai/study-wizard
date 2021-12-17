import Avatar from "../components/Avatar"

import { createAvatar } from '@dicebear/avatars';
import * as style from '@dicebear/avatars-jdenticon-sprites';

interface NoteCardProperties {
    title: string,
    definitions: number,
    author: string
}

const NoteCard = (props:NoteCardProperties) => {
    let avatar = createAvatar(style, {
        seed: props.author,
        dataUri: true
    });

    return (
        <div className="w-72 max-w-full bg-gray-800 rounded-md hover:outline-thickblue outline-zerowidth transition-all ease-in-out duration-200 cursor-pointer">
            <div className="p-6 pb-3 text-gray-200 text-left">
                <h5 className="text-lg font-bold">{ props.title }</h5>
                <p className="text-gray-400">{ props.definitions } sus towns</p>

                <Avatar className="mt-4 inline-block" image={ avatar } size="sm" />
                <span className="ml-2 mt-5 font-semibold absolute">{ props.author }</span>
            </div>
        </div>
    )
}

export default NoteCard