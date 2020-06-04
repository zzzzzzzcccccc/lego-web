export interface IFormType {
  title?: string;
  list: Array<{ title: string, icon?: string, comp?: string }>;
}

const FormTypeList:Array<IFormType> = [
  {
    title: '表单控件',
    list: [
      {title: '输入框', comp: 'Input'},
      {title: '多行输入框', comp: 'TextArea'},
      {title: '数字输入框', comp: 'InputNumber'},
      {title: '单选框', comp: 'Radio'},
      {title: '多选框', comp: 'CheckBox'},
      {title: '下拉框', comp: 'Select'},
      {title: '时间选择器', comp: 'DatePicker'},
    ]
  },
];

export default FormTypeList;
