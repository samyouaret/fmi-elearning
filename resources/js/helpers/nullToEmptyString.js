export default function nullToEmptyString($var){
   if ($var ===null ||$var==="null") {
      return "";
   }
   return $var;
}
