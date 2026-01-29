import { useEffect, useState } from "react"

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined)

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 768px)")
    
    function onChange(e: MediaQueryListEvent) {
      setIsMobile(e.matches)
    }

    mql.addEventListener("change", onChange)
    setIsMobile(mql.matches)

    return () => mql.removeEventListener("change", onChange)
  }, [])

  return isMobile ?? false
}
