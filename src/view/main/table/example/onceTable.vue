<template lang="html">
  <div class="">
    <input type="text" name="" value="xxxxxxxuuuuuu">
  </div>
  <!-- <div class="">
    <div class="">
      一次性表格
    </div>
    <fix-table-pagination
    @interface="_interface"
    :table="table"
    :setting='setting'>
      <el-table-column  label="激活时间" slot="name" >
        <template slot-scope="scope">
          <el-tag>{{scope.row.name}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column  label="激活时间" slot="act" >
        <template slot-scope="scope">
          <el-button
          size="small"
          type="primary">按钮</el-button>
        </template>
      </el-table-column>
    </fix-table-pagination>
  </div> -->
</template>

<script>
export default {
  name : "onceTable",
  data(){
    return {
      setting : {
        url :'./static/mock/table/name.json',
        data : {
          s1 : '',
          s2 : '',
          s3 : ''
        }
      },
      table : {
        tableHeader : [
          {prop : 'number',lable : "数量"},
          {prop : 'age',lable : '年龄',width : 180},
          {prop : 'name',lable : '名字',width : 180,slot : true},
          {prop : 'act',lable : '操作',width : 180, slot : true}
        ],
        tableData: []
      },
    }
  },
  methods : {
    _interface(data){
      // console.log(data);
      this.table.tableData = data.data.map((item) => ({
        name : item.name,
        age : item.age,
        number : item.number
      }))
    },
  }
}
</script>

<style lang="css">
</style>
