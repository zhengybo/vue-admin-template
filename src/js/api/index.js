const path = process.env.NODE_MOCK ? 'mockApi' : 'apis';
export default  require('./' + path).default;
