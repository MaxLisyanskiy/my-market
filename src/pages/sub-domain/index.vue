<template>
  <div>
    <h1>subdomain host: {{ this.host }}</h1>
  </div>
</template>

<script>
  export default {
    asyncData({ req }) {
      console.log(req)

      if (process.server) {
        const host = req.headers.host
        return { host }
      }
    },
    data() {
      return {
        host: null,
      }
    },
  }
</script>
