import React from 'react'
import styles from '../index.module.less'
import {FormEditProps, FormEditState} from "./interface";

class FormEdit extends React.Component<FormEditProps, FormEditState> {

  render() {
    return (
      <section className={styles.FormEdit}>
      </section>
    )
  }
}

export default FormEdit;
