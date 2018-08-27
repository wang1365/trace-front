<template>
  <el-table
    :data="items"
    stripe>
    <el-table-column prop="a" label="A"/>
    <el-table-column prop="b" label="B"/>
  </el-table>
</template>

<script>
export default {
  name: 'QualityReport',
  data() {
    return { items: [{ a: 1, b: 11 }, { a: 3, b: 22 }, { a: 4, b: 33 }] }
  }
}
</script>

<style scoped>

</style>
