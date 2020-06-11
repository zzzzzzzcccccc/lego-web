import React from 'react'
import styles from '../index.module.less'
import {FormTypeConfProps, FormTypeConfState} from "./interface";
import {FORM_TYPE_LIST} from "../../../conf";
import FormTypeCard from "./FormTypeCard";

class FormTypeConf extends React.Component<FormTypeConfProps, FormTypeConfState> {

  render() {
    return (
      <section className={styles.FormTypeConf}>
        {FORM_TYPE_LIST.map(item => <FormTypeCard key={item.title} record={item} />)}
      </section>
    )
  }
}

export default FormTypeConf;
