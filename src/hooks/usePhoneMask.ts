import { type ChangeEvent, useState } from 'react'

/**
 * usePhoneMask — aplica máscara de telefone brasileiro (XX) XXXXX-XXXX
 * no onChange de um input.
 */
export function usePhoneMask(initial = '') {
  const [value, setValue] = useState(initial)

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    let v = e.target.value.replace(/\D/g, '')
    if (v.length > 11) v = v.slice(0, 11)

    if (v.length > 6) {
      v = `(${v.slice(0, 2)}) ${v.slice(2, 7)}-${v.slice(7)}`
    } else if (v.length > 2) {
      v = `(${v.slice(0, 2)}) ${v.slice(2)}`
    }

    setValue(v)
  }

  function reset() {
    setValue('')
  }

  return { value, onChange, reset }
}
