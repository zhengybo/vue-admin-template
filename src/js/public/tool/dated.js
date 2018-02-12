/**
 * 扩展时间 函数
 */
export default class  Dated extends Date{
  static supplement(str){ //补全YYYY | YYYY-MM YYYY-MM-DD 为YYYY-MM-DD hh:mm:ss
    if(/^(\d{1,4})$/.test(str)){
      return str + "-01-01 00:00:00"
    }
    if(/^(\d{1,4})(-|\/)(\d{1,2})$/.test(str)){
      return str + "-01 00:00:00"
    }
    if(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/.test(str)){
      return str + " 00:00:00"
    }
  }
  /*  获取时间 */
  static getDated(value,type = 'YY-MM-DD'){
    const zero = (v) => +v < 10 ?  `0${v}` : v;
    let d = new Date(value),
        ymd = `${d.getFullYear()}-${zero(d.getMonth()+1)}-${zero(d.getDate())}`,
        hms = `${zero(d.getHours())}:${zero(d.getMinutes())}:${zero(d.getSeconds())}`;
    switch (type) {
      case 'YY':
        return ymd.slice(0,4);
      case 'YY-MM':
        return ymd.slice(0,7);
      case 'YY-MM-DD':
        return ymd;
      case 'YY-MM-DD hh:mm:ss':
        return ymd + '　' + hms;
      default:
        return ymd;
    }
  }
  /* 获取时间戳 */
  static getTime(str){
    if(!str)return new Date().getTime();
    return new Date(str).getTime();
  }
  /* 获取指定月份的天数 */
  static getMonthDay(month,year){
    month=+month;
    let D31 = [1,3,5,7,8,10,12],
        D30 = [4,6,9,11];
    if(~D31.indexOf(month))return 31;
    if(~D30.indexOf(month))return 30;
    if(month == 2 ){
      let y = (year % 4 == 0) && (year % 100 != 0 || year % 400 == 0);
      return y ? 29 : 28;
    }
    return 30;
  }

  static getDDay(value = 0){ //获取一个时间相差n天
    return Dated.changeType(new Date((new Date().getTime() + value* 86400*1000)).toLocaleDateString())
  }

  /* 2015/7/9 转化为 2015-07-09 */
  static changeType(str){
    // new Date(str).toLocaleDateString()
    str = str.split(~str.indexOf('/') ? '/' : '-')
    return str.map((v,i) => {
      if(i && v<10)return '0'+v;
      return v;
    }).join('-')
  }

  /* 获取最近时间相差n天的时间 */
  static getLastDates(value = 0,offset = 0){
    let v = value + offset;
    return Dated.getFullDates(Dated.getDDay(0),Dated.getDDay(v));
  }
  /**
   * 获取一个日期的开始和结束日期的全部日期
   * @param start (String)
   * @param end (String)
   * @return [...] (Array)
   */
  static getFullDates(start,end){
    var startTime = new Date(start).getTime();
    var endTime = new Date(end).getTime();
    if(startTime>endTime)[startTime,endTime] = [endTime,startTime];
    let result = []
    while((endTime-startTime)>=0){
      result.push(Dated.changeType(new Date(startTime).toLocaleDateString()))
      // result.push(new Date(startTime).toLocaleDateString())
      startTime+=86400*1000;
    }
    return  result;
  }
  /* 获取两个月之间所有月份 */
  static getFullMonths(start,end){
    if(new Date(start) > new Date(end)){
      [start,end] = [end,start];
    }
    let s = start.split('-').map(v => +v),
        e = end.split('-').map(v => +v);
    let result = [];
    while ((e[0]-s[0]) *12 + e[1]-s[1] >=0 ) {
      result.push(Dated.changeType(s.join('-')))
      if(s[1] >= 12){
        s[0]++;
        s[1] = 0;
      }
      s[1]++;
    }
    return result;
  }
  /* 获取两个年份之间所有月份 */
  static getFullYears(start,end){
    let s = start.split('-'),
        e = end.split('-');
    let result = [];
    while(start[0]++ <= end[0])result.length = start;
    return result;
  }


}
