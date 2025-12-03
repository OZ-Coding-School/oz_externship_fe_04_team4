export const formatPhoneNumber = (phoneNumberString: string) => {
  // 숫자 이외의 문자 제거
  const cleanNumber = phoneNumberString.replace(/[^0-9]/g, '')
  let formattedNumber = ''

  if (cleanNumber.length < 4) {
    formattedNumber = cleanNumber
  } else if (cleanNumber.length < 8) {
    formattedNumber = `${cleanNumber.slice(0, 3)}-${cleanNumber.slice(3)}`
  } else if (cleanNumber.length < 11) {
    formattedNumber = `${cleanNumber.slice(0, 3)}-${cleanNumber.slice(3, 7)}-${cleanNumber.slice(7)}`
  } else {
    // 010-xxxx-xxxx 형식 (11자리)
    formattedNumber = `${cleanNumber.slice(0, 3)}-${cleanNumber.slice(3, 7)}-${cleanNumber.slice(7, 11)}`
  }

  return formattedNumber
}
