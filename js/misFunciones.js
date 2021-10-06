function traerInformacion(){
    $.ajax({
        url:"https://g1a87438372da7f-database1.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/doctor/doctor",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
        }
    });
}
