export default function shortenString(str,length=60){
   let suffix =  str.length >60 ? "..." : "";
   return str.substr(0,length) + suffix;
}
