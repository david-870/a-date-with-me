import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import AnimatedBackground from './components/AnimatedBackground'
import LandingPage from './components/LandingPage'
import QuestionPage from './components/QuestionPage'
import CelebrationPage from './components/CelebrationPage'
import DatePlanningForm from './components/DatePlanningForm'
import ConfirmationScreen from './components/ConfirmationScreen'
import type { DateDetails, Screen } from './types'
import { saveDateDetails } from './utils/storage'

function App() {
  const [screen, setScreen] = useState<Screen>('landing')
  const [dateDetails, setDateDetails] = useState<DateDetails | null>(null)

  const handleFormSubmit = (details: DateDetails) => {
    saveDateDetails(details)
    setDateDetails(details)
    setScreen('confirmation')
  }

  return (
    <div className="relative min-h-dvh">
      <AnimatedBackground />

      <AnimatePresence mode="wait">
        {screen === 'landing' && (
          <LandingPage key="landing" onContinue={() => setScreen('question')} />
        )}
        {screen === 'question' && (
          <QuestionPage key="question" onYes={() => setScreen('celebration')} />
        )}
        {screen === 'celebration' && (
          <CelebrationPage
            key="celebration"
            onContinue={() => setScreen('planning')}
          />
        )}
        {screen === 'planning' && (
          <DatePlanningForm key="planning" onSubmit={handleFormSubmit} />
        )}
        {screen === 'confirmation' && dateDetails && (
          <ConfirmationScreen key="confirmation" details={dateDetails} />
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
