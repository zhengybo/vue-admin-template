
export default  require(process.env.NODE_MOCK ? './mockApi' : './apis').default;
