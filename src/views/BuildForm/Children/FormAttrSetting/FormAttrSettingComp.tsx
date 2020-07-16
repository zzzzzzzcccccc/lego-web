import React  from 'react'
import styles from '../../index.module.less'
import { observer } from 'mobx-react'
import useStore from "../../../../utils/useStore";
import {IBuildForm} from "../../../../store/modules/BuildForm/interface";
import { Empty } from 'antd'
import {IFormCompDataList} from "../../FormCompDataList";
import CompConfForm from "../../FormComponents/CompConfForm";
import update from 'immutability-helper'

const FormAttrSettingComp:React.FC = () => {
  const { currentId, buildingFormList, setBuildingFormList }: IBuildForm = useStore('buildForm');
  if (!currentId) {
    return <Empty description="请选择拖拽后的控件" image={Empty.PRESENTED_IMAGE_SIMPLE} />
  }
  const item: IFormCompDataList = JSON.parse(JSON.stringify(buildingFormList.find(record => record.id === currentId)));

  const onValuesChange = (formData: any): void => {
    const list = JSON.parse(JSON.stringify(buildingFormList));
    const index: number = list.map((v: IFormCompDataList) => v.id).indexOf(currentId);
    setBuildingFormList(update(list, { [index]: { $set: {...formData} } }));
  };

  return(
    <section className={styles.FormAttrSettingComp}>
      <CompConfForm item={item}
                    onValuesChange={onValuesChange}
                    currentId={currentId} />
    </section>
  )
};

export default observer(FormAttrSettingComp);
