<template lang="html">
  <div class="">
    这是详情组件
    <table-pagination
    @interface="_interface"
    :table="table"
    :setting='setting'
    :search='search'>
      <el-table-column  label="激活时间" slot="act" >
        <template slot-scope="scope">
          <router-link to="/main/home/detail/list">
            <el-button
            size="small"
            type="primary">列表详情</el-button>
          </router-link>
        </template>
      </el-table-column>
    </table-pagination>

    <el-tabs class="mg-t-20" v-model="tab" type="card" @tab-click="handleClick">
      <el-tab-pane
      v-for="(item,index) in list"
      :key="index"
      :label="item.name"
      :name="item.value"></el-tab-pane>
    </el-tabs>
    <router-view ></router-view>
  </div>
</template>

<script>
export default {

  data(){
    return {
      tab : '',
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
      list : [
        {name : '图1',value : 'chart1',link : '/main/home/detail/chart1'},
        {name : '图2',value : 'chart2',link : '/main/home/detail/chart2'},
        {name : '图3',value : 'chart3',link : '/main/home/detail/chart3'},
      ]
    }
  },
  watch : {
    $route(v){
      console.log(v);
      v.matched.slice(-1).name
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
    handleClick(index,v){
      this.$router.push(
        this.list.find(item => item.value == this.tab).link
      );
    },
    charts(v){

    }
  }
}
</script>

<style lang="css">
.tag-frame{
  justify-content:space-around;
  display:flex;
  padding:0 100px;
}
.chart-title{

  display: inline-block;
  text-align: center;
  width: 80px;
}
</style>
