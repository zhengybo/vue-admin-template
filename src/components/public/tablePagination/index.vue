
<template lang="html">
  <div class="tablePagination">
    <el-table
      border
      v-loading="loading"
      :empty-text="nodata"
      :data="table.tableData"
      style="width: 100%">
      <template  v-for="(item ,index) in table.tableHeader">
        <el-table-column
          v-if="!item.slot"
          :key="index"
          :prop="item.prop"
          :label="item.lable">
        </el-table-column>
        <slot :name="item.prop" v-else></slot>
      </template>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="defaultParam.currPage"
      :page-sizes="[10, 20, 50]"
      :page-size="defaultParam.pageSize"
      :total="table.pageTotals"
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
  </div>
</template>

<script>
import {Obj} from '@/js/public/tool'
export default {
  props : {
    search : {
      type : Boolean,
      default : false
    },
    defaultParam : {
      type : Object,
      default(){
        return {
          pageSize : 10,
          currPage : 1,
        } //默认参数
      }
    },
    setting : {
      type : Object,
      default(){
        return {
          url : '',
          type : 'GET',
          data : {}
        }
      }
    },
    table : {
      type : Object,
      default(){
        return {
          pageTotals : 0,
          tableHeader : [],
          tableData: []
        }
      }
    },
    alias : { //配置接手传递参数
      type : Object,
      default(){
        return {
          pageTotals : 'totalRows',
          currPage : 'currPage',
          pageSize : 'pageSize'
        }
      }
    }
  },
  watch : {
    search(){
      this.defaultParam.currPage =1;
      this.getData();
    },
    // 'table.tableData' : function(){
    //
    // }
  },
  computed : {

  },
  data() {
    return {
      loading : false,
      flag : true, //第一次加载
      nodata : '　',
      exist : [] //记录 请求 引用
    }
  },

  created(){
    Obj.cover(this.table,{
      pageTotals : 0,
      tableHeader : [],
      tableData: []
    })
    this.getData();
  },
  mounted(){
    this.$on('interface',function(abc){

    })
  },

  methods: {
    handleSizeChange(val) {
      this.defaultParam.currPage =1;
      this.defaultParam.pageSize = val;
      this.getData()
      // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.defaultParam.currPage = val;
      // console.log(`当前页: ${val}`);
      this.getData()
    },
    getData(){
      let setting = this.setting,
          flag = this.flag,
          defaultParam = this.defaultParam;
      this.loading = true;
      this.$root.$http({
        url :setting.url,
        type : setting.type || 'GET',
        data : {
          ...defaultParam,
          ...setting.data
        },
        publicFn : () => {
          if(flag){
            this.nodata = '暂无数据';
            this.flag = false;
          }
          this.loading = false
        },
        success : (json) => {
          this.table.tableData.length = 0;
          this.table.pageTotals = json.totalRows
          this.$emit('interface',json,this.table.tableData)

        },
        fail : (json) => {
          this.$emit('fail',json)
        },
        catchFn : () => {
          this.nodata = '网络异常 请刷新或重新请求';
        },
        notify : setting.notify
      },this.exist)
    }
  }
}
</script>

<style lang="scss">

.tablePagination{
  margin-top: 20px;
  padding:10px 15px;
  border: 1px solid #e6ebf5;
  .el-pagination{
    text-align: center;
  }
  //  自带border貌似 会延迟1s才出来
  > .el-table{
    border-top:1px solid #e6ebf5;
    border-left:1px solid #e6ebf5;
  }
}

</style>
