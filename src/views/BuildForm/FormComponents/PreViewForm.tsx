import React from 'react'
import {IGlobalFormConfig} from "../../../store/modules/BuildForm/interface";
import {IFormCompData} from "../FormCompDataList";

interface PreViewFormProps {
  formList: IFormCompData[];
  formConfig: IGlobalFormConfig;
}

const PreViewForm:React.FC<PreViewFormProps> = (props: PreViewFormProps) => {
  const { formList, formConfig } = props;
  return(
    <div>
      yulan
    </div>
  )
};

export default PreViewForm;
