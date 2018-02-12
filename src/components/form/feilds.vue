<!-- 表单组件 -->
<template>
  <el-form
    class="formData"
    ref='formData'
    v-bind="form_attrs"
    :rules='rules'
    :model='defaultValue'>
    <el-form-item
      class='form-item'
      v-for='(field,index) in fields'
      v-if="field.key"
      v-bind="computeAttrs(form_item_attrs,field.attrs)"
      :key='index'
      :label="field.label"
      :prop='field.key'>
      <component
        :field="field"
        :class="`form-item-${field.type}`"
        :defaultValue="defaultValue"
        :is="components[field.type] || 'formInput'"></component>
      <div v-if="field.explain" class="explain">{{field.explain}}</div>
    </el-form-item>
    <!-- 标题 -->
    <!-- <el-form-item
      class='form-item-hr'
      v-else-if="field.type == 'hr'"
      :key='index'
      :label="field.label">
      <div class="">
        {{field.desc}}
      </div>
    </el-form-item> -->
    <div class="line-blank" v-else></div>
    <div :class="{
      'form-act' : true,
      line : actLine
      }">
      <el-form-item>
        <el-button
        v-for="(item,index) in prefixButton"
        size="small"
        v-bind="item.attrs || {}"
        :key="index"
        :type="item.type || 'info' "
         @click='item.click && item.click()'>{{item.text}}</el-button>
        <el-button
        v-if="options.resetMessage.name"
        size="small"
        type="info"
         @click='resetFields("formData")'>
         {{options.resetMessage.name}}</el-button>
         <el-button
         v-if="options.submitMessage.name"
         size="small"
         type="primary"
         @click='onSubmit("formData")'>{{options.submitMessage.name}}
        </el-button>
         <el-button
         v-for="(item,index) in suffixButton"
         size="small"
         v-bind="item.attrs || {}"
         :key="index"
         :type="item.type || 'info' "
          @click='item.click && item.click()'>{{item.text}}</el-button>
      </el-form-item>
    </div>
  </el-form>
</template>

<script>
import { Obj } from '@/js/public/tool'
import { keys } from './forms'
export default {
  props : {
    fields : {
      type : Array,
      default(){
        return []
      }
    },
    rules : {
      type : Object,
      default(){
        return {}
      }
    },
    defaultValue : {
      type : Object,
      default(){
        return {}
      }
    },
    attrs : {
      type : Object,
      default(){
        return {}
      }
    },
    actLine : {
      type : Boolean,
      default : true
    },
    prefixButton : Array,
    suffixButton : Array,
    optionAttrs : Object,
    formItemAttrs : Object,
    fromAttrs : Object,
  },
  data(){
    return {
      components : {
        ...keys
      }
    }
  },
  computed : {
    form_attrs (){ // form 单独(element)属性
      return Object.assign({
        //默认属性
        labelWidth : '100px',
        inline : false,
      },this.fromAttrs)
    },
    form_item_attrs(){ // form-item 单独(element)属性
      return Object.assign({
        // 默认属性
      },this.formItemAttrs)
    },
    options (){ // 可选属性
      return Obj.merge({
        resetMessage : {//默认属性
          name : '重置',
          text : '你确定要重置这些信息？',
          title : '提示',
          resetToast : false,
          afterReset : void 0,
          beforeReset : void 0,
          cancelButtonText : "取消",
          confirmButtonText : "确定"
        },
        submitMessage : {
          name : '提交',
          afterSubmit : void 0,
          beforeSubmit : void 0
        }
      },this.optionAttrs);
    }
  },
  methods : {
    onSubmit(formName) {
      let { afterSubmit, beforeSubmit } = this.options.submitMessage;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let temp = JSON.parse(JSON.stringify(this.defaultValue));
          if(typeof beforeSubmit === 'function' && beforeSubmit() === false){
            return;
          }
          this.$emit('success',temp);
          typeof afterSubmit === 'function' && afterSubmit();
        } else {
          this.$emit('error');
          return false;
        }
      });
    },
    resetFields(){
      let reset = this.$refs.formData.resetFields;
      let { text, title, confirmButtonText, beforeReset, afterReset,
            cancelButtonText, resetToast } = this.options.resetMessage;
      resetToast ?
      this.$messageBox.confirm(text, title, {
        confirmButtonText,
        cancelButtonText,
        type: 'warning'
      }).then(r => {
        //再一次判断 是否不需要重置的 机会
        if(typeof beforeReset === 'function' && beforeReset() === false)return;
        reset();
        typeof afterReset === 'function' && afterReset();
        // this.$emit('reset');
      }).catch(r => {}) : reset();
    },
    computeAttrs(arg0, arg1){ //计算属性
      return Object.assign(arg0,arg1);
    }
  }
}
</script>
<style scoped lang='css'>
.form-act{

}
.form-item{
  min-width: 450px;
}
.line {
  display: inline-block;
}
.explain{
  margin-left: 10px;
  display: inline-block;
  line-height: 40px;
}

</style>
