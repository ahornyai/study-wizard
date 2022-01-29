import { useTranslation } from "react-i18next"
import { EntryType } from "../../classes/noteEntry"
import Button from "../components/Button"

interface AddNoteCardProps {
  addNoteEntry: (type: EntryType) => void
}

const AddNoteCard = (props: AddNoteCardProps) => {
  const { t } = useTranslation()

  return (
    <div className="bg-gray-800 p-3 pl-5 pr-5 grid grid-cols-2 gap-8 rounded-lg lg:mx-auto">
      <Button onClick={() => props.addNoteEntry(EntryType.NOTE)} text={t("create-note.add-note")} size="sm" />
      <Button onClick={() => props.addNoteEntry(EntryType.DEFINITION)} text={t("create-note.add-definition")} size="sm" />
    </div>
  )
}

export default AddNoteCard