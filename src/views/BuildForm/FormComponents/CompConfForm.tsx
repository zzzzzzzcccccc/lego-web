import React, { useEffect } from 'react'
import {Form, Input, Row, Col, Tabs, Radio, Slider, InputNumber, Button} from 'antd'
import {IFormCompDataList, IFormCompOptions} from "../FormCompDataList";
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons'
import update from 'immutability-helper'
import {SvgIcon} from "../../../components";
import styles from '../index.module.less'
import {FormInstance} from "antd/es/form";

interface CompConfFormProps {
  item: IFormCompDataList;
  onValuesChange?: (formData: any) => void;
  currentId: string;
}
interface TabRenderProps {
  comp: string;
  SPAN: number;
  form: FormInstance;
  options?: IFormCompOptions[];
  handleOptionsChange?(value: string, label: string, index: number): void;
  updateOptionsItem?(isAdd: boolean, index?: number): void;
}

const CompConfForm:React.FC<CompConfFormProps> = (props: CompConfFormProps) => {
  const { item , onValuesChange, currentId } = props;
  const { comp, options } = item;
  const [form] = Form.useForm();
  const SPAN = 12;

  /**
   * currentId变化重制一下表单
   */
  useEffect(() => {
    form.resetFields();
  }, [form, currentId]);

  /**
   * 新增删除options
   * @param isAdd
   * @param index
   */
  const updateOptionsItem = (isAdd: boolean, index?: number): void => {
    let record: IFormCompDataList = update(item, {});
    if (onValuesChange) {
      onValuesChange(update(record, {
        options: { $set: isAdd ? [...record.options|| [], { label: '', value: '' }] : record.options?.filter((v: any, i: number) => i !== index) }
      }))
    }
  };

  /**
   * options input变化
   * @param val
   * @param key
   * @param index
   */
  const handleOptionsChange = (val: any, key: string, index: number) => {
    if (onValuesChange) {
      onValuesChange(update(item, {
        options: {
          [index]: {
            [key]: { $set: val }
          }
        }
      }));
    }
  };

  return(
    <Form onValuesChange={(filed: any, formData: any) => onValuesChange ? onValuesChange(formData) : null}
          size="small"
          layout="vertical"
          form={form}
          initialValues={update(item, {})}>
      <Tabs tabPosition="top">
        <Tabs.TabPane key="basic" tab={<span className={styles.TabTitleItem}><SvgIcon type="basic" />基础设置</span>}>
          <RenderBasic comp={comp} SPAN={SPAN} form={form} options={options} handleOptionsChange={handleOptionsChange} updateOptionsItem={updateOptionsItem} />
        </Tabs.TabPane>

        <Tabs.TabPane key="itemAttr" tab={<span className={styles.TabTitleItem}><SvgIcon type="controller" />控件设置</span>}>
          <RenderItemAttr comp={comp} SPAN={SPAN} form={form} />
        </Tabs.TabPane>

        <Tabs.TabPane key="inputAttr" tab={<span className={styles.TabTitleItem}><SvgIcon type="form" />表单设置</span>}>
          <RenderInputAttr comp={comp} SPAN={SPAN} form={form} />
        </Tabs.TabPane>

        <Tabs.TabPane key="style" tab={<span className={styles.TabTitleItem}><SvgIcon type="css" />样式设置</span>}>
          <RenderStyle comp={comp} SPAN={SPAN} form={form} />
        </Tabs.TabPane>
      </Tabs>
    </Form>
  )
};

/**
 * 渲染基础设置
 */
const RenderBasic:React.FC<TabRenderProps> = (props: TabRenderProps) => {
  const { SPAN, comp, options, handleOptionsChange, updateOptionsItem } = props;

  return(
    <Row gutter={24}>
      <Col span={SPAN}>
        <Form.Item label="控件名称"
                   name="title"
                   rules={[{ required: true, message: '请输入标题' }]}>
          <Input />
        </Form.Item>
      </Col>

      <Col span={SPAN}>
        <Form.Item label="控件字段名" name="name" rules={[{ required: true, message: '请输入控件字段名' }]}>
          <Input />
        </Form.Item>
      </Col>

      {['RadioGroup', 'CheckboxGroup', 'Select'].indexOf(comp) > -1 ?
        <Col span={SPAN * 2}>
          <Form.Item label="选项设置">
            {options?.map((opt:IFormCompOptions, index: number) => {
              return(
                <Input.Group compact key={index + ''} style={{ marginBottom: '6px' }}>
                  <Input style={{ width: 'calc(50% - 12px)' }}
                         onChange={(e) => handleOptionsChange && handleOptionsChange(e.target.value, 'label', index)}
                         placeholder="输入展示文案"
                         value={opt.label} />
                  <Input style={{ width: 'calc(50% - 12px)' }}
                         onChange={(e) => handleOptionsChange && handleOptionsChange(e.target.value, 'value', index)}
                         placeholder="输入返回值"
                         value={opt.value} />
                  <Button shape="circle"
                          onClick={() => updateOptionsItem && updateOptionsItem(false, index)}
                          icon={<DeleteOutlined />} />
                </Input.Group>
              )
            })}
            <Button type="primary" ghost onClick={() => updateOptionsItem && updateOptionsItem(true)} style={{ width: '100%' }} icon={<PlusOutlined />} />
          </Form.Item>
        </Col> : null
      }
    </Row>
  )
};

/**
 * 渲染itemAttr设置
 */
const RenderItemAttr: React.FC<TabRenderProps> = (props: TabRenderProps) => {
  const { SPAN, form } = props;
  const required = form.getFieldValue(["itemAttr", "rules", 0, "required"]);
  return (
    <Row gutter={24}>
      <Col span={SPAN}>
        <Form.Item label="是否必填" name={["itemAttr", "rules", 0, "required"]} rules={[{ required: true, message: '请选择是否必填' }]}>
          <Radio.Group>
            <Radio.Button value={true}>是</Radio.Button>
            <Radio.Button value={false}>否</Radio.Button>
          </Radio.Group>
        </Form.Item>
      </Col>

      <Col span={SPAN}>
        <Form.Item label="空格验证" name={["itemAttr", "rules", 0, "whitespace"]}>
          <Radio.Group>
            <Radio.Button value={true}>开启</Radio.Button>
            <Radio.Button value={false}>关闭</Radio.Button>
          </Radio.Group>
        </Form.Item>
      </Col>

      {required === undefined || required ?
        <>
          <Col span={SPAN}>
            <Form.Item label="为空时提示" name={["itemAttr", "rules", 0, "message"]} rules={[{ required: true, message: '请输入为空时提示' }]}>
              <Input />
            </Form.Item>
          </Col>

          <Col span={SPAN}>
            <Form.Item label="验证开启右侧图标反馈" name={["itemAttr", "hasFeedback"]}>
              <Radio.Group>
                <Radio.Button value={true}>开启</Radio.Button>
                <Radio.Button value={false}>关闭</Radio.Button>
              </Radio.Group>
            </Form.Item>
          </Col>
        </>: null
      }
    </Row>
  )
};

/**
 * 表单设置
 */
const RenderInputAttr: React.FC<TabRenderProps> = (props: TabRenderProps) => {
  const { SPAN, comp, form } = props;
  return (
    <Row gutter={24}>
      <Col span={SPAN}>
        <Form.Item label="是否禁用" name={["inputAttr", "disabled"]} rules={[{ required: true, message: '请选择是否禁用' }]}>
          <Radio.Group>
            <Radio.Button value={false}>启用</Radio.Button>
            <Radio.Button value={true}>禁用</Radio.Button>
          </Radio.Group>
        </Form.Item>
      </Col>

      <Col span={SPAN}>
        {['DatePickerRange', 'TimePickerRange'].indexOf(comp) > -1 ?
          <Form.Item label="placeholder">
            <Input.Group compact>
              <Form.Item noStyle name={["inputAttr", "placeholder", 0]}>
                <Input style={{ width: '50%' }} />
              </Form.Item>
              <Form.Item noStyle name={["inputAttr", "placeholder", 1]}>
                <Input style={{ width: '50%' }} />
              </Form.Item>
            </Input.Group>
          </Form.Item> :
          <Form.Item label="placeholder" name={["inputAttr", "placeholder"]}>
            <Input />
          </Form.Item>
        }
      </Col>

      {['Input', 'InputPassword', 'InputTextArea'].indexOf(comp) > -1 ?
        <>
          <Col span={SPAN}>
            <Form.Item label="最大字符数" name={["inputAttr", "maxLength"]}>
              <InputNumber min={1} max={10000} />
            </Form.Item>
          </Col>
        </>: null
      }

      {['Input'].indexOf(comp) > -1 ?
        <>
          <Col span={SPAN}>
            <Form.Item label="前缀追加文案" name={["inputAttr", "prefix"]}>
              <Input />
            </Form.Item>
          </Col>

          <Col span={SPAN}>
            <Form.Item label="后缀追加文案" name={["inputAttr", "suffix"]}>
              <Input />
            </Form.Item>
          </Col>
        </> : null
      }

      {['InputTextArea'].indexOf(comp) > -1 ?
        <Col span={SPAN}>
          <Form.Item label="最大行数" name={["inputAttr", "rows"]}>
            <Slider min={1} max={24} />
          </Form.Item>
        </Col> : null
      }

      {['Select', 'Cascader'].indexOf(comp) > -1 ?
        <Col span={SPAN}>
          <Form.Item label="开启搜索" name={["inputAttr", "showSearch"]} rules={[{ required: true, message: '请选择是否开启' }]}>
            <Radio.Group>
              <Radio.Button value={true}>开启</Radio.Button>
              <Radio.Button value={false}>关闭</Radio.Button>
            </Radio.Group>
          </Form.Item>
        </Col> : null
      }

      {['DatePicker', 'DatePickerRange'].indexOf(comp) > -1 ?
        <Col span={SPAN}>
          <Form.Item label="选择模式" name={["inputAttr", "picker"]} rules={[{ required: true, message: '请选择模式' }]}>
            <Radio.Group>
              <Radio.Button value="date">日</Radio.Button>
              <Radio.Button value="week">周</Radio.Button>
              <Radio.Button value="month">月</Radio.Button>
              <Radio.Button value="quarter">季度</Radio.Button>
              <Radio.Button value="year">年</Radio.Button>
            </Radio.Group>
          </Form.Item>
        </Col> : null
      }

      {['DatePicker', 'DatePickerRange'].indexOf(comp) > -1 && form.getFieldValue(["inputAttr", "picker"]) === "date" ?
        <Col span={SPAN}>
          <Form.Item label="显示时间" name={["inputAttr", "showTime"]} rules={[{ required: true, message: '请选择是否显示时间' }]}>
            <Radio.Group>
              <Radio.Button value={true}>显示</Radio.Button>
              <Radio.Button value={false}>隐藏</Radio.Button>
            </Radio.Group>
          </Form.Item>
        </Col> : null
      }

      {['TimePicker', 'TimePickerRange'].indexOf(comp) > -1 ?
        <Col span={SPAN}>
          <Form.Item label="时间格式" name={["inputAttr", "format"]} rules={[{ required: true, message: '请选择时间格式' }]}>
            <Radio.Group>
              <Radio.Button value="HH:mm:ss">时分秒</Radio.Button>
              <Radio.Button value="HH:mm">时分</Radio.Button>
              <Radio.Button value="HH">时</Radio.Button>
            </Radio.Group>
          </Form.Item>
        </Col> : null
      }
    </Row>
  )
};

/**
 * 控件样式
 */
const RenderStyle: React.FC<TabRenderProps> = (props: TabRenderProps) => {
  const { SPAN } = props;
  return (
    <Row gutter={24}>
      <Col span={SPAN}>
        <Form.Item label="控件宽度(权重比全局高)" name={['style', 'width']}>
          <Slider min={1} max={100} />
        </Form.Item>
      </Col>

      <Col span={SPAN}>
        <Form.Item label="Label比例(权重比全局高)" name={['itemAttr', 'labelCol', 'span']}>
          <Slider min={1} max={24} />
        </Form.Item>
      </Col>

      <Col span={SPAN}>
        <Form.Item label="表单比例(权重比全局高)" name={['itemAttr', 'wrapperCol', 'span']}>
          <Slider min={1} max={24} />
        </Form.Item>
      </Col>
    </Row>
  )
};


export default CompConfForm;
