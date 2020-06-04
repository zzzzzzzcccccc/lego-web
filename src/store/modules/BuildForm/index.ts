import { observable } from 'mobx'
import {IBuildForm} from "./interface";

class BuildForm implements IBuildForm {
  @observable
  a = 1;
}

export default BuildForm;
