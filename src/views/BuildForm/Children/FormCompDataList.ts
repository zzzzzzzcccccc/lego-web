import React from 'react'

export interface IOptions {
  label?: string | React.ReactNode;
  value?: any;
  disabled?: boolean;
  children?: IOptions[];
}
export interface IFormCompDataListInputAttr {
  /**
   * 输入框的placeholder
   */
  placeholder?: any;
  /**
   * 是否禁用
   */
  disabled?: boolean;
  /**
   * 是否可被清除
   */
  allowClear?: boolean;
  /**
   * 是否可被搜索
   */
  showSearch?: boolean;
  /**
   * 是否必须选择到最后一级
   */
  changeOnSelect?: boolean;
  /**
   * 是否显示时间
   */
  showTime?: boolean | any;
  /**
   * 日期选择器模式
   */
  picker?: any;
}
export interface IFormCompDataListItemAttr {
  /**
   * 左右列是每列宽度、上下列是每列高度
   */
  colThan?: number[];
  /**
   * 是否需要右侧图标反馈
   */
  hasFeedback?: boolean;
  /**
   * antd内置表单验证
   */
  rules?: Array<any>;
}
export interface IFormCompDataList {
  id?: string;
  title: string;
  comp: string;
  name?: string;
  itemAttr: IFormCompDataListItemAttr;
  inputAttr?: IFormCompDataListInputAttr;
  type: 'containerControl' | 'inputControl' | 'selectControl';
  options?: IOptions[];
  children?: any | any[] | React.ReactNode | React.ReactNode[] | null | undefined;
}
export interface IFormCompData {
  title: string;
  list: IFormCompDataList[];
}

const FormCompData: IFormCompData[] = [
  {
    title: '容器',
    list: [
      {
        title: '左右列布局',
        comp: 'ContainerRow',
        type: 'containerControl',
        itemAttr: {
          colThan: [50, 50]
        }
      },
      {
        title: '上下列布局',
        comp: 'ContainerList',
        type: 'containerControl',
        itemAttr: {
          colThan: [50, 50]
        }
      },
    ]
  },
  {
    title: '输入类表单',
    list: [
      {
        title: '输入框',
        comp: 'Input',
        type: 'inputControl',
        itemAttr: {
          rules: [
            {required: true, message: '请输入内容', whitespace: true}
          ],
        },
        inputAttr: {
          placeholder: '请输入内容',
          disabled: false,
        },
      },
      {
        title: '加密输入框',
        comp: 'InputPassword',
        type: 'inputControl',
        itemAttr: {
          rules: [
            {required: true, message: '请输入密码', whitespace: true}
          ],
        },
        inputAttr: {
          placeholder: '请输入密码',
          disabled: false,
        }
      },
      {
        title: '数字输入框',
        comp: 'InputNumber',
        type: 'inputControl',
        itemAttr: {
          rules: [
            {required: true, message: '请输入数字', whitespace: true, type: 'number'}
          ],
        },
        inputAttr: {
          placeholder: '请输入数字',
          disabled: false,
        }
      },
      {
        title: '多行输入框',
        comp: 'InputTextArea',
        type: 'inputControl',
        itemAttr: {
          rules: [
            {required: true, message: '请输入内容', whitespace: true}
          ],
        },
        inputAttr: {
          placeholder: '请输入内容',
          disabled: false,
        }
      }
    ]
  },
  {
    title: '选择类表单',
    list: [
      {
        title: '单选框',
        comp: 'RadioGroup',
        type: 'selectControl',
        options: [{label: 'A', value: 'a'}, {label: 'B', value: 'b'}, {label: 'C', value: 'c'}, {label: 'D', value: 'd'}],
        itemAttr: {
          rules: [
            {required: true, message: '请选择'}
          ],
        },
        inputAttr: {
          placeholder: '请选择',
          disabled: false,
        }
      },
      {
        title: '多选框',
        comp: 'CheckboxGroup',
        type: 'selectControl',
        options: [{label: 'A', value: 'a'}, {label: 'B', value: 'b'}, {label: 'C', value: 'c'}, {label: 'D', value: 'd'}],
        itemAttr: {
          rules: [
            {required: true, message: '请选择'}
          ],
        },
        inputAttr: {
          disabled: false,
        }
      },
      {
        title: '下拉框',
        comp: 'Select',
        type: 'selectControl',
        options: [{label: 'A', value: 'a'}, {label: 'B', value: 'b'}, {label: 'C', value: 'c'}, {label: 'D', value: 'd'}],
        itemAttr: {
          rules: [
            {required: true, message: '请选择'}
          ],
        },
        inputAttr: {
          placeholder: '请选择',
          disabled: false,
          showSearch: true,
        }
      },
      {
        title: '级联选择',
        comp: 'Cascader',
        type: 'selectControl',
        options: [
          { label: 'a', value: 'a', children: [{label: 'a-1', value: 'a-1', children: [{label: 'a-1-1', value: 'a-1-1'}]}] },
          { label: 'b', value: 'b', children: [{label: 'b-1', value: 'b-1', children: [{label: 'b-1-1', value: 'b-1-1'}]}] },
          { label: 'c', value: 'c', children: [{label: 'c-1', value: 'c-1', children: [{label: 'c-1-1', value: 'c-1-1'}]}] }
        ],
        itemAttr: {
          rules: [
            {required: true, message: '请选择'}
          ]
        },
        inputAttr: {
          placeholder: '请选择',
          disabled: false,
          showSearch: true,
          changeOnSelect: false,
        }
      },
      {
        title: '日期选择',
        comp: 'DatePicker',
        type: 'selectControl',
        itemAttr: {
          rules: [
            {required: true, message: '请选择'}
          ]
        },
        inputAttr: {
          placeholder: '请选择',
          disabled: false,
          picker: 'date',
          showTime: false,
        },
      },
      {
        title: '日期范围选择',
        comp: 'RangePicker',
        type: 'selectControl',
        itemAttr: {
          rules: [
            {required: true, message: '请选择'}
          ]
        },
        inputAttr: {
          placeholder: ['开始日期', '截止日期'],
          disabled: false,
          showTime: false,
          picker: 'date'
        }
      }
    ]
  },
];

export default FormCompData;
