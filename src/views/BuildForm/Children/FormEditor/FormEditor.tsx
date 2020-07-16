import React from 'react'
import styles from '../../index.module.less'
import { ReactSortable } from 'react-sortablejs'
import useStore from "../../../../utils/useStore";
import { observer } from 'mobx-react'
import {IBuildForm} from "../../../../store/modules/BuildForm/interface";
import { Input, InputNumber, Form, Popconfirm, message } from 'antd'
import {IFormCompDataList} from "../../FormCompDataList";
import { v4 as uuidV4 } from 'uuid'
import update from 'immutability-helper'
import FormControlMap from "../../FormComponents/FormControlMap";

const GlobalComponent:any = {
  Input,
  InputPassword: Input.Password,
  InputNumber,
  InputTextArea: Input.TextArea,
};
const INPUT_CONTROL: string = 'inputControl';

const FormEditor:React.FC = () => {
  const { buildingFormList, setBuildingFormList, globalFormConfig, currentId, setCurrentId }:IBuildForm = useStore('buildForm');
  const [form] = Form.useForm();

  const onDelete = (id: string): void => {
    const list = JSON.parse(JSON.stringify(buildingFormList));
    setBuildingFormList(list.filter((v: IFormCompDataList) => v.id !== id));
    if (id === currentId) {
      setCurrentId('')
    }
    message.success('控件已删除');
  };

  /**
   * 新增拖拽
   * @param event
   */
  const onAdd = (event: any) : void => {
    const { clone, newIndex } = event;
    const list = JSON.parse(JSON.stringify(buildingFormList));
    const currentId = uuidV4();
    const item = update(JSON.parse(clone.getAttribute('data-item')), { id: { $set: currentId }, name: { $set: uuidV4() } });
    setBuildingFormList([...list.slice(0, newIndex), item, ...list.slice(newIndex, list.length)], currentId);
    form.resetFields();
  };

  /**
   * 拖拽排序
   * @param event
   */
  const onEnd = (event: any) : void => {
    const { newIndex, oldIndex } = event;
    const list = JSON.parse(JSON.stringify(buildingFormList));
    setBuildingFormList(update(list, { [newIndex]: { $set: list[oldIndex] }, [oldIndex]: { $set: list[newIndex] } }), list[oldIndex].id);
    form.resetFields();
  };
  const formConf:any = {...globalFormConfig};

  // 移除antd form里没有的interface
  delete formConf.formWidth;

  return(
    <section className={styles.FormEditor}>
      <Form className={styles.FormInfo}
            form={form}
            {...formConf}>
        <ReactSortable group={{ name: 'editor', pull: true, put: true }}
                       animation={150}
                       className={styles.FormInfoDrager}
                       onAdd={onAdd}
                       onEnd={onEnd}
                       list={[...buildingFormList]}
                       setList={() => null}>
          {[...buildingFormList].map((item:IFormCompDataList) => {
            const ComponentInfo = GlobalComponent[item.comp];
            const { itemAttr, inputAttr, type, id, style } = item;

            return(
              <Popconfirm title="确认移除这个控件吗?"
                          key={id}
                          onConfirm={() => onDelete(id || '')}
                          trigger="contextMenu"
                          placement="leftBottom">
                <div onClick={() => setCurrentId(id || '')}
                     className={`${styles.FormInfoDragerItem} ${currentId === id ? styles.FormInfoDragerItemSelected : ''}`}
                     style={{ ...style || {}, width: `${style?.width || globalFormConfig.formWidth}%` }}>
                  <Form.Item label={item.title}
                             data-id={item.id}
                             name={item.name}
                             labelCol={itemAttr.labelCol || undefined}
                             wrapperCol={itemAttr.wrapperCol || undefined}
                             hasFeedback={!!itemAttr.hasFeedback}
                             rules={itemAttr.rules}>
                    {type === INPUT_CONTROL ? <ComponentInfo {...inputAttr || {}} style={{ width: '100%' }} /> : <FormControlMap item={item} />}
                  </Form.Item>
                </div>
              </Popconfirm>
            )
          })}
        </ReactSortable>
      </Form>
    </section>
  )
};

export default observer(FormEditor);
