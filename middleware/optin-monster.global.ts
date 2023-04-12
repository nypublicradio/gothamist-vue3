export default defineNuxtRouteMiddleware(() => {
    const config = useRuntimeConfig()

    if (process.client && window[`om${config.OPTIN_MONSTER_ACCOUNT_ID}_${config.OPTIN_MONSTER_USER_ID}`]) {
        window[`om${config.OPTIN_MONSTER_ACCOUNT_ID}_${config.OPTIN_MONSTER_USER_ID}`].reset()
    }
})