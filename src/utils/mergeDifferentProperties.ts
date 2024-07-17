export default function mergeDifferentProperties(obj1: any, obj2: any) {
   let result: any = {};
   for (let key in obj2) {
      if (!(key in obj1) || obj1[key] !== obj2[key]) {
         result[key] = obj2[key];
      }
   }
   return result;
}
