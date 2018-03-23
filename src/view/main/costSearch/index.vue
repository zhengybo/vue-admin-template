<template lang="html">
  <!-- <router-view ></router-view> -->
  <div class="">
    <div class="hidden">
      <div class="">
        <el-date-picker
        v-model="param.startTime"
        class="stTime"
        :editable="false"
        value-format="yyyy-MM"
        type="month"
        placeholder="开始月份"></el-date-picker>
        <el-date-picker
        v-model="param.endTime"
        value-format="yyyy-MM"
        class="stTime"
        :editable="false"
        type="month"
        placeholder="结束月份"></el-date-picker>
        <el-button
        @click="searchData"

        class="tm-s-btn"
        type="primary">查询</el-button>
        <el-button
        @click="reset"
        class="tm-s-btn reset"
        type="info">重置</el-button>
      </div>
    </div>
    <span class="totals">符合查询条件共{{table.pageTotals}}条数据</span>
    <!-- <TablePagination></TablePagination> -->
    <table-pagination
    @interface="_interface"
    :table="table"
    :setting='setting'
    :search='search'>
    </table-pagination>

  </div>
</template>

<script>
import { Obj, Dated } from '@/js/public/tool'
import apis from '@/js/api'
import vue from 'vue';

export default {
  name : 'costSearch',
  data(){
    return {
      time : '',
      setting : {
        url :'apis.costManage',
        data : {}
      },
      table : {
        pageTotals : 0,
        tableHeader : [
          {prop : 'createdTime',lable : '月份'},
          {prop : 'authCount',lable : '当月设备激活数量',width : 180},
          {prop : 'fee',lable : '当月费用(元)',width : 180}
        ],
        tableData: [
        ]
      },
      param : {
        deviceSn : '',
        mobileSn : '',
        startTime : '',
        endTime : ''
      },
      search : false,
    }
  },
  mounted(){
    document.onkeydown = () => {
      if (event.keyCode === 13){
        this.searchData()
      }
    }
  },
  destroyed(){
    document.onkeydown = null;
  },
  methods : {
    _interface(json,data){
      let res = json.snDtos;
      res.forEach(item => {
        item.createdTime = Dated.getDated(item.createdTime,'YY-MM');
        item.authCount = item.authCount;
        item.fee = item.fee;
      })
      data.push(...res)
    },
    searchData(){
      let param = this.param,
          startTime = param.startTime,
          endTime = param.endTime;
      let errorMsg = ''
      if((!!startTime ^ !!endTime)){
        errorMsg = '开始时间或者结束时间不能单独为空';
      }
      if(Dated.getTime(param.startTime) > Dated.getTime(param.endTime)){
        errorMsg = '开始时间不能大于结束时间';
      }
      if(errorMsg){
        this.$notify.warning({
          title: '提示',
          message: errorMsg
        });
        return;
      }

      this.setting.data = this.param;
      this.search = !this.search;
    },
    reset(){
      let param = this.param;
      Object.keys(param).forEach(k => param[k] ='');
      this.time ='';
    }
  }
}
</script>

<style scpoed lang="scss">
.tablePagination{
  margin-top: 0!important;
}
.activeSearchTit{
  display: block;
  line-height: 50px;
}
.SNsearch{
  margin-bottom: 20px;
}

.stTime{
  margin-right: 20px;
}

.totals{
  display: inline-block;
  line-height: 40px;
  font-size: 16px;

  color: #2b6198;
  font-weight: bold;
}

</style>
