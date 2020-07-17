import React, {useState} from 'react'
import {EditorCodeProps} from "./interface";

const EditorCode:React.FC<EditorCodeProps> = (props: EditorCodeProps) => {
  const { defaultValue } = props;
  const [value, setValue] = useState<any>(defaultValue || '');

  const onChange = (e: any) => {
    setValue(e.target.value);
    if (props.onChange) {
      props.onChange(e.target.value);
    }
  };

  return(
    <textarea value={value}
              onChange={onChange}
              readOnly
              style={{ width: '100%', height: '100%', backgroundColor: '#000', color: '#fff', fontSize: '16px', display: 'block', wordBreak: 'break-all', padding: '6px' }} />
  )
};

EditorCode.defaultProps = {
  height: 600
};

export default EditorCode;
