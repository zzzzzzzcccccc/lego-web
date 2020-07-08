import React from 'react';
import styles from './index.module.less'
import FormComp from "./Children/FormComp";
import FormEditor from "./Children/FormEditor";
import FormAttrSetting from "./Children/FormAttrSetting";

const BuildForm:React.FC = () => {

  return(
    <div className={styles.BuildForm}>
      <FormComp />
      <FormEditor />
      <FormAttrSetting />
    </div>
  )
};

export default BuildForm;
