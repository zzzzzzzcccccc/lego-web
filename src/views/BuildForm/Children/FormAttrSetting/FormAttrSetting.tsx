import React from 'react'
import styles from '../../index.module.less'
import FormAttrSettingGlobal from "./FormAttrSettingGlobal";
import FormAttrSettingComp from "./FormAttrSettingComp";
import { Collapse } from 'antd'
import { observer } from 'mobx-react'
import useStore from "../../../../utils/useStore";
import {IBuildForm} from "../../../../store/modules/BuildForm/interface";

const { Panel } = Collapse;

const FormAttrSetting:React.FC = () => {
  const { confVisible }:IBuildForm = useStore('buildForm');

  return(
    <section className={`${styles.FormAttrSetting} ${confVisible ? '' : styles.FormAttrSettingHide}`}>
      <div>
        <Collapse defaultActiveKey={["0", "1"]}>
          <Panel key="0" header="全局设置" forceRender><FormAttrSettingGlobal /></Panel>
          <Panel key="1" header="控件设置" forceRender><FormAttrSettingComp /></Panel>
        </Collapse>
      </div>
    </section>
  )
};

export default observer(FormAttrSetting);
