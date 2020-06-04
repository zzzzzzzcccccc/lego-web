import React from 'react'
import { inject, observer } from 'mobx-react'
import styles from './index.module.less'
import { HomeProps, HomeState } from "./interface";

@inject('home')
@observer
class Home extends React.Component<HomeProps, HomeState> {

  render() {
    const { home: { tabList } } = this.props;
    console.log(tabList)
    return(
      <div className={styles.wrapper}>
        <section>
          {tabList.map(item => <span key={item.path}>{item.tab}</span>)}
        </section>
      </div>
    )
  }
}

export default Home;
