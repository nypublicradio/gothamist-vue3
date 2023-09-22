export default function useOptinMonster() {
  const config = useRuntimeConfig()
  useHead({
    script: [{
      children:
      `document.addEventListener('om.Scripts.init', function(event) {
        event.detail.Scripts.enabled.fonts = false;
      })`
    }],
    style: [{
      children: `html div#om-${config.public.OPTIN_MONSTER_USER_ID} .gothamist-sans-serif
      { font-family:'Haffer SQ, sans-serif !important; }
      html div#om-${config.public.OPTIN_MONSTER_USER_ID} .gothamist-sans-serif-bold
      { font-family:'Haffer SQ SemiBold, sans-serif !important;
        font-weight: 600 !important; }
      html div#om-${config.public.OPTIN_MONSTER_USER_ID} .gothamist-serif
      { font-family:'Reckless Neue, serif !important; }`
    }]
  })
  onMounted(() => {
    if (!process.server && window[`om${config.public.OPTIN_MONSTER_ACCOUNT_ID}_${config.public.OPTIN_MONSTER_USER_ID}`]) {
      const optinMonster = window[`om${config.public.OPTIN_MONSTER_ACCOUNT_ID}_${config.public.OPTIN_MONSTER_USER_ID}`]
      optinMonster.reset()
      optinMonster.campaigns?.Sessions?.init()
    }
  })
}
