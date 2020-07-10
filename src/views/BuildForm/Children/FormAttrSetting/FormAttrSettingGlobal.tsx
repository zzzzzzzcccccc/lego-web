import React from 'react'
import styles from '../../index.module.less'
import { observer } from 'mobx-react'
import useStore from "../../../../utils/useStore";
import {IBuildForm} from "../../../../store/modules/BuildForm/interface";
import GlobalConfForm from "../../FormComponents/GlobalConfForm";

const FormAttrSettingGlobal:React.FC = () => {
  const { globalFormConfig, setGlobalFormConfig }: IBuildForm = useStore('buildForm');

  const onValuesChange = (changeFiled: any, formData: any): void => {
    setGlobalFormConfig({...formData});
  };

  return(
    <section className={styles.FormAttrSettingGlobal}>
      <GlobalConfForm onValuesChange={onValuesChange}
                      initialValues={{...globalFormConfig}} />
    </section>
  )
};

export default observer(FormAttrSettingGlobal);
