import React from 'react'
import styles from '../index.module.less'
import {FormEditProps, FormEditState} from "./interface";
import FormDrop from './FormDrop/FormDrop'
import { inject, observer } from 'mobx-react'

@inject('buildForm')
@observer
class FormEdit extends React.Component<FormEditProps, FormEditState> {

  render() {
    const { buildForm } = this.props;
    return (
      <section className={styles.FormEdit}>
        <FormDrop buildForm={buildForm} />
      </section>
    )
  }
}

export default FormEdit;
