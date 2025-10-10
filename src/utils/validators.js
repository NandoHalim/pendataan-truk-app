export const onlyLettersSpaces = (s='') => s.replace(/[^A-Za-z\s]/g, '')
export const alnum6to20 = (s='') => /^[A-Za-z0-9]{6,20}$/.test(s)
export const isPlate = (s='') => s.trim().length >= 6
