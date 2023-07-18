import { differenceInMinutes } from 'date-fns';
export default defineEventHandler(async (event) => {
  const UPDATE_INTERVAL_MINUTES = 1
  let temperature: number, iconName:string
  const lastUpdated = await useStorage().getItem('weather:lastUpdated')
  if (lastUpdated) {
    const lastUpdateMinutesAgo = differenceInMinutes(new Date(), new Date(String(lastUpdated)))
    if (lastUpdateMinutesAgo >= UPDATE_INTERVAL_MINUTES) {
      const {data} = await getCurrentWeather()
      temperature = data.temperature
      iconName = data.iconName
      await useStorage().setItem('weather:temperature', temperature)
      await useStorage().setItem('weather:iconName', iconName)
      await useStorage().setItem('weather:lastUpdated', new Date())
    } else {
      temperature = Number(await useStorage().getItem('weather:temperature'))
      iconName = String(await useStorage().getItem('weather:iconName'))  
    }
  } else {
    const {data} = await getCurrentWeather()
    temperature = data.temperature
    iconName = data.iconName
    await useStorage().setItem('weather:temperature', temperature)
    await useStorage().setItem('weather:iconName', iconName)
    await useStorage().setItem('weather:lastUpdated', new Date())
  }
  return {temperature, iconName, lastUpdated}
})

function convertCtoF(temperatureInC:number):number {
  const temperatureInF = (temperatureInC * 9 / 5) + 32
  return Math.round(temperatureInF)
}

function getIconName(iconUrl) {
  //"https://api.weather.gov/icons/land/day/skc?size=medium",
  const iconRegExp = /https:\/\/api.weather.gov\/icons\/land\/(?<time>[a-z]+)\/(?<icon>[a-z]+)+/g
  const matches = iconRegExp.exec(iconUrl)
  const {time, icon} = matches.groups
  const mappings = 
  {
    skc: `${time === 'day' ? 'day-sunny' : 'night-clear'}`,
    few: `${time === 'day' ? 'day-sunny' : 'night-clear'}`,
    sct: `${time}-cloudy`,
    bkn: `${time}-cloudy`,
    ovc: `${time}-cloudy`,
    wind_skc: `${time}-windy`,
    wind_few: `${time}-windy`,
    wind_sct: `${time}-cloudy-windy`,
    wind_bkn: `${time}-cloudy-windy`,
    wind_ovc: `${time}-cloudy-windy`,
    snow: `${time}-snow`,
    rain_snow: `${time}-rain-mix`,
    rain_sleet: `${time}-rain-mix`,
    snow_sleet: `${time}-snow`,
    fzra: `${time}-rain`,
    rain_fzra: `${time}-rain-mix`,
    snow_fzra: `${time}-snow`,
    sleet: `${time}-sleet`,
    rain: `${time}-rain`,
    rain_showers: `${time}-rain`,
    rain_showers_hi: `${time}-rain`,
    tsra: `${time}-thunderstorm`,
    tsra_sct: `${time}-thunderstorm`,
    tornado: 'tornado',
    hurricane: 'hurricane',
    tropical_storm: `${time}-rain-wind`,
    dust: 'dust',
    smoke: 'smoke',
    haze: 'haze',
    hot: 'hot',
    cold: 'snowflake-cold',
    blizzard: `${time}-snow`,
    fog: `${time}-fog`,
  }
  return `wi-${mappings[icon]}`
}
async function getCurrentWeather(station='knyc') {
  const data = await $fetch(`https://api.weather.gov/stations/${station}/observations/latest`)
  const weatherData = {
    temperature: convertCtoF(data.properties.temperature.value),
    iconName: getIconName(data.properties.icon),
  }
  return { data: weatherData }
}