import {IFormCompDataList} from "../FormCompDataList";
import {IGlobalFormConfig} from "../../../store/modules/BuildForm/interface";

/**
 * 包源码
 * @param code
 */
const getPackageCode = (code:string = ''): string => {
  return `import React from 'react'
import { Input, InputNumber, Radio, Checkbox, Select, Cascader, Button, DatePicker, TimePicker, Switch, Slider, Upload, Rate, Form } from 'antd'
import { UploadOutlined, InboxOutlined } from '@ant-design/icons'
import locale from "antd/es/date-picker/locale/zh_CN";

const BuildForm = () => {
  const [form] = Form.useForm();
  
  return(
    ${code || ''}
  )
};

export default = BuildForm;`
};

/**
 * 每个表单的源码
 * @param record
 * @return string
 */
const formInputMap = (record: IFormCompDataList): string | null  => {
  const { comp, inputAttr, options } = record;
  const showDisabled = (): string => inputAttr?.disabled ? ` disabled` : ''; // 是否添加禁用
  const showMaxLength = (): string => inputAttr?.maxLength ? ` maxLength={${inputAttr?.maxLength}}` : ''; // 是否添加最大个数
  const showPrefix = (): string => inputAttr?.prefix ? ` prefix="${inputAttr?.prefix}"` : ``; // 是否添加前缀
  const showSuffix = (): string => inputAttr?.suffix ? ` suffix="${inputAttr?.suffix}"` : ``; // 是否添加后缀
  const showOptions = (): string => (options || []).length > 0 ? ` options={${JSON.stringify(options)}}` : ``; // 是否添加options
  const showShowSearch = (): string => inputAttr?.showSearch ? ` showSearch` : ``; // 是否显示showSearch
  const showShowTime = (): string => inputAttr?.showTime ? ` showTime`: ``; // 是否显示showTime

  switch (comp) {
    case 'Input':
      return `  <Input placeholder="${inputAttr?.placeholder}"${showDisabled()}${showMaxLength()}${showPrefix()}${showSuffix()} />`;
    case 'InputPassword':
      return `  <Input.Password placeholder="${inputAttr?.placeholder}"${showDisabled()}${showMaxLength()} />`;
    case 'InputNumber':
      return `  <InputNumber placeholder="${inputAttr?.placeholder}"${showDisabled()} />`;
    case 'InputTextArea':
      return `  <Input.TextArea placeholder="${inputAttr?.placeholder}"${showDisabled()}${showMaxLength()} rows="${inputAttr?.rows}" />`;
    case 'RadioGroup':
      return `  <Radio.Group${showDisabled()}${showOptions()} />`;
    case 'CheckboxGroup':
      return `  <Checkbox.Group${showDisabled()}${showOptions()} />`;
    case 'Select':
      return `  <Select placeholder="${inputAttr?.placeholder}"${showDisabled()}${showShowSearch()} style={{ width: '100%' }} filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
      ${getSelectOptions()}
      </Select>`;
    case 'Cascader':
      return `  <Cascader placeholder="${inputAttr?.placeholder}"${showDisabled()}${showShowSearch()}${showOptions()} style={{ width: '100%' }} />`;
    case 'DatePicker':
      return `  <DatePicker locale={locale} placeholder="${inputAttr?.placeholder}"${showDisabled()}${showShowTime()} picker="${inputAttr?.picker}" />`;
    case 'DatePickerRange':
      return `  <DatePicker.RangePicker locale={locale} placeholder={${JSON.stringify(inputAttr?.placeholder)}}${showDisabled()}${showShowTime()} picker="${inputAttr?.picker}" />`;
    case 'TimePicker':
      return `  <TimePicker picker="time" placeholder="${inputAttr?.placeholder}"${showDisabled()} format="${inputAttr?.format}" />`;
    case 'TimePickerRange':
      return `  <TimePicker.RangePicker picker="time" placeholder={${JSON.stringify(inputAttr?.placeholder)}}${showDisabled()} format="${inputAttr?.format}" />`;
    case 'Switch':
      return `  <Switch${showDisabled()} />`;
    case 'Slider':
      return `  <Slider${showDisabled()} />`;
    case 'UploadBtn':
      return `  <Upload${showDisabled()}><Button><UploadOutlined />点击上传</Button></Upload>`;
    case 'UploadDragger':
      return `  <Upload.Dragger${showDisabled()}><p className="ant-upload-drag-icon"><InboxOutlined /></p><p className="ant-upload-text">点击或拖拽文件上传</p></Upload.Dragger>`;
    case 'Rate':
      return `  <Rate />`;
    default:
      return null
  }

  /**
   * 渲染select下拉框
   */
  function getSelectOptions(): string {
    const selectOptionList: string[] = [];
    for (let i : number = 0; i < (options || []).length; i++) {
      selectOptionList.push(`  <Select.Option value="${options && options[i].value}">${options && options[i].label}</Select.Option>`)
    }

    return selectOptionList.join('\n      ');
  }
};

/**
 * 导出antd FormItem 源码html
 * @param record
 * @param width
 * @param index
 * @return string
 */
const getFormItemCode = (record: IFormCompDataList, width: string, index: number): string => {
  const { title, name, itemAttr } = record;
  const showLabelCol = (): string => itemAttr.labelCol ? ` labelCol={{ span: ${itemAttr.labelCol.span} }}` : ``;
  const showWrapperCol = (): string => itemAttr.wrapperCol ? ` wrapperCol={{ span: ${itemAttr.wrapperCol.span} }}`: '';
  const showHasFeedback = (): string => itemAttr.hasFeedback ? ` hasFeedback` : '';

  return `${index === 0 ? '  ': '      '}<div style={{ display: 'inline-block', verticalAlign: 'top', width: '${width}' }}>
        <Form.Item label="${title}" name="${name}"${showHasFeedback()}${showLabelCol()}${showWrapperCol()} rules={${JSON.stringify(itemAttr.rules)}}>
        ${formInputMap(record) || ''}
        </Form.Item>
      </div>`;
};

/**
 * antd form 源码html
 * @param formConfig
 * @param infoReactHtml
 * @return string
 */
const getFormCode = (formConfig: IGlobalFormConfig, infoReactHtml: string): string => {
  const { layout, size, labelAlign, labelCol, wrapperCol } = formConfig;

  return `<Form form={form} layout="${layout}"${size ? `size="${size}"` : ''} labelAlign="${labelAlign}" labelCol={${JSON.stringify(labelCol)}} wrapperCol={${JSON.stringify(wrapperCol)}}>
    ${infoReactHtml || ''}
    </Form>`
};

/**
 * 获取源码
 * @param formList
 * @param globalFormConfig
 */
const getCode = (formList: Array<IFormCompDataList>, globalFormConfig: IGlobalFormConfig): string => {
  const formItemList: string[] = [];
  for (let i: number = 0; i < formList.length; i++) {
    const record: IFormCompDataList = formList[i];
    formItemList.push(getFormItemCode(record, `${record.style?.width || globalFormConfig.formWidth}%`, i))
  }
  const renderHtml: string = getFormCode(globalFormConfig, formItemList.join('\n'));

  return getPackageCode(renderHtml)
};

export default {
  getPackageCode,
  getFormCode,
  getFormItemCode,
  getCode
}
