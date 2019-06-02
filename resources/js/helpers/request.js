export default function request(url,data,method="POST"){
   $.ajaxSetup({
      headers: {
         'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
   });
   var form_data = new FormData();
   for ( var key in data ) {
       form_data.append(key,data[key]);
   }
   let type = method.toLowerCase();
   if (type!="get" && type!="post") {
      form_data.append('_method',method);
      method = "POST";
   }
   console.log(method);
   return $.ajax({
   type: method,
   url: url,
   contentType: false,
   processData: false,
   data: form_data
  });
}
