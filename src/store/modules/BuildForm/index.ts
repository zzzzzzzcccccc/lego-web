import { observable, action } from 'mobx'
import {IBuildForm, IGlobalFormConfig} from "./interface";

const DefaultGlobalFormConfig: IGlobalFormConfig = {
  size: undefined,
  layout: 'horizontal',
  labelAlign: 'right',
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
  formWidth: 100
};

class BuildForm implements IBuildForm {
  /**
   * 当前被拖拽的表单list
   */
  @observable
  buildingFormList = [];

  /**
   * 当前激活的表单id
   */
  @observable
  currentId = '';

  @action.bound
  setBuildingFormList(list: never[], id?: string): void {
    this.buildingFormList = list;
    if (id) {
      this.setCurrentId(id)
    }
  }

  @action.bound
  setCurrentId(id: string): void {
    this.currentId = id;
  }

  /**
   * 全局拖拽表单参数
   */
  @observable
  globalFormConfig = DefaultGlobalFormConfig;

  @action.bound
  setGlobalFormConfig(obj: IGlobalFormConfig): void {
    this.globalFormConfig = obj
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

  /**
   * 预览表单弹窗开关
   */
  @observable
  preViewVisible = false;

  @action.bound
  setPreViewVisible(bool: boolean): void {
    this.preViewVisible = bool;
  }

  /**
   * 查看源码弹窗开关
   */
  @observable
  preCodeVisible = false;

  @action.bound
  setPreCodeVisible(bool: boolean): void {
    this.preCodeVisible = bool;
  }
}

export default BuildForm;
