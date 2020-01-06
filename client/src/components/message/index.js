import MessageComponent from "./component";

export default {
  createComponent(Vue, msg, type) {
    const MessageClass = Vue.extend(MessageComponent);
    const Message = new MessageClass({
      propsData: {
        type,
        msg
      }
    });
    Message.$mount();
    document.body.appendChild(Message.$el);
    return Message;
  },
  install(Vue) {
    Vue.prototype.$message = {
      error: msg => {
        this.createComponent(Vue, msg, "error");
      },
      success: msg => {
        this.createComponent(Vue, msg, "success");
      },
      info: msg => {
        this.createComponent(Vue, msg, "info");
      }
    };
  }
};
