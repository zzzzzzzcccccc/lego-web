import React from 'react';
import styles from './index.module.less'
import FormComp from "./Children/FormComp/FormComp";
import FormEditor from "./Children/FormEditor/FormEditor";
import FormAttrSetting from "./Children/FormAttrSetting/FormAttrSetting";
import { Button, Drawer, Space, message } from 'antd'
import { observer } from 'mobx-react'
import useStore from "../../utils/useStore";
import {IBuildForm} from "../../store/modules/BuildForm/interface";
import PreViewForm from "./FormComponents/PreViewForm";
import {createFileBlob} from "../../utils/createFileBlob";
import formCodeTemplate from "./FormComponents/formCodeTemplate";
import {IFormCompDataList} from "./FormCompDataList";
import {EditorCode} from "../../components";

const NOT_FORM_LIST_MESSAGE: string = '请先拖拽设计表单';

const BuildForm:React.FC = () => {
  const { preViewVisible, setPreViewVisible, buildingFormList, globalFormConfig, preCodeVisible, setPreCodeVisible }: IBuildForm = useStore('buildForm');
  const formList: IFormCompDataList[] = JSON.parse(JSON.stringify(buildingFormList));
  const code = formCodeTemplate.getCode(formList, globalFormConfig);
  /**
   * 导出源码
   */
  const exportCode = (): void => {
    if (formList.length === 0) {
      message.warning(NOT_FORM_LIST_MESSAGE);
      return;
    }
    createFileBlob(code, 'index.js')
  };

  return(
    <div className={styles.BuildForm}>
      <div className={styles.BuildFormNav}>
        <div className={styles.BuildFormNavLeft}>
        </div>
        <Space className={styles.BuildFormNavRight}>
          <Button type="primary" onClick={() => setPreViewVisible(true)}>预览</Button>
          <Button type="primary" onClick={exportCode}>导出源码</Button>
          <Button type="primary" onClick={() => formList.length === 0 ? message.warning(NOT_FORM_LIST_MESSAGE) : setPreCodeVisible(true)}>查看源码</Button>
        </Space>
      </div>
      <div className={styles.BuildFormContainer}>
        <FormComp />
        <FormEditor />
        <FormAttrSetting />
      </div>

      <Drawer title="预览"
              onClose={() => setPreViewVisible(false)}
              destroyOnClose
              width={1200}
              visible={preViewVisible}>
        <PreViewForm formList={buildingFormList} formConfig={globalFormConfig} />
      </Drawer>

      <Drawer title="查看源码"
              visible={preCodeVisible}
              destroyOnClose
              width={1200}
              onClose={() => setPreCodeVisible(false)}>
        <EditorCode defaultValue={code} />
      </Drawer>
    </div>
  )
};

export default observer(BuildForm);
