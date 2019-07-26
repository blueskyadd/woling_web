<template>
    <div class="member_table_list">
      <el-table
        v-loading='$parent.isLoading'
        ref="filterTable"
        :data="tableData"
        style="width: 100%">
        <el-table-column width="100%" prop="date" type='index' :index="$parent.setIndex" label="序号"></el-table-column>
        <el-table-column
          prop="name"
          label="课程名称">
        </el-table-column>
        <el-table-column
          prop="num"
          label="数量">
        </el-table-column>
        <el-table-column
          prop="money"
          label="价格 ">
        </el-table-column>
      </el-table>
    </div>
</template>
<script>
export default {
    props:{
        tableData:{
            type: Array,
            request: true
        }
    }
}
</script>
<style lang="scss" scoped>

</style>
