export default (r => r.keys().map(key => ({
  name : key.split('/')[1],
  value : r(key).default
})))(require.context('./', true, /^\.\/((?!\/)[\s\S])+\/index\.js$/))
