<template>
  <div class="header">
    <div class="herder-active">
      <div>1</div>
    </div>
    <div class="nav">
      <div 
        v-for="item in 7"
        :key="item"
        class="nav-title">DEALS</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HEADNOPTION'
}
</script>

<style socped lang="scss">
.nav {
  display: flex;
  background: #150d0f;
  justify-content: center;
  align-content: center;
  .nav-title {
    line-height: 60px;
    color: #bfa69a;
    font-weight: 700;
    font-size: 16px;
    text-transform: uppercase;
    display: flex;
  }
}
</style>
