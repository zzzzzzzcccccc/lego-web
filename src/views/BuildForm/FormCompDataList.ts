import React from 'react'

export interface IFormCompOptions {
  label?: string | number | string[];
  value?: any;
  disabled?: boolean;
  children?: IFormCompOptions[];
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
  /**
   * 最小值
   */
  min?: number;
  /**
   * 最大值
   */
  max?: number;
  /**
   * 滑块是否区间
   */
  range?: boolean;
  /**
   * 滑动间隔或数字累加累减间隔
   */
  step?: number;
  /**
   * 是否显示上传列表
   */
  showUploadList?: boolean | any;
  /**
   * textarea行数
   */
  rows?: number;
  /**
   * 表当控件样式
   */
  style?: React.CSSProperties;
  /**
   * 最大字符数
   */
  maxLength?: number;
  /**
   * 控件前缀
   */
  prefix?: string;
  /**
   * 输入控件后缀
   */
  suffix?: string;
  /**
   * 时间日期控件使用的时间格式
   */
  format?: string | any;
}
export interface IFormCompDataListItemAttr {
  /**
   * 是否需要右侧图标反馈
   */
  hasFeedback?: boolean;
  /**
   * antd内置表单验证
   */
  rules?: Array<any>;
  /**
   * label宽度比例
   */
  labelCol?: { span: number },
  /**
   * 控件宽度比例
   */
  wrapperCol?: { span: number },
}
export interface IFormCompDataList {
  id?: string;
  title: string;
  comp: string;
  name?: string;
  itemAttr: IFormCompDataListItemAttr;
  inputAttr?: IFormCompDataListInputAttr;
  type: 'inputControl' | 'selectControl' | 'otherControl';
  options?: IFormCompOptions[];
  style?: React.CSSProperties;
}
export interface IFormCompData {
  title: string;
  list: IFormCompDataList[];
}

const FormCompData: IFormCompData[] = [
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
          rows: 4,
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
        comp: 'DatePickerRange',
        type: 'selectControl',
        itemAttr: {
          rules: [
            {required: true, message: '请选择'}
          ]
        },
        inputAttr: {
          placeholder: ['开始日期', '结束日期'],
          disabled: false,
          showTime: false,
          picker: 'date'
        }
      },
      {
        title: '时间选择器',
        comp: 'TimePicker',
        type: "selectControl",
        itemAttr: {
          rules: [
            {required: true, message: '请选择时间'}
          ]
        },
        inputAttr: {
          placeholder: '请选择时间',
          disabled: false,
          format: 'HH:mm:ss'
        }
      },
      {
        title: '时间范围选择器',
        comp: 'TimePickerRange',
        type: "selectControl",
        itemAttr: {
          rules: [
            {required: true, message: '请选择时间'}
          ]
        },
        inputAttr: {
          placeholder: ['开始时间', '结束时间'],
          disabled: false,
          picker: 'time',
          format: 'HH:mm:ss'
        }
      }
    ]
  },
  {
    title: '其他表单',
    list: [
      {
        title: 'Switch控件',
        comp: 'Switch',
        type: "otherControl",
        itemAttr: {
          rules: [
            {required: true, message: '请选择'}
          ]
        },
        inputAttr: {
          disabled: false,
        }
      },
      {
        title: '滑动条',
        comp: 'Slider',
        type: "otherControl",
        itemAttr: {
          rules: [
            {required: true, message: '请滑动'}
          ]
        },
        inputAttr: {
          disabled: false,
          min: 0,
          max: 100,
          range: false,
          step: 1,
        }
      },
      {
        title: '按钮上传',
        comp: 'UploadBtn',
        type: "otherControl",
        itemAttr: {
          rules: [
            {required: true, message: '请上传附件'}
          ]
        },
        inputAttr: {
          disabled: false,
          showUploadList: true
        }
      },
      {
        title: '拖拽上传',
        comp: 'UploadDragger',
        type: "otherControl",
        itemAttr: {
          rules: [
            {required: true, message: '请上传附件'}
          ]
        },
        inputAttr: {
          disabled: false
        }
      },
      {
        title: '评分控件',
        comp: 'Rate',
        type: "otherControl",
        itemAttr: {
          rules: [
            {required: true, message: '请打分'}
          ]
        },
        inputAttr: {
          disabled: false
        }
      },
    ]
  },
];

export default FormCompData;
