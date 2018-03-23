<template lang="html">
  <div >
    <form-list
    submit-text="查询"
    :fromAttrs="attrs"
    :rules="rules"
    :fields="fields"
    :defaultValue="defaultValue"
    @success="success"
    ></form-list>
    <!-- <el-select
      v-model="value9"
      clearable
      placeholder="请输入关键词"
      :loading="loading">
      <el-option
        v-for="item in selects"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select> -->
  </div>
</template>

<script>

export default {
  name : 'forms',
  data(){
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6 || value.length >14) {
        callback(new Error('密码长度为6至20位且不包含特殊字符'));
      } else {
        callback();
      }
    };
    return {
      loading : false,
      value9 : '',
      attrs : {
        labelWidth : '120px'
      },
      defaultValue : {
        s1 : '我是初始的s1',
        s2 : '',
        s3 : '',
        s4 : ['op1','op2'],
        s5 : 'op1',
        s6 : true,
        s7 : '2017',
        s8 : ['2012-12-01 01:12:32','2012-12-09 01:12:32'],
        s9 : ['01:12:32','07:12:32'],
        s10 : ['00:10','00:10'],
        s11 : '',
        s12 : '',
        s13 : 4
      },
      fields : [
        {
          key : 's1',
          type : 'input',
          label : '我是S1',
          desc : '我在这里s1',

        },
        // {},
        {
          key : 's2',
          type : 'select',
          label : '我是S2',
          desc : '请选择s2',
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
        {
          key : 's3',
          type : 'input',
          label : '我是S3',
          desc : '我在这里s3',
        },
        {
          key : 's4',
          type : 'checkbox',
          label : '我是S4',
          checkAll : false,
          options : [{
              value: 'op1',
              name: '黄金糕'
            }, {
              value: 'op2',
              name: '双皮奶'
            }, {
              value: 'op3',
              name: '蚵仔煎'
            }]
        },
        {
          key : 's5',
          type : 'radio',
          label : '我是s5',
          desc : '请选择s5',
          events : {
            change(v){
              console.log(v);
            }
          },
          options : [{
              value: 'op1',
              name: '黄金糕'
            }, {
              value: 'op2',
              name: '双皮奶'
            }, {
              value: 'op3',
              name: '蚵仔煎'
            }]
        },
        {
          key : 's6',
          type : 'switch',
          label : '我是s6',
          onText : '是',
          offText : '否',
          events : {
            change(v){
              console.log(v);
            }
          }
        },
        {
          key : 's7',
          type : 'datePicker',
          label : '我是s7',
          datePickerAttrs : {
            // format : 'yyyy-MM',
            type : 'date'
          },
          events : {
            change(v){
              console.log(v);
            }
          }
        },
        {
          key : 's8',
          type : 'dateTimePicker',
          label : '我是s8',
          datePickerAttrs : {
            // format : 'yyyy-MM',
            type : 'datetimerange'
          },
          events : {
            change(v){
              console.log(v);
            }
          }
        },

        {
          type : 'hr',
          label : '请看这里',
          desc : '我是爱的分割线------------------------------------'
        },
        {
          key : 's10',
          type : 'fixedTimeRange',
          label : '我是s10',
          desc : {
            start : '开始时间',
            end : '结束时间'
          },
          fixedTimeAttrs : {
            // // format : 'yyyy-MM',
            // isRange : true
          },
          events : {
            change(v){
              console.log(v);
            }
          }
        },
        {
          key : 's11',
          type : 'fixedTime',
          label : '我是s11',
          fixedTimeAttrs : {
            // // format : 'yyyy-MM',
            // isRange : true
          },
          events : {
            change(v){
              console.log(v);
            }
          }
        },
        {
          key : 's9',
          type : 'time',
          label : '我是s9',
          timePickerAttrs : {
            // format : 'yyyy-MM',
            isRange : true
          },
          events : {
            change(v){
              console.log(v);
            }
          }
        },
        {
          key : 's12',
          type : 'textarea',
          label : '我是s12',
          textareaAttrs : {
            // // format : 'yyyy-MM',
            // isRange : true
          },
          events : {
            change(v){
              console.log(v);
            }
          }
        },
        {
          key : 's13',
          type : 'slider',
          label : '我是s13',
          sliderAttrs : {
            min : 3,
            max : 8,
            step : 1,
            showStops : true,
            showInput : true,
            disabled : false
          },
          events : {
            change(v){
              console.log(v);
            }
          }
        }
      ],
      rules: {
        s1: [{
            required: true,
            validator: validatePassword,
            trigger: 'blur'
        }],
        s2: [{
            required: true,
            message: '必须选择',
            trigger: 'change'
        }],
        s5: [{
            required: true,
            message: '必须选择',
            trigger: 'change'
        }]
      }
    }
  },
  mounted(){

  },
  computed : {
    selects(){
      let select = this.$store.getters.selects;
      this.loading = !select.length;
      return select
    }
  },
  methods : {
    success(obj){
      console.log(obj);
    }
  },
  components: {  },
}
</script>

<style scoped lang="css">

</style>
