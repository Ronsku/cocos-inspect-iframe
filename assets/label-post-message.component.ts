const { ccclass, property } = cc._decorator;

@ccclass
export default class LabelPostMessageComponent extends cc.Component {
  @property(cc.Label)
  label: cc.Label = null;

  start() {
    // write a count down to the label 3..2..1 then send the post message request and update the label
    this.label.string = "Sending post message in: 3";
    setTimeout(() => {
      this.label.string = "Sending post message in: 2";
      setTimeout(() => {
        this.label.string = "Sending post message in: 1";
        setTimeout(() => {
          this.label.string = "Sending...";
          this.sendPostMessage();
        }, 1000);
      }, 1000);
    }, 1000);
  }

  private sendPostMessage() {
    window.parent.postMessage("hello", "*");
    window.addEventListener("message", (event) => {
      this.label.string = event.data;
    });
  }
}
