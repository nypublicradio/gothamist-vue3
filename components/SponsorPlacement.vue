<template>
    <div class="sponsor-placement flex mb-3">
        <div class="sponsor-placement-logo pr-3">
            <img alt="GrubHub Logo" 
            src="/grubhub-circle.png"
            srcset="/grubhub-circle.png, /grubhub-circle2x.png 2x, /grubhub-circle4x.png 4x"
            width=64
            height=64
            />
        </div>
        <div class="sponsor-placement-details flex flex-column">
        <p>Sponsored by</p>
        <p class="sponsor-name">Grubhub</p>
        <p>a proud supporter of Gothamist</p>
        </div>
    </div>
</template>
<style lang="scss">
    .sponsor-placement p {
        font-family: var(--font-family-header);
        font-size: var(--font-size-5);
        line-height: 1.5;
    }
    .sponsor-name {
        font-weight: bold;
    }
</style>