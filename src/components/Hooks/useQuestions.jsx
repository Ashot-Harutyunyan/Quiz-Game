import { useEffect, useState } from "react"
import { fetchQuestions } from "../../firebase/firebase"

function getRandomQuestions(arr, count = 5) {
  if (!Array.isArray(arr) || arr.length === 0) return []
  const shuffled = [...arr]

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }

  return shuffled.slice(0, Math.min(count, arr.length))
}

export function useQuestions(enabled = false) {
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!enabled) return

    let mounted = true
    setLoading(true)
    setError(null)

    async function load() {
      try {
        const data = await fetchQuestions()
        if (mounted) {
          const questions = await getRandomQuestions(data)
          setQuestions(questions)
        }
      } catch (err) {
        if (!mounted) return
        const firebaseCode = err?.code

        if (firebaseCode === "unavailable") setError("No connection to the Firestore server")
        else if (firebaseCode === "permission-denied") setError("Unable to access Firestore data")
        else setError(err?.message || "Loading error")
      } finally {
        if (mounted) setLoading(false)
      }
    }

    load()
    return () => { mounted = false }

  }, [enabled])

  return { questions, loading, error }
}