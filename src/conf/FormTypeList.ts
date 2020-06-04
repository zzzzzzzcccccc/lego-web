export interface IFormType {
  title?: string;
  list: Array<{ title: string, icon?: string }>;
}

const FormTypeList:Array<IFormType> = [
  {
    title: '表单容器',
    list: [
      {title: '单行容器'},
      {title: '左右列容器'},
      {title: '上下列容器'},
      {title: '居中容器'},
    ]
  },
  {
    title: '表单控件',
    list: [
      {title: '输入框'},
      {title: '多行输入框'},
      {title: '数字输入框'},
      {title: '单选框'},
      {title: '多选框'},
      {title: '下拉框'},
      {title: '年月日选择器'},
      {title: '年月日时分秒选择器'},
      {title: '年月日时间范围选择器'},
      {title: '年月日时分秒范围选择器'}
    ]
  }
];

export default FormTypeList;
