import React from 'react'
import { Radio, Checkbox, Select, Cascader, Button, DatePicker, TimePicker, Switch, Slider, Upload, Rate } from 'antd'
import { UploadOutlined, InboxOutlined } from '@ant-design/icons'
import locale from "antd/es/date-picker/locale/zh_CN";
import {IFormCompDataList} from "../FormCompDataList";
import 'moment/locale/zh-cn';

interface FormControlMapProps {
  item: IFormCompDataList;
}

const FormControlMap:React.FC<FormControlMapProps> = (props: FormControlMapProps) => {
  const { item: { options, inputAttr, comp } } = props;

  switch (comp) {
    case 'RadioGroup':
      return(
        <Radio.Group {...inputAttr || {}}>
          {options?.map((item, i) => <Radio value={item.value} key={i + ''}>{item.label}</Radio>)}
        </Radio.Group>
      );
    case 'CheckboxGroup':
      return (
        <Checkbox.Group {...inputAttr || {}}>
          {options?.map((item, i) => <Checkbox value={item.value} key={i + ''}>{item.label}</Checkbox>)}
        </Checkbox.Group>
      );
    case 'Select':
      return(
        <Select {...inputAttr || {}}
                style={{ width: '100%' }}
                filterOption={(input: string, option: any) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
          {options?.map((item, i) => <Select.Option value={item.value} key={i + ''}>{item.label}</Select.Option>)}
        </Select>
      );
    case 'Cascader':
      return(
        <Cascader options={options} {...inputAttr || {}} style={{ width: '100%' }} />
      );
    case 'DatePicker':
      return(
        <DatePicker locale={locale} {...inputAttr || {}} />
      );
    case 'DatePickerRange':
      return (
        <DatePicker.RangePicker locale={locale}  {...inputAttr || {}} />
      );
    case 'TimePicker':
      return (
        <TimePicker  {...inputAttr || {}} />
      );
    case 'TimePickerRange':
      return (
        <TimePicker.RangePicker picker="time" placeholder={inputAttr?.placeholder} format={inputAttr?.format} disabled={inputAttr?.disabled} />
      );
    case 'Switch':
      return(
        <Switch {...inputAttr || {}} />
      );
    case 'Slider':
      return(
        <Slider {...inputAttr || {}} />
      );
    case 'UploadBtn':
      return (
        <Upload {...inputAttr || {}}>
          <Button><UploadOutlined />点击上传</Button>
        </Upload>
      );
    case 'UploadDragger':
      return (
        <Upload.Dragger {...inputAttr || {}}>
          <p className="ant-upload-drag-icon"><InboxOutlined /></p>
          <p className="ant-upload-text">点击或拖拽文件上传</p>
        </Upload.Dragger>
      );
    case 'Rate':
      return (
        <Rate />
      );
    default:
      return null;
  }
};

export default FormControlMap
