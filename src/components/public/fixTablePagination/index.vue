
<template lang="html">
  <div class="fix-tablePagination">
    <el-table
      border
      v-loading="loading"
      :empty-text="nodata"
      :data="showData"
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
      :current-page="currPage"
      :page-sizes="[10, 20, 50]"
      :page-size="pageSize"
      :total="table.pageTotals"
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
  </div>
</template>

<script>
import {Obj} from '@/js/public/tool'
export default {
  props : {
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
  computed : {

  },
  data() {
    return {
      loading : false,
      nodata : '　',
      pageSize : 10,
      currPage : 1,
      showData : []
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
  methods: {
    handleSizeChange(val) {
      let lastPage = this.currPage;
      this.currPage = 1;
      this.pageSize = val;
      if(lastPage == 1) this.getPageData();
      // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currPage = val;
      this.getPageData();
    },
    getPageData(){
      let start = this.pageSize * (this.currPage -1),
          tableData = this.table.tableData,
          allLength = tableData.length,
          end = (this.pageSize + start),
          tmp = [];
      end = end > allLength ? allLength : end ;
      tmp = tableData.slice(start,end);
      this.showData = tmp;
    },
    getData(){
      let setting = this.setting,
          flag = this.flag;
      this.loading = true;
      this.$root.$https([{
        url :setting.url,
        type : setting.type || 'GET',
        data : {
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
          this.$emit('interface',json,this.table);
          this.table.pageTotals = this.table.tableData.length;
          this.getPageData();
        },
        fail : (json) => {
          this.$emit('fail',json)
        },
        catchFn : () => {
          this.nodata = '网络异常 请刷新或重新请求';
        },
        notify : setting.notify
      }],this.exist)
    }
  }
}
</script>

<style lang="scss">

.fix-tablePagination{
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
