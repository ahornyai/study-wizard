import CreateNoteEntry from '../components/CreateNoteEntry';

interface CreateNoteCardProps {
    cardType: 'definition' | 'note'
    depth?:number
}

const CreateNoteCard = (props:CreateNoteCardProps) => {
    let isDefinition = props.cardType === 'definition'

    return (
        <div className="bg-gray-800 p-3 flex rounded-lg lg:mx-auto space-x-4 lg:w-1/2">
            <CreateNoteEntry type={ isDefinition ? "term" : "note" } />

            { isDefinition && 
            <span className="font-bold text-green-500 mt-1">│</span>
            }
            
            { isDefinition && 
            <CreateNoteEntry type={ "definition" } />
            }
        </div>
    )
}

export default CreateNoteCard