export default function findByAttr(arr,attr,val){
     let pos = -1;
     for (var i = 0; i < arr.length; i++) {
         if (arr[i][attr] ==val) {
            return i;
         }
     }
     return pos;
}
