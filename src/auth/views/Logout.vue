<template>
  <div></div>
</template>

<script>
export default {
  name: 'Logout',
  created() {
    this.$store.dispatch('destroyToken')
      .then(() => {
        this.$router.push({ name: 'index' });
      })
      .catch(() => {
        this.$router.push({ name: 'index' });
      });
  },
};
</script>
