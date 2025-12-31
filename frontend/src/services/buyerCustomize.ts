export type CustomizeState = {
  ip?: string
  prompt?: string
  imageDataUrl?: string
  carrier?: string
  styleTags?: string[]
  material?: string
  finish?: string
  price?: number
}

const STORAGE_KEY = 'buyer_customize_state'

export const getCustomizeState = (): CustomizeState => {
  if (typeof localStorage === 'undefined') return {}
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return {}
  try {
    return JSON.parse(raw) as CustomizeState
  } catch {
    return {}
  }
}

export const saveCustomizeState = (next: CustomizeState) => {
  if (typeof localStorage === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
}

export const updateCustomizeState = (partial: CustomizeState) => {
  const current = getCustomizeState()
  saveCustomizeState({ ...current, ...partial })
}

export const clearCustomizeState = () => {
  if (typeof localStorage === 'undefined') return
  localStorage.removeItem(STORAGE_KEY)
}
