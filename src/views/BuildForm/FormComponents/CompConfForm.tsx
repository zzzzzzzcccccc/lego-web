import React, { useEffect } from 'react'
import {Form, Input, Row, Col, Tabs, Radio, Slider, InputNumber} from 'antd'
import {IFormCompDataList} from "../FormCompDataList";

interface CompConfFormProps {
  item: IFormCompDataList;
  onValuesChange?(a: any, b: any): void;
  currentId: string;
}

const CompConfForm:React.FC<CompConfFormProps> = (props: CompConfFormProps) => {
  const { item , onValuesChange, currentId } = props;
  const { comp } = item;
  const [form] = Form.useForm();
  const SPAN = 12;
  console.log(props.item, 'qq');

  useEffect(() => {
    form.resetFields();
  }, [currentId, form]);

  /**
   * 渲染基础设置
   */
  const renderBasic = (): React.ReactNode => {
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
      </Row>
    )
  };

  /**
   * 渲染itemAttr设置
   */
  const renderItemAttr = (): React.ReactNode => {
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
  const renderInputAttr = (): React.ReactNode => {
    return (
      <Row gutter={24}>
        <Col span={SPAN}>
          <Form.Item label="是否禁用" name={["inputAttr", "disabled"]}>
            <Radio.Group>
              <Radio.Button value={false}>启用</Radio.Button>
              <Radio.Button value={true}>禁用</Radio.Button>
            </Radio.Group>
          </Form.Item>
        </Col>

        <Col span={SPAN}>
          <Form.Item label="placeholder" name={["inputAttr", "placeholder"]}>
            <Input />
          </Form.Item>
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
      </Row>
    )
  };

  /**
   * 控件样式
   */
  const renderStyle = (): React.ReactNode => {
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

  return(
    <Form onValuesChange={onValuesChange}
          size="small"
          layout="vertical"
          form={form}
          initialValues={{...item}}>
      <Tabs tabPosition="top">
        <Tabs.TabPane key="basic" tab="基础设置">
          {renderBasic()}
        </Tabs.TabPane>

        <Tabs.TabPane key="itemAttr" tab="控件设置">
          {renderItemAttr()}
        </Tabs.TabPane>

        <Tabs.TabPane key="inputAttr" tab="表单设置">
          {renderInputAttr()}
        </Tabs.TabPane>

        <Tabs.TabPane key="style" tab="样式设置">
          {renderStyle()}
        </Tabs.TabPane>
      </Tabs>
    </Form>
  )
};

export default CompConfForm;
