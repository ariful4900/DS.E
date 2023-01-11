const fs = require('fs');
const path = require('path');
const sass = require('sass');


/**
 * comple any input
 * @param {string} src; source file
 * @param {string} output output file
 *
 */



const compile = (src, output)=>{
   const result =  sass.compile(path.resolve(src), {
      style: 'expanded',
       verbose: true
   })
   fs.writeFileSync(path.resolve(output), result.css)
}

//compile the global css
compile('src/global.scss', 'lib/global.css')



/**
 *
 * @returns Object [] return array of object containing
 *
 */


const getComponets = ()=>{
   let allComponents = [];
   const types = ['atoms', 'molecules', 'organisms'];

   types.forEach(type=>{
      const allFiles = fs.readdirSync(`src/${type}`).map((file)=>({
         src: `src/${type}/${file}`,
         output:`lib/${file.slice(0, -4)}css`
      }))
      allComponents = [...allComponents, ...allFiles];
   })


return allComponents
}
//compile components
getComponets().forEach((component)=>compile(component.src, component.output))