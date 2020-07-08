import React from 'react'
import styles from '../index.module.less'
import {Form, InputNumber, Radio} from 'antd'
import { observer } from 'mobx-react'
import useStore from "../../../utils/useStore";
import {IBuildForm} from "../../../store/modules/BuildForm/interface";

const FormAttrSettingGlobal:React.FC = () => {
  const { globalFormConfig, setGlobalFormConfig }: IBuildForm = useStore('buildForm');
  const [form] = Form.useForm();

  const onValuesChange = (changeFiled: any, formData: any): void => {
    const config = {...formData,
      labelCol: { span: formData.labelColSpan },
      wrapperCol: { span: formData.wrapperColSpan },
    };
    delete config.labelColSpan;
    delete config.wrapperColSpan;
    setGlobalFormConfig(config);
  };

  return(
    <section className={styles.FormAttrSettingGlobal}>
      <Form size="small"
            onValuesChange={onValuesChange}
            initialValues={{ ...globalFormConfig,
              labelColSpan: globalFormConfig.labelCol?.span,
              wrapperColSpan: globalFormConfig.wrapperCol?.span,
              labelCol: undefined,
              wrapperCol: undefined,
            }}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            form={form}>
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

        <Form.Item label="Label比例" name="labelColSpan">
          <InputNumber min={1} max={24} />
        </Form.Item>

        <Form.Item label="表单比例" name="wrapperColSpan">
          <InputNumber min={1} max={24} />
        </Form.Item>
      </Form>
    </section>
  )
};

export default observer(FormAttrSettingGlobal);
