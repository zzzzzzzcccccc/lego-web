import React, { useState } from 'react'
import { useDrop } from 'react-dnd'
import {FormDropProps} from "./interface";

const FormDrop: React.FC<FormDropProps> = (props: FormDropProps) => {
  const [boxList, setBoxList] = useState([] as Array<any>) ;
  const [, drop] = useDrop({
    accept: 'box',
    drop(record:any, monitor) {
      console.log(monitor)
      setBoxList([...boxList, { id: Date.now() + '', comp: record.comp }]);
      return undefined;
    }
  });

  return(
    <div ref={drop} className={`w100 h100`}>
      {boxList.map((item:any) => <div key={item.id}>{item.id}</div>)}
    </div>
  )
};

export default FormDrop;
