export interface ITab {
  tab: string | JSX.Element;
  path: string;
}

export interface IHome {
  tabList: Array<ITab>;
}
