import React, { useEffect } from 'react'

export default function useGraphEvent (type) {
  useEffect(() => {
    function handleEvent (e) {

    }

    document.addEventListener(type, handleEvent)

    return () => {
      document.removeEventListener(type, handleEvent)
    }
  }, [type])

  return answer
}