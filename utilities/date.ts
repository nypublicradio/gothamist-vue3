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
export const formatDateForByline = function (date) {
  if (date) {
    const dateObject = new Date(date)
    const now = new Date()
    const shortDate = format(dateObject, 'MMM d, y')
    const longDate = format(dateObject, "MMM d, y 'at' h:mm aaaa")
    return differenceInHours(now, dateObject) <= 12 ? longDate : shortDate
  }
  return null
}

// formats a date in the format of ShortMonthName DD, YYYY
export const isMoreThanFrequencyHoursAgo = (date, frequency) => {
  const frequencyHrInMs = Number(frequency) * 60 * 60 * 1000
  const frequencyHoursAgo = Date.now() - frequencyHrInMs
  return Number(date) < frequencyHoursAgo
}