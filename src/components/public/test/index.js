/**
 * 测试jsx写法
 */

export default (vue) => {
  vue.component('pag',{
    render (createElement) { // <-- h must be in scope
      console.log(createElement);
      console.log(this.ab);
      return (<div id="foo">{this.ab}</div>)

    },
    props : {
      ab : String
    }
  })

}
