import React, {Fragment} from 'react'
import styles from '../index.module.less'
import { ReactSortable } from 'react-sortablejs'
import useStore from "../../../utils/useStore";
import { observer } from 'mobx-react'
import {IBuildForm} from "../../../store/modules/BuildForm/interface";
import { Input, InputNumber, Form, Radio, Checkbox, Select, Cascader, Button, DatePicker } from 'antd'
import {IFormCompDataList} from "./FormCompDataList";
import { v4 as uuidV4 } from 'uuid'
import locale from 'antd/es/date-picker/locale/zh_CN';
import 'moment/locale/zh-cn';

const GlobalComponent:any = {
  Input,
  InputPassword: Input.Password,
  InputNumber,
  InputTextArea: Input.TextArea,
};
const CONTAINER_CONTROL: string = 'containerControl';
const INPUT_CONTROL: string = 'inputControl';
const SELECT_CONTROL: string = 'selectControl';

const RADIO_GROUP: string = 'RadioGroup';
const CHECKBOX_GROUP: string =  'CheckboxGroup';
const SELECT:string = 'Select';
const CASCADER: string = 'Cascader';
const DATEPICKER: string = 'DatePicker';
const RANGEPICKER: string = 'RangePicker';

const FormEditor:React.FC = () => {
  const { buildingFormList, setBuildingFormList, globalFormConfig }:IBuildForm = useStore('buildForm');
  const [form] = Form.useForm();

  const renderFormInput = (index:number) : React.ReactNode => { // 渲染表单
    const item: IFormCompDataList = {...buildingFormList[index]};
    const ComponentInfo = GlobalComponent[item.comp];
    const { itemAttr, inputAttr, type, comp, options } = item;
    const renderControl = () => {
      switch (type) {
        case INPUT_CONTROL:
          return <ComponentInfo {...inputAttr || {}} />;
        case SELECT_CONTROL:
          return selectControlMap()[comp] || null
      }
    };
    return(
      <Form.Item label={item.title}
                 data-id={item.id}
                 name={item.name}
                 hasFeedback={!!itemAttr.hasFeedback}
                 rules={itemAttr.rules}>
        {renderControl()}
      </Form.Item>
    );

    function selectControlMap() : any {
      return {
        [RADIO_GROUP]: (
          <Radio.Group {...inputAttr || {}}>
            {options?.map((item) => <Radio value={item.value} key={item.value}>{item.label}</Radio>)}
          </Radio.Group>
        ),
        [CHECKBOX_GROUP]: (
          <Checkbox.Group {...inputAttr || {}}>
            {options?.map((item) => <Checkbox value={item.value} key={item.value}>{item.label}</Checkbox>)}
          </Checkbox.Group>
        ),
        [SELECT]: (
          <Select {...inputAttr || {}}
                  filterOption={(input: string, option: any) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
            {options?.map((item) => <Select.Option value={item.value} key={item.value}>{item.label}</Select.Option>)}
          </Select>
        ),
        [CASCADER]: (
          <Cascader options={options} {...inputAttr || {}} />
        ),
        [DATEPICKER]: (
          <DatePicker locale={locale} {...inputAttr || {}} />
        ),
        [RANGEPICKER]: (
          <DatePicker.RangePicker locale={locale}  {...inputAttr || {}} />
        )
      }
    }
  };

  const renderFormContainer = (index:number) : React.ReactNode => { // 渲染容器
    return (
      <div>www</div>
    )
  };

  const setList = (list:any[]) => {
    let cloneList = JSON.parse(JSON.stringify(list));
    for (let i = 0; i < list.length; i++) {
      if (!cloneList[i].id)
        cloneList[i].id = uuidV4();
      if (!cloneList[i].name)
        cloneList[i].name = uuidV4();
    }
    setBuildingFormList(cloneList);
  };

  const onAdd = () : void => form.resetFields();
  const onEnd = () : void => form.resetFields();

  return(
    <section className={styles.FormEditor}>
      <Button onClick={() => form.validateFields().then(data => console.log(data))}>tijiao</Button>
      <Form className={styles.FormInfo}
            form={form}
            {...globalFormConfig}
            onFinish={(values) => console.log(values)}>
        <ReactSortable group={{ name: 'editor', pull: true, put: true }}
                       animation={150}
                       fallbackOnBody
                       onAdd={onAdd}
                       onEnd={onEnd}
                       className={styles.Sortable}
                       list={[...buildingFormList]}
                       setList={setList}>
          {[...buildingFormList].map((item:IFormCompDataList, index:number) => {
            return(
              <Fragment key={item.id}>
                {item.type === CONTAINER_CONTROL ? renderFormContainer(index) : renderFormInput(index)}
              </Fragment>
            )
          })}
        </ReactSortable>
      </Form>
    </section>
  )
};

export default observer(FormEditor);
