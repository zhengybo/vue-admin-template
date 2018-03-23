<template lang="html">
  <table-pagination
  @interface="_interface"
  :table="table"
  :setting='setting'
  :search='search'>
  </table-pagination>
</template>

<script>
export default {
  name : 'detailList',
  data (){
    return {
      search : false,
      setting : {
        url :'./static/mock/table/age.json',
        data : {
          s1 : '',
          s2 : '',
          s3 : ''
        }
      },
      table : {
        pageTotals : 0,
        tableHeader : [
          {prop : 'number',lable : "数量"},
          {prop : 'age',lable : '年龄',width : 180},
          {prop : 'name',lable : '名字',width : 180},
          {prop : 'act',lable : '操作',width : 180, slot : true}
        ],
        tableData: [
        ]
      },
    }
  },
  created(){
    let { query, name } = this.$route;
    this.$store.dispatch('updateQuery',{ query, name });
  },
  methods : {
    _interface(data){
      // console.log(data);
      this.table.tableData = data.data.map((item) => ({
        name : item.name,
        age : item.age,
        number : item.number
      }))
    }
  }
}
</script>

<style lang="css">
</style>
