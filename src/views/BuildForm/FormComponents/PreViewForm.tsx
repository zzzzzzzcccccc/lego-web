import React from 'react'
import {IGlobalFormConfig} from "../../../store/modules/BuildForm/interface";
import {IFormCompDataList} from "../FormCompDataList";
import { Form, Empty, Button } from 'antd';
import FormControlMap from "./FormControlMap";

interface PreViewFormProps {
  formList: IFormCompDataList[];
  formConfig: IGlobalFormConfig;
}

const PreViewForm:React.FC<PreViewFormProps> = (props: PreViewFormProps) => {
  const { formList, formConfig } = props;
  const [form] = Form.useForm();
  const globalFormConfig: IGlobalFormConfig = JSON.parse(JSON.stringify(formConfig));

  delete globalFormConfig.formWidth;

  if (formList.length === 0) {
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="请先设计拖拽你的表单" />
  }

  const handleSubmit = ():void => {
    form.validateFields().then((values) => {
    })
  };

  return(
    <section>
      <Form {...globalFormConfig}
            form={form}>
        {formList.map((item: IFormCompDataList) => {
          const { id, style } = item;
          return(
            <div key={id}
                 style={{ ...style, width: `${style?.width || formConfig.formWidth}%`, display: 'inline-block', verticalAlign: 'top' }}>
              <FormControlMap record={item} />
            </div>
          )
        })}
      </Form>

      <div style={{ textAlign: 'center' }}>
        <Button type="primary" onClick={handleSubmit}>提交</Button>
      </div>
    </section>
  )
};

export default PreViewForm;
