export type RequirementsType = {
  re: RegExp
  label: string
}

export function getPasswordStrength(
  requirements: RequirementsType[],
  password: string,
) {
  if (!password) return 0
  let multiplier = password.length > 5 ? 0 : 1

  requirements.forEach((requirement: RequirementsType) => {
    if (!requirement.re.test(password)) {
      multiplier += 1
    }
  })

  return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10)
}
