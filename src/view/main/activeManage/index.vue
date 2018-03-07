<template lang="html">
  <!-- <router-view ></router-view> -->
  <div id="activeManage">
    <div class="vhide SNsearch">
      <el-input
      class="tm-s-ipt"
      v-model="param.deviceSn"
      placeholder="vue后台管理系统SN"></el-input>
      <el-input
      class="tm-s-ipt"
      v-model="param.mobileSn"
      placeholder="手机SN"></el-input>
      <!-- <form-select></form-select> -->
    </div>
    <div class="vhide">
      <span class="activeSearchTit">激活时间查询：</span>
      <div class="">
        <el-date-picker
        v-model="time"
        class="stTime"
        :editable="false"
        value-format="yyyy-MM-dd"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"></el-date-picker>
        <!-- <el-date-picker
        :editable="false"
        type="date"
        class="tm-s-ipt"
        prefix-icon="el-icon-bell"
        v-model="param.startTime"
        value-format="yyyy-MM-dd"
        placeholder="开始"></el-date-picker>
        <el-date-picker
        :editable="false"
        value-format="yyyy-MM-dd"
        type="date"
        class="tm-s-ipt"
        v-model="param.endTime"
        placeholder="结束"></el-date-picker> -->
        <el-button
        @click="searchData"
        class=""
        size="small"
        type="primary">查询</el-button>
        <el-button
        @click="reset"
        class=" reset"
        size="small"
        type="info">重置</el-button>
        <div @click="test">测试</div>
        列表
        <input type="text">
        <router-link
        :to="'/main/search2/detail?id=2'">
          详情
        </router-link>
      </div>
    </div>
    <span class="totals">符合查询条件共{{table.pageTotals}}条数据（注：一个vue后台管理系统SN如果被多台手机激活，只会统计一条数据，收取一次费用）</span>

    <!-- <TablePagination></TablePagination> -->
    <table-pagination
    @interface="_interface"
    :table="table"
    :setting='setting'
    :search='search'>

      <el-table-column  label="激活时间"slot="createdTime" >
        <template slot-scope="scope">
            <span @click="click(scope.$index)">删除</span>
        </template>
      </el-table-column>
    </table-pagination>

  </div>
</template>

<script>
import { Obj, Dated } from '@/js/public/tool'

import apis from '@/js/api'
import vue from 'vue';

export default {
  name : 'activeManage',
  data(){
    return {
      time : '',
      setting : {
        url :'',
        //  'http://172.17.13.169:8808/carNet/sc/portal/tachographSn/getSnPage',
        data : {}
      },
      table : {
        pageTotals : 0,
        tableHeader : [
          {prop : 'deviceSn',lable : 'vue后台管理系统SN',width : 180},
          {prop : 'mobileSn',lable : '手机SN',width : 180},
          {prop : 'createdTime',lable : '激活时间'},
        ],
        tableData: [
          // {deviceSn : '123',mobileSn : 'ddd' , createdTime : 'vvccddd'},
          // {deviceSn : '123',mobileSn : 'ddd' , createdTime : 'vvccc'},
        ]
      },
      param : {
        deviceSn : this.$route.query._,
        mobileSn : '',
        startTime : '',
        endTime : ''
      },
      search : false,
    }
  },
  mounted(){

    // console.log(this.$route);
    // document.onkeydown = () => {
    //   if (event.keyCode === 13){
    //     this.searchData()
    //   }
    // }
    // console.log(this.$root.render);
  },
  destroyed(){
    document.onkeydown = null;
  },
  methods : {
    _interface(json,data){
      let res = json.snDtos;
      res.forEach(item => {
        item.createdTime = Dated.getDated(item.createdTime,'YY-MM-DD hh:mm:ss')
      })
      data.push(...res)
    },
    searchData(){
      // let time = this.time || ['',''];
      // Object.assign(this.param,{
      //   startTime : time[0],
      //   endTime : time[1]
      // })
      // this.setting.data = this.param;
      // this.search = !this.search;
    },
    reset(){
      let param = this.param;
      Object.keys(param).forEach(k => param[k] ='');
      this.time ='';
    },
    test(){
      this.$root.routerPush({
        name : 'activeManage',
        query : {_ :'我是新的'}
      })
    }
  }
}
</script>

<style scpoed lang="scss">
#activeManage{
  .tablePagination{
    margin-top: 0!important;
  }
  .activeSearchTit{
    display: block;
    border-top: 1px solid #e8ebf0;
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
}


</style>
