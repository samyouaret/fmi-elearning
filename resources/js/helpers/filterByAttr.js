export default function filterByAttr(arr,attr,val){
     let pos = -1;
     let result = [];
     val = val.toLowerCase();
     let regex =  new RegExp('.*'+val+'.*$');
     for (var i = 0; i < arr.length; i++) {
         if (regex.test(arr[i][attr])) {
            result.push(arr[i]);
         }
     }
     return result;
}
