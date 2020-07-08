import React from 'react'
import { MobXProviderContext } from 'mobx-react'

const useStore = (storeModuleName: string) => {
  return React.useContext(MobXProviderContext)[storeModuleName];
};

export default useStore;
