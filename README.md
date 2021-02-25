# recodulate
## Reverse code generation
Instead of generating files based of CLI commands I want more control over the generated code, where the code ends up and what it generates based on context.

So I'm making this as a proof of concept where you can add magic strings in your code and a watcher translates these strings in more usefull pieces of code.

I'd like it to be much more magic in the future but this is a nice start :).

## Future dream goals
With the perfect product you would be able to start from a single index file and start writing code from there. No need for installing libraries, manually creating components, etc:

- No extra syntax required (AST parsing)
- auto imports
- auto install packages
- codemod syntax: eg. `do.something ...block...`
  
  
## work in progress
run @recodulate/core watch  (yarn run bla in example)
add this in your code:  
```js
//^react.component <Test hello="bla" count={1} />^
```
save in your editor

get  
```js
<Test hello="bla" count={1} />
```
and the Test component generated in Test.tsx


# credits
based of https://github.com/jaredpalmer/tsdx-monorepo/find/master