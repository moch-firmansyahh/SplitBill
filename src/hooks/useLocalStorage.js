import { useState, useEffect } from 'react'

/**
 * Hook untuk menyimpan dan membaca state dari localStorage
 * @param {string} key - key localStorage
 * @param {*} initialValue - nilai awal jika key belum ada
 * @returns {[*, function]} - [value, setValue]
 */
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue))
    } catch {
      // localStorage penuh atau tidak tersedia, abaikan
    }
  }, [key, storedValue])

  return [storedValue, setStoredValue]
}
