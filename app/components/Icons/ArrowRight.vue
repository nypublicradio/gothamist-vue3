<template>
  <div class="arrow-right" />
</template>

<style lang="scss">
.arrow-right {
  position: relative;
  &::before {
    content: url("data:image/svg+xml,%0A%3Csvg width='11' height='10' viewBox='0 0 11 10' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5.584 8.992L8.688 5.92H0.624V4.752H8.704L5.568 1.664L6.368 0.912L10.784 5.328L6.384 9.744L5.584 8.992Z' fill='%23111111'/%3E%3C/svg%3E%0A");
    display: block;
    padding: 0 8px 2px;
    border: solid 1px var(--text-color);
    border-radius: 16px;
    float: left;
  }
}
</style>
