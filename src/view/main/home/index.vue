<template lang="html">
  <div >
    <form-list
    class="search-ex"
    :fromAttrs="attrs"
    :fields="fields"
    :optionAttrs="optionAttrs"
    :defaultValue="setting.data"
    @success="success"
    />
    <table-pagination
    @interface="_interface"
    :table="table"
    :setting='setting'
    :search='search'>
      <el-table-column  label="激活时间" slot="act" >
        <template slot-scope="scope">
          <router-link to="/main/home/detail">
            <el-button
            @click="detail(scope.row)"
            size="small"
            type="primary">图例</el-button>
          </router-link>
        </template>
      </el-table-column>
    </table-pagination>
  </div>
</template>

<script>

export default {
  name : 'home',
  data(){
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
      attrs : {
        labelWidth : '100px',
        inline :true
      },
      optionAttrs : {
        submitMessage : {
          name : '查询'
        }
      },
      fields : [
        {
          key : 's1',
          type : 'input',
          label : '名字',
          desc : '请输入名字',

        },
        // {},
        {
          key : 's2',
          type : 'select',
          label : '类别',
          desc : '请选择类别',
          events : {
            change(v){
              console.log(v);
            }
          },
          options : [{
              value: 'op1',
              label: '黄金糕'
            }, {
              value: 'op2',
              label: '双皮奶1'
            },
            {
              value: 'op3',
              label: '双皮奶2'
            },
            {
              value: 'op4',
              label: '双皮奶3'
            },
            {
              value: 'op5',
              label: '双皮奶4'
            },
            {
              value: 'op7',
              label: '双皮奶5'
            },
            {
              value: 'op8',
              label: '双皮奶6'
            },{
              value: 'op9',
              label: '蚵仔煎'
            }]
        },
        {},
        {
          key : 's3',
          type : 'input',
          label : '年龄',
          desc : '请输入年龄',
        }
      ]
    }
  },
  mounted(){

  },
  computed : {

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
    detail(index){
      // console.log(index);
    },
    success(obj){
      if(!obj) return ;
      this.search = !this.search
    }
  }
}
</script>

<style lang="scss">
.search-ex{
  position: relative;
  .form-act{
    position: absolute;
    right: 10px;
    top : 0;
  }
}

</style>
