export interface IGlobalFormConfig {
  size: 'small' | 'large' | undefined | any,
  layout: 'horizontal',
  labelAlign: 'left' | 'right',
  labelCol: { span: number },
  wrapperCol: { span: number },
  formWidth: number;
}

export interface IBuildForm {
  buildingFormList: any[];
  currentId: string;
  setBuildingFormList(list: any[], currentId?: string): void;
  setCurrentId(id: string): void;

  globalFormConfig: IGlobalFormConfig;
  setGlobalFormConfig(obj: IGlobalFormConfig): void;

  compVisible: boolean;
  setCompVisible(bool:boolean): void;

  confVisible: boolean;
  setConfVisible(bool:boolean): void;
}
