<template>
  <div class="nypr-logos-bracket flex">
    <LogoNypr />
    <div class="bracket bracket-left" />
    <a href="https://www.wnyc.org/" target="_blank" rel="noopener noreferrer">
      <LogoWnyc />
    </a>
    <a href="/" target="_blank" rel="noopener noreferrer">
      <LogoGothamist />
    </a>
    <a href="https://www.wnycstudios.org/" target="_blank" rel="noopener noreferrer">
      <LogoWnycStudios />
    </a>
    <a
      href="https://www.wnyc.org/series/new-jersey-public-radio/"
      target="_blank" rel="noopener noreferrer"
    >
      <LogoNjpr />
    </a>
    <a href="https://www.wqxr.org/" target="_blank" rel="noopener noreferrer">
      <LogoWqxr />
    </a>
    <a href="https://www.newsounds.org/" target="_blank" rel="noopener noreferrer">
      <LogoNewSounds />
    </a>
    <div class="inline-flex">
      <a href="https://www.thegreenespace.org/" target="_blank" rel="noopener noreferrer">
        <LogoTheGreeneSpace />
      </a>
      <div class="bracket bracket-right ml-3" />
    </div>
  </div>
</template>

<style lang="scss">
.nypr-logos-bracket {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem 1.25rem;
  @include media('<xl') {
    gap: 1rem 0.75rem;
  }
  @include media('<lg') {
    gap: 1rem 1rem;
  }
  @include media('<sm') {
    gap: 1rem 0.65rem;
  }
  svg {
    &.gothamist-logo {
      width: auto;
      height: 16px;
    }
    &.njpr-logo {
      width: auto;
      height: 18px;
    }
    path {
      fill: var(--white);
    }
  }
  .bracket {
    height: 32px;
    width: 8px;
    border: 1px solid var(--black300);
    &.bracket-left {
      border-right: none;
    }
    &.bracket-right {
      border-left: none;
    }
  }
}
</style>
