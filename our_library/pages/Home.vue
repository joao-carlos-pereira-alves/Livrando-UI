<script setup lang="ts">

const response = await useApi('/posts', {
  method: 'post',
  params: {
    "name": "id labore ex et quam laborum",
    "email": "Eliseo@gardner.biz",
    "body": "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium"
  }
})

console.log(response.data)
</script>

<template>
  Test Response: {{ response.data }}
</template>

