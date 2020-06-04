import React from 'react'
import {BuildFormProps, BuildFormState} from "./interface";
import styles from './index.module.less'
import FormTypeConf from "./FormTypeConf";
import FormEdit from "./FormEdit";
import FormPropsConf from "./FormPropsConf";
import {inject, observer} from "mobx-react";

@inject('buildForm')
@observer
class BuildForm extends React.Component<BuildFormProps, BuildFormState> {

  render() {
    return(
      <div className={styles.wrapper}>
        <FormTypeConf />
        <FormEdit />
        <FormPropsConf />
      </div>
    )
  }
}

export default BuildForm
