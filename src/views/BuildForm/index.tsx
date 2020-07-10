import React from 'react';
import styles from './index.module.less'
import FormComp from "./Children/FormComp/FormComp";
import FormEditor from "./Children/FormEditor/FormEditor";
import FormAttrSetting from "./Children/FormAttrSetting/FormAttrSetting";

const BuildForm:React.FC = () => {

  return(
    <div className={styles.BuildForm}>
      <div className={styles.BuildFormNav}>
      </div>
      <div className={styles.BuildFormContainer}>
        <FormComp />
        <FormEditor />
        <FormAttrSetting />
      </div>
    </div>
  )
};

export default BuildForm;
