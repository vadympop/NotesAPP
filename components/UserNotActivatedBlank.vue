<template>
  <div class="blank">
    Your account isn't activated! View activation mail in your email
  </div>
</template>

<script>
export default {
  name: 'UserNotActivatedBlank'
}
</script>

<style scoped>
.blank {
  background-color: var(--yellow);
  text-align: center;
  color: var(--dark-gray);
  font-weight: 500;
  font-size: 0.9em;
  padding: 5px 0;
}
</style>
