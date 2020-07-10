import React from 'react'
import styles from "../../index.module.less"
import FormCompData from "../../FormCompDataList";
import { ReactSortable }  from 'react-sortablejs'
import { Button } from 'antd'
import { observer } from 'mobx-react'
import useStore from "../../../../utils/useStore";
import {IBuildForm} from "../../../../store/modules/BuildForm/interface";

const FormComp:React.FC = () => {
  const { compVisible }: IBuildForm = useStore('buildForm');

  return(
    <section className={`${styles.FormComp} ${compVisible ? '' : styles.FormCompHide}`}>
      {FormCompData.map((item) => {
        return(
          <div key={item.title} className={styles.FormCompItem}>
            <h3>{item.title}</h3>
            <ReactSortable list={item.list}
                           className={styles.FormCompInfo}
                           setList={() => null}
                           sort={false}
                           group={{ name: 'editor', pull: 'clone', put: false }}>
              {item.list.map((info) => {
                return(
                  <div className={styles.FormCompInfoItem} key={info.comp} data-item={JSON.stringify(info)}>
                    <Button type="primary" className="w100">{info.title}</Button>
                  </div>
                )
              })}
            </ReactSortable>
          </div>
        )
      })}
    </section>
  )
};

export default observer(FormComp);
