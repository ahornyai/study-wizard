import { useTranslation } from "react-i18next"

const Home = () => {
  const { t } = useTranslation()

  return (
    <div className="py-52 text-center text-white">
      <h1 className="text-3xl font-bold">StudyWizard</h1>
      <h2 className="text-2xl">{t('home.description')}</h2>
    </div>
  )
}

export default Home
