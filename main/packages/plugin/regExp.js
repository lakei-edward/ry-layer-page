export default {
  number: /\D/g, // 纯数字
  english: /[^a-zA-Z]/g, //纯英文
  chinese: /[^\u4e00-\u9fa5]/g, //纯中文
  files: /^.*\.(?:jpg|jpeg|png|doc|docx|pdf|xls|xlsx|ppt|pptx|txt|mp4|flv)$/i,
};
