<template>
  <div class="position-absolute full-width full-height row justify-center items-center">
    <q-circular-progress indeterminate rounded size="50px" color="white" />
  </div>
</template>

<style>
.position-absolute {
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.1);
}
</style>
