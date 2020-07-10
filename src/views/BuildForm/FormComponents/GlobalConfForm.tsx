import React from 'react'
import {Form, Radio, Slider} from 'antd'

interface GlobalConfFormProps {
  onValuesChange?(changeFiled: any, formData: any): void;
  initialValues?: any;
  size?: 'small' | 'default' | 'large' | undefined | any;
}

const GlobalConfForm:React.FC<GlobalConfFormProps> = (props: GlobalConfFormProps) => {
  const { onValuesChange, initialValues, size } = props;

  return(
    <Form labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          size={size}
          initialValues={initialValues}
          onValuesChange={onValuesChange}>
      <Form.Item label="表单尺寸" name="size">
        <Radio.Group buttonStyle="solid">
          <Radio.Button value="small">Small</Radio.Button>
          <Radio.Button value={undefined}>Default</Radio.Button>
          <Radio.Button value="large">Large</Radio.Button>
        </Radio.Group>
      </Form.Item>

      <Form.Item label="表单布局" name="layout">
        <Radio.Group buttonStyle="solid">
          <Radio.Button value="horizontal">Horizontal</Radio.Button>
          <Radio.Button value="vertical">Vertical</Radio.Button>
          <Radio.Button value="inline">Inline</Radio.Button>
        </Radio.Group>
      </Form.Item>

      <Form.Item label="Label对齐方式" name="labelAlign">
        <Radio.Group buttonStyle="solid">
          <Radio.Button value="left">Left</Radio.Button>
          <Radio.Button value="right">Right</Radio.Button>
        </Radio.Group>
      </Form.Item>

      <Form.Item label="控件宽度" name="formWidth">
        <Slider min={1} max={100} step={1} />
      </Form.Item>

      <Form.Item label="Label比例" name={["labelCol", "span"]}>
        <Slider min={1} max={24} step={1} />
      </Form.Item>

      <Form.Item label="表单比例" name={["wrapperCol", "span"]}>
        <Slider min={1} max={24} step={1} />
      </Form.Item>
    </Form>
  )
};

GlobalConfForm.defaultProps = {
  size: 'small'
};

export default GlobalConfForm;
