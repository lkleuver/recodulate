import * as React from 'react';


export interface TestProps {
  hello: any
count: any
}


export const Test:React.FC<TestProps> = ({hello,count}) => {
  return (
    <div></div>
  );
}
