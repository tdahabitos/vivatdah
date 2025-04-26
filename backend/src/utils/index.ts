export const slugValidate = (value: string | null | undefined): true | string => {
  if (!value) return 'Este campo é obrigatório'

  const isValidSlug = /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)

  if (!isValidSlug) {
    return 'O slug deve conter apenas letras minúsculas, números e hífens'
  }

  return true
}
