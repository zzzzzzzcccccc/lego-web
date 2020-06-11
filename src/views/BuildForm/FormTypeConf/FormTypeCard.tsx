import React from 'react'
import styles from '../index.module.less'
import {IFormType} from "../../../conf/FormTypeList";
import {Button, Space} from 'antd'
import {DragBox} from "../../../components";

export interface FormTypeCardProps {
  record: IFormType
}

const FormTypeCard: React.FC<FormTypeCardProps> = (props: FormTypeCardProps) => {
  const { record } = props;
  return(
    <div className={styles.FormTypeConfItem}>
      <div className={styles.FormTypeConfItemTitle}>{record.title}</div>
      <div className={styles.FormTypeConfItemList}>
        <Space style={{ width: '100%' }} direction="vertical">
          {record.list.map(item => {
            return(
              <DragBox className={styles.FormTypeConfItemListInfo}
                       key={item.comp}
                       id={item.comp + ''}>
                <Button style={{ width: '100%' }}
                        type="primary"
                        size="small">
                  {item.title}
                </Button>
              </DragBox>
            )
          })}
        </Space>
      </div>
    </div>
  )
};

export default FormTypeCard;
