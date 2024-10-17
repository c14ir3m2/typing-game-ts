
import Results from "./components/Results"
import RestartButton from "./components/RestartButton"
import useEngine, { State } from "./hooks/useEngine"
import { calculatedAccuracy } from "./utils/helpers"
import ChooseTime from "./components/ChooseTime.tsx"
import { Toaster } from "react-hot-toast"
import { useState } from "react"
import GeneratedWords from "./components/GeneratedWords"
import UserTypings from "./components/UserTypings.tsx";

const App = () => {
  const {
    state,
    words,
    timeLeft,
    typed,
    totalTyped,
    errors,
    restart,
    setCountdownSeconds,
  } = useEngine()

  const [selectedTime, setSelectedTime] = useState(0)

  return (
    <>
      <Toaster />
      <CountdownTimer
        setSelectedTime={setSelectedTime}
        timeLeft={timeLeft}
        state={state}
        setCountdownTime={(time) => {
          setCountdownSeconds(time)
        }}
      />

      <WordsContainer>
        <GeneratedWords key={words} words={words} />
        {/* User typed characters will be overlayed over the generated words */}
        <UserTypings
          className="absolute inset-0"
          words={words}
          userInput={typed}
        />
      </WordsContainer>
      <RestartButton
        className="mx-auto mt-10 text-slate-500"
        onRestart={() => restart()}
      />
      <Results
        className="mt-10"
        state={state}
        errors={errors}
        totalTime={selectedTime}
        accuracyPercentage={calculatedAccuracy(totalTyped, errors)}
        total={totalTyped}
      />
    </>
  )
}

const WordsContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative text-3xl max-w-xl leading-relaxed break-all mt-3 align-justify">
      {children}
    </div>
  )
}

const CountdownTimer = ({
  timeLeft,
  state,
  setCountdownTime,
  setSelectedTime,
}: {
  timeLeft: number
  state: State
  setCountdownTime: (time: number) => void
  setSelectedTime: (time: number) => void
}) => {
  const handleTimeChose = (time: number) => {
    setCountdownTime(time)
    setSelectedTime(time)
  }
  if (state == "start") {
    return <ChooseTime onTimeChose={handleTimeChose} />
  } else {
    return (
      <h2 className="dark:text-primary-400 text-green-600 font-medium">
        Time: {timeLeft}
      </h2>
    )
  }
}

export default App