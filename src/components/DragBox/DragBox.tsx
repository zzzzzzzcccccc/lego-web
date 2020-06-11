import React from 'react'
import { useDrag } from 'react-dnd'
import {DragBoxProps} from "./interface";

const DragBox: React.FC<DragBoxProps> = (props: DragBoxProps) => {
  const { type, id, className, children, style } = props;
  const [, drag] = useDrag({
    item: { id, type: type || 'box' },
  });
  return(
    <div ref={drag} className={className} style={{ ...style || {} }}>{children}</div>
  )
};

export default DragBox;
