import { useEffect, useState } from 'react'

export default function useAnswer () {
  const [answer, setAnswer] = useState([])

  useEffect(() => {
    function handleUpdateAnswer (e) {
      setAnswer([...answer, e.detail])
    }

    document.addEventListener('updateAnswer', handleUpdateAnswer)

    return () => {
      document.removeEventListener('updateAnswer', handleUpdateAnswer)
    }
  }, [answer])

  return answer
}