/**
 * 初始配置项
 */

/*  事件集 */
const eventsMap = {
  time : ['change'],
  input : ['change','blur','focus'],
  radio : ['change'],
  select : ['change','visibleChange','removeTag','clear','blur','focus'],
  slider : ['change'],
  switch : ['change'],
  checkbox : ['change'],
  textarea : ['change','blur','focus'],
  fixedTime : ['change'],
  datePicker : ['change'],
  dateTimePicker : ['change'],
  fixedTimeRange : ['change'],
}


export default (name) => {
  return {
    events : eventsMap[name] || ['change']
  }
}
