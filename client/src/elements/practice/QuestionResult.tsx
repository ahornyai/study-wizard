import { t } from "i18next"
import Button from "../components/Button"

interface QuestionResultProperties {
  question: string
  correct: boolean
}

const QuestionResult = ({ question, correct }: QuestionResultProperties) => {
  return (
    <>
      <div className="flex flex-wrap break-all">
        <h1 className="text-3xl font-bold text-green-400 flex-1">{question}</h1>
      </div>
      <hr className="border-gray-500 my-3" />
      <div className="w-full flex space-x-3">
        <p className="text-xl text-cyan-500">Correct answer! Good job!</p>
      </div>
    </>
  )
}

export default QuestionResult