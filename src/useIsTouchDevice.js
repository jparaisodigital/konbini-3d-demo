import { useEffect, useState } from 'react'

export default function useIsTouchDevice() {
  const [isTouchDevice, setIsTouchDevice] = useState(() =>
    window.matchMedia('(pointer: coarse)').matches
  )

  useEffect(() => {
    const media = window.matchMedia('(pointer: coarse)')

    const update = () => {
      setIsTouchDevice(media.matches)
    }

    media.addEventListener('change', update)

    return () => {
      media.removeEventListener('change', update)
    }
  }, [])

  return isTouchDevice
}
