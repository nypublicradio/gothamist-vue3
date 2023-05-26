export default function useOptinMonster() {
  onMounted(() => {
    const config = useRuntimeConfig()
    if (!process.server && window[`om${config.OPTIN_MONSTER_ACCOUNT_ID}_${config.OPTIN_MONSTER_USER_ID}`]) {
      const optinMonster = window[`om${config.OPTIN_MONSTER_ACCOUNT_ID}_${config.OPTIN_MONSTER_USER_ID}`]
      optinMonster.reset()
      optinMonster.campaigns?.Sessions?.init();
    }
  })
}