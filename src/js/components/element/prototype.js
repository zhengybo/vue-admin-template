import {
  Notification,
  MessageBox // 2.0.5版本按需引入 options无效
} from 'element-ui'
const { confirm, alert, prompt } = MessageBox;
export default {
  $notify  : Notification,
  $messageBox : MessageBox,
  $confirm : confirm,
  $alert : alert,
  $prompt : prompt
}
