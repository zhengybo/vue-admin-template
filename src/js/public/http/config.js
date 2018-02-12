/**
 * 配置参数
 */

 export default {
   /* 超时配置 */
   timeout : {
     during : 10 //(秒)
   },
   /* token配置 */
   token : {
     code : ['-201','40002','40003','VG_0003'], //token失效标志码
     show : {
       title : '提示',
       message : '登录超时'
     }
   }
 }
