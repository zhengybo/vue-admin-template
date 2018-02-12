export default vue => {
  require('./custrom').default(vue);
  require('./public').default(vue);
  require('./form').default(vue);
  // require('./self').default(vue);
}
