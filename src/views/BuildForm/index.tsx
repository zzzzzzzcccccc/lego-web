import React from 'react';
import styles from './index.module.less'
import FormComp from "./Children/FormComp/FormComp";
import FormEditor from "./Children/FormEditor/FormEditor";
import FormAttrSetting from "./Children/FormAttrSetting/FormAttrSetting";
import { Button, Drawer } from 'antd'
import { observer } from 'mobx-react'
import useStore from "../../utils/useStore";
import {IBuildForm} from "../../store/modules/BuildForm/interface";
import PreViewForm from "./FormComponents/PreViewForm";

const BuildForm:React.FC = () => {
  const { preViewVisible, setPreViewVisible, buildingFormList, globalFormConfig }: IBuildForm = useStore('buildForm');

  return(
    <div className={styles.BuildForm}>
      <div className={styles.BuildFormNav}>
        <Button onClick={() => setPreViewVisible(true)}>预览</Button>
      </div>
      <div className={styles.BuildFormContainer}>
        <FormComp />
        <FormEditor />
        <FormAttrSetting />
      </div>

      <Drawer title="预览"
              onClose={() => setPreViewVisible(false)}
              destroyOnClose
              width={1000}
              visible={preViewVisible}>
        <PreViewForm formList={buildingFormList} formConfig={globalFormConfig} />
      </Drawer>
    </div>
  )
};

export default observer(BuildForm);
