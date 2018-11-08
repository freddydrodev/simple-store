const notify = {
  delete: new Promise(
    (({ action, title, message, type, icon }) => {
      console.log(action, title, message, type, icon);
    },
    err => err)
  ),
  add: new Promise((({}) => {}, err => err)),
  create: new Promise(
    (action, title, message, type, timing, icon) => {
      notify.add({ action, title, message, type, icon });
    },
    err => {
      console.warn(err);
    }
  )
};

export default notify;
