import { format, differenceInMinutes, differenceInHours, getYear, isValid } from 'date-fns'

export const fuzzyDateTime = function (time: Date): string {
  const JUST_NOW = 'Just now'
  const TIMESTAMP_FORMAT = 'MMM d, yyyy h:mm a'
  const TIMESTAMP_FORMAT_NO_YEAR = 'MMM d, h:mm a'
  if (!isValid(time)) {
    return null
  }
  const now = new Date()
  const minutes = differenceInMinutes(now, time)
  const hours = differenceInHours(now, time)
  if (minutes <= 5) {
    return JUST_NOW
  } else if (minutes > 5 && hours < 1) {
    return `${minutes} mins ago`
  } else if (hours < 24) {
    return `${hours} hour${hours > 1 ? 's' : ''} ago`
  } else if (getYear(time) === getYear(now)) {
    return format(time, TIMESTAMP_FORMAT_NO_YEAR)
  } else {
    return format(time, TIMESTAMP_FORMAT)
  }
}

// formats a date in the format of ShortMonthName DD, YYYY
export const formatDateAndTime = function (date) {
  if (!date) return null
  const formattedDate = new Date(date)
  const day = formattedDate.getDate()
  const month = formattedDate.toLocaleString('default', { month: 'short' })
  const year = formattedDate.getFullYear()
  const hours = formattedDate.getHours()
  const minutes = formattedDate.getMinutes()
  var suffix = hour >= 12 ? "pm" : "am";
  var hour = ((hours + 11) % 12 + 1)
  return `${month} ${day}, ${year} at ${hour}:${minutes}${suffix}`
}