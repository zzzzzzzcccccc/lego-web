import { ITab } from '../store/modules/Home/interface'
import {IFormType} from "./FormTypeList";
import FormTypeList from "./FormTypeList";

/**
 * 顶部tab的list
 */
export const TAB_LIST: Array<ITab> = [
  {tab: '表单', path: 'BuildForm'}
];

/**
 * 表单配置列表
 */
export const FORM_TYPE_LIST: Array<IFormType> = FormTypeList;
