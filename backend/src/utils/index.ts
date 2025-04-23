export const slugValidate = (value: string) => {
  const isRequired = Boolean(value)
  const isValidSlug = /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)

  if (!isRequired) {
    return 'Este campo é obrigatório'
  }

  if (!isValidSlug) {
    return 'O slug deve conter apenas letras minúsculas, números e hífens'
  }

  return true
}
