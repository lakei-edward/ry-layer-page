export default {
  /** 纯数字   */
  number: /\D/g,
  /** 纯数字  */
  english: /[^a-zA-Z]/g,
  /** 纯数字 */
  chinese: /[^\u4e00-\u9fa5]/g,
  /** 两位小数 */
  twoDecimals: /^[0-9]+\.[0-9]{2}$/,
  /** 手机号 */
  phone: /^[1][3,4,5,7,8,9][0-9]{9}$/,
  /** 邮箱 */
  c2: /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/,
  /** 文件 */
  files: /^.*\.(?:jpg|jpeg|png|doc|docx|pdf|xls|xlsx|ppt|pptx|txt)$/i
};
