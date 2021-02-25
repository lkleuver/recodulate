import { ProcessProps } from "@recodulate/core";

export function component({ path, param, addImport, addFile }: ProcessProps) {
  let name = param.substring(1, param.indexOf(" "));

  let p = path.substring(0, path.lastIndexOf("/"));

  let props = getProps(param);

  addFile(`${p}/${name}.tsx`, tpl(name, props));
  addImport(`import {${name}} from "./${name}"`);

  return param;
}

function tpl(name: string, props: [string, string][]) {
  return `import * as React from 'react';


export interface ${name}Props {
  ${props.map((p) => `${p[0]}: ${p[1]}`).join("\n")}
}


export const ${name}:React.FC<${name}Props> = ({${props.map((p) => p[0]).join(",")}}) => {
  return (
    <div></div>
  );
}
`;
}

function getProps(str: string) {
  let result: [string, string][] = [];
  const regex = /(\w*)=["|{](\w*)["|}]/gm;
  let m;

  while ((m = regex.exec(str)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (m.index === regex.lastIndex) {
      regex.lastIndex++;
    }
    result.push([m[1], getPropType(m[2])]);
    // // The result can be accessed through the `m`-variable.
    // m.forEach((match, groupIndex) => {
    //     console.log(`Found match, group ${groupIndex}: ${match}`);
    // });
  }
  return result;
}

function getPropType(v: any) {
  if (typeof v === "number") return "number";
  return "any";
}
