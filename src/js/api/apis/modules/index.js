let result = {};
(r => r.keys().map(key => r(key).default))(require.context('./', true, /^\.\/((?!\/)[\s\S])+\/index\.js$/)).forEach(item=>Object.assign(result,item));
export default result
