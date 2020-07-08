import { observable, action } from 'mobx'
import {IBuildForm} from "./interface";

const DefaultGlobalFormConfig: any = {
  size: undefined,
  layout: 'horizontal',
  labelAlign: 'right',
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
};

class BuildForm implements IBuildForm {
  /**
   * 当前被拖拽的表单list
   */
  @observable
  buildingFormList = [];

  @action.bound
  setBuildingFormList(list: never[]): void {
    this.buildingFormList = list;
  }

  /**
   * 全局拖拽表单参数
   */
  @observable
  globalFormConfig = DefaultGlobalFormConfig;

  @action.bound
  setGlobalFormConfig(obj: any): void {
    this.globalFormConfig = obj
  }

  /**
   * 当前激活的表单id
   */
  @observable
  currentId = '';

  @action.bound
  setCurrentId(id: string): void {
    this.currentId = id;
  }

  /**
   * 左侧拖拽容器是否打开
   */
  @observable
  compVisible = true;

  @action.bound
  setCompVisible(bool: boolean): void {
    this.compVisible = bool;
  }

  /**
   * 右侧设置容器是否打开
   */
  @observable
  confVisible = true;

  @action.bound
  setConfVisible(bool: boolean): void {
    this.confVisible = bool;
  }
}

export default BuildForm;
