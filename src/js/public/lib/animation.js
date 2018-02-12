
//绘制过程
import {Mathed} from './../tool'
let rdms = Mathed.getRamdoms(3,100,220),
    rdm = rdms.join(',');
let act = Mathed.getRamdoms(3,1,2);
setInterval(() => {
  for (let i = 0; i < 3; i++) {
    if(rdms[i]>=220 || rdms[i] <= 130){
      act[i] = -act[i];
    }
  }
  for (let i = 0; i < 3; i++) {
    rdms[i]+=act[i];
  }
  rdm = rdms.join(',');
},100)
export default (config) => {
    //创建画布，并添加到body中
    var the_canvas = document.createElement("canvas"), //画布
      canvas_id = "c_n" + config.l, //canvas id
      context = the_canvas.getContext("2d"), canvas_width, canvas_height,
      frame_func = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(func) {
        window.setTimeout(func, 1000 / 60);
      }, random = Math.random,
      current_point = {
        x: null, //当前鼠标x
        y: null, //当前鼠标y
        max: 20000 // 圈半径的平方
      },
      all_array;
      const  set_canvas_size = () => {
        canvas_width = the_canvas.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
        canvas_height = the_canvas.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
      }
      const  draw_canvas = () => {
        context.clearRect(0, 0, canvas_width, canvas_height);
        //随机的线条和当前位置联合数组
        var e, i, d, x_dist, y_dist, dist; //临时节点
        //遍历处理每一个点

        random_points.forEach(function(r, idx) {
          r.x += r.xa,
          r.y += r.ya, //移动
          r.xa *= r.x > canvas_width || r.x < 0 ? -1 : 1,
          r.ya *= r.y > canvas_height || r.y < 0 ? -1 : 1; //碰到边界，反向反弹
          // context.fillRect(r.x - 0.5, r.y - 0.5, 1, 1); //绘制一个宽高为1的点
          let rad = Mathed.random(1,3);
          var grad = context.createRadialGradient(
            r.x-r.rad/2,
            r.y-r.rad/2,
            0,
            r.x-r.rad/2,
            r.y-r.rad/2 ,
            r.rad);
          grad.addColorStop(0, 'rgba(255, 255, 255, 1)');    // 黄
          grad.addColorStop(0.3,'rgba(255, 255, 255, 0.5)');  // 蓝
          grad.addColorStop(1,'rgba(238, 241, 69, 0)');    //青
          context.fillStyle=grad;
          context.beginPath();
          context.arc(r.x - r.rad/2,r.y - r.rad/2,r.rad,0,2*Math.PI);
          context.fill();
          //从下一个点开始
          for (i = idx + 1; i < all_array.length; i++) {
            e = all_array[i];
            // 当前点存在
            if (null !== e.x && null !== e.y) {
              x_dist = r.x - e.x; //x轴距离 l
              y_dist = r.y - e.y; //y轴距离 n
              dist = x_dist * x_dist + y_dist * y_dist; //总距离, m

              dist < e.max && (e === current_point && dist >= e.max / 2 && (r.x -= 0.03 * x_dist, r.y -= 0.03 * y_dist), //靠近的时候加速
                d = (e.max - dist) / e.max,
                context.beginPath(),
                context.lineWidth = d / 2,
                context.strokeStyle = "rgba(" + rdm + "," + (d + 0.1) + ")",
                context.moveTo(r.x, r.y),
                context.lineTo(e.x - e.rad/2, e.y-e.rad/2),
                context.stroke());
            }
          }
        }), frame_func(draw_canvas);
      }
    the_canvas.id = canvas_id;
    the_canvas.style.cssText = "position:fixed;top:0;left:0;z-index:" + config.z + ";opacity:" + config.o;
    // let login = document.getElementById('login');
    if(config.d)config.d.appendChild(the_canvas);
    //初始化画布大小
    set_canvas_size(the_canvas);
    window.onresize = set_canvas_size;
    //当时鼠标位置存储，离开的时候，释放当前位置信息
    window.onmousemove = function(e) {
      e = e || window.event;
      current_point.x = e.clientX;
      current_point.y = e.clientY;
    }, window.onmouseout = function() {
      current_point.x = null;
      current_point.y = null;
    };
    //随机生成config.n条线位置信息
    for (var random_points = [], i = 0; config.n > i; i++) {
      var x = random() * canvas_width, //随机位置
        y = random() * canvas_height,
        xa = 1.6 * random() - 0.8, //随机运动方向
        ya = 1.6 * random() - 0.8;
      // 随机点
      random_points.push({
        x: x,
        y: y,
        xa: xa,
        ya: ya,
        max: 6000, //沾附距离
        rad : Mathed.random(3,10)
      });
    }
    all_array = random_points.concat([current_point]);
    //0.1秒后绘制
    // frame_func(draw_canvas);
    setTimeout(function() {
      frame_func(draw_canvas);
    }, 100);
}
