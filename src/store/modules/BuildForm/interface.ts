export interface IBuildForm {
  buildingFormList: any[];
  setBuildingFormList(list: any[]): void;

  globalFormConfig: any;
  setGlobalFormConfig(obj: any): void;

  currentId?: string;
  setCurrentId(id: string): void;

  compVisible: boolean;
  setCompVisible(bool:boolean): void;

  confVisible: boolean;
  setConfVisible(bool:boolean): void;
}
