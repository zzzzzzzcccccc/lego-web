import React from 'react'
import { Radio, Checkbox, Select, Cascader, Button, DatePicker, Switch, Slider, Upload, Rate } from 'antd'
import { UploadOutlined, InboxOutlined } from '@ant-design/icons'
import locale from "antd/es/date-picker/locale/zh_CN";
import {IFormCompDataList} from "../FormCompDataList";
import moment from 'moment'
import 'moment/locale/zh-cn';

interface FormControlMapProps {
  item: IFormCompDataList;
}

const RADIO_GROUP: string = 'RadioGroup';
const CHECKBOX_GROUP: string =  'CheckboxGroup';
const SELECT:string = 'Select';
const CASCADER: string = 'Cascader';
const DATEPICKER: string = 'DatePicker';
const RANGEPICKER: string = 'RangePicker';
const SWITCH: string = 'Switch';
const SLIDER: string = 'Slider';
const UPLOAD_BTN: string = 'UploadBtn';
const UPLOAD_DRAGGER: string = 'UploadDragger';
const RATE: string = 'Rate';

const DATE_QUICK_RANGE: any = {
  '今天': [moment(), moment()],
  '昨天': [moment().day(moment().day() - 1).startOf('day'), moment().day(moment().day() - 1).endOf('day')],
  '本周': [moment().startOf('week'), moment().endOf('week')],
  '上周': [moment().week(moment().week() - 1).startOf('week'), moment().week(moment().week() - 1).endOf('week')],
  '本月': [moment().startOf('month'), moment().endOf('month')],
  '上月': [moment().month(moment().month() - 1).startOf('month'), moment().month(moment().month() - 1).endOf('month')],
  '本季度': [moment().startOf('quarter'), moment().endOf('quarter')]
};

const FormControlMap:React.FC<FormControlMapProps> = (props: FormControlMapProps) => {
  const { item: { options, inputAttr, comp } } = props;

  switch (comp) {
    case RADIO_GROUP:
      return(
        <Radio.Group {...inputAttr || {}}>
          {options?.map((item) => <Radio value={item.value} key={item.value}>{item.label}</Radio>)}
        </Radio.Group>
      );
    case CHECKBOX_GROUP:
      return (
        <Checkbox.Group {...inputAttr || {}}>
          {options?.map((item) => <Checkbox value={item.value} key={item.value}>{item.label}</Checkbox>)}
        </Checkbox.Group>
      );
    case SELECT:
      return(
        <Select {...inputAttr || {}}
                style={{ width: '100%' }}
                filterOption={(input: string, option: any) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
          {options?.map((item) => <Select.Option value={item.value} key={item.value}>{item.label}</Select.Option>)}
        </Select>
      );
    case CASCADER:
      return(
        <Cascader options={options} {...inputAttr || {}} style={{ width: '100%' }} />
      );
    case DATEPICKER:
      return(
        <DatePicker locale={locale} {...inputAttr || {}} />
      );
    case RANGEPICKER:
      return (
        <DatePicker.RangePicker ranges={DATE_QUICK_RANGE} locale={locale}  {...inputAttr || {}} />
      );
    case SWITCH:
      return(
        <Switch {...inputAttr || {}} />
      );
    case SLIDER:
      return(
        <Slider {...inputAttr || {}} />
      );
    case UPLOAD_BTN:
      return (
        <Upload {...inputAttr || {}}>
          <Button><UploadOutlined />点击上传</Button>
        </Upload>
      );
    case UPLOAD_DRAGGER:
      return (
        <Upload.Dragger {...inputAttr || {}}>
          <p className="ant-upload-drag-icon"><InboxOutlined /></p>
          <p className="ant-upload-text">点击或拖拽文件上传</p>
        </Upload.Dragger>
      );
    case RATE:
      return (
        <Rate />
      );
    default:
      return null;
  }
};

export default FormControlMap
