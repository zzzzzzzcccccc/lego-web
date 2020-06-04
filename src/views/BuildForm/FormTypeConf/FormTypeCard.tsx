import React from 'react'
import styles from '../index.module.less'
import {IFormType} from "../../../conf/FormTypeList";
import {Button, Space} from 'antd'

export interface FormTypeCardProps {
  record: IFormType
}

const FormTypeCard: React.FC<FormTypeCardProps> = (props: FormTypeCardProps) => {
  const { record } = props;
  return(
    <div className={styles.FormTypeConfItem}>
      <div className={styles.FormTypeConfItemTitle}>{record.title}</div>
      <div className={styles.FormTypeConfItemList}>
        <Space direction="vertical" style={{ width: '100%' }}>
          {record.list.map(item => {
            return(
              <div className={styles.FormTypeConfItemListInfo} key={item.title}>
                <Button style={{ width: '100%' }} type="primary" size="small">{item.title}</Button>
              </div>
            )
          })}
        </Space>
      </div>
    </div>
  )
};

export default FormTypeCard;
