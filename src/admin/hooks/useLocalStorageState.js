import { useEffect, useState } from 'react'

/**
 * A small helper hook that syncs a piece of state to localStorage.
 *
 * @param {string} key localStorage key
 * @param {any} initialValue initial state (used if localStorage is empty)
 */
export function useLocalStorageState(key, initialValue) {
  const [state, setState] = useState(() => {
    if (typeof window === 'undefined') return initialValue
    try {
      const raw = localStorage.getItem(key)
      if (raw === null) return initialValue
      return JSON.parse(raw)
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state))
    } catch {
      // ignore write errors
    }
  }, [key, state])

  return [state, setState]
}
