import { observable } from 'mobx'
import {IHome} from "./interface";
import {TAB_LIST} from "../../../conf";

class Home implements IHome {
  @observable
  tabList = TAB_LIST;
}

export default Home;
