function traerInformacionClientes(){
    $.ajax({    
            url : 'https://g1a87438372da7f-database1.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client',
            type : 'GET',
            dataType : 'JSON',
            
            error : function(xhr, status) {
                alert('ha sucedido un problema, '+xhr.status);
            },
            complete : function(xhr, status) {
                alert('Petición realizada, '+xhr.status);
            },
            success : function(resultado) {
                $("#resultado").empty();
                tabla = "<center><table border='1'><tr><th>ID<th>Nombre<th>Email<th>Edad<th>Acciones"
                filas = ""
                for(i = 0;  i < resultado.items.length; i++){
                   filas += "<tr>"
                   filas +="<td>"+resultado.items[i].id  
                   filas +="<td>"+resultado.items[i].name
                   filas +="<td>"+resultado.items[i].email
                   filas +="<td>"+resultado.items[i].age
                   filas +="<td><button onclick='eliminarDoctor("+resultado.items[i].id+")'>Eliminar</button>"
                   filas += "<button onclick='actualizarDoctor("+resultado.items[i].id+")'>Actualizar</button>"
                }
                $("#resultado").append(tabla + filas+"</center>")
                console.log(resultado)
            }
        });
}

function buscarPorIDClientes(id){
    if(!validarCampo(id))
        alert("Primero ingrese un dato en el campo "+id.attr("id"))
    else{
        $.ajax({    
            url : 'https://g1a87438372da7f-database1.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client/'+id.val(),
            dataType : 'JSON',
            type : 'GET',
            success : function(resultado) {
                tabla = "<center><table border='1'><tr><th>ID<th>Nombre<th>Email<th>Edad<th>Acciones"
                filas =""
                if(resultado.items.length > 0){
                    console.log(resultado)
                    $("#resultado").empty();
                    filas += "<tr>"
                    filas +="<td>"+resultado.items[0].id  
                    filas +="<td>"+resultado.items[0].name
                    filas +="<td>"+resultado.items[0].email
                    filas +="<td>"+resultado.items[0].age
                    filas +="<td><button onclick='eliminarDoctor("+resultado.items[0].id+")'>Eliminar</button>"
                   filas += "<button onclick='actualizarDoctor("+resultado.items[0].id+")'>Actualizar</button>"
                    $("#resultado").append(tabla + filas+"</center>")  
                }
                else{
                    alert("Doctor con ID "+id.val()+" no existe")
                }
            },
            error : function(xhr, status) {
                alert('ha sucedido un problema'+ xhr.status);
            },
            complete : function(xhr, status) {
                alert('Petición realizada '+xhr.status);
            }
        });
    }
}

function guardarCliente(){ 
    $.ajax({    
        url : 'https://g1a87438372da7f-database1.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client',
        data : { 
                name: $("#name").val(),
                email: $("#email").val(),
                age: $("#age").val() },
        type : 'POST',
        dataType: 'JSON',
        success : function(json, textStatus, xhr) {
    
        
        },
        error : function(xhr, status) {
           
            
        },
        complete : function(xhr, status) {
            alert('Petición realizada '+xhr.status);
            limpiarFormulario();
        }
    });
}

function eliminarCliente(idDoctor){
    console.log(idDoctor);
    var idD=idDoctor;
    $.ajax({    
        url : 'https://g1a87438372da7f-database1.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/doctor/doctor',
        data : { 
                id: 25 },
        type : 'DELETE',
        dataType: 'JSON',
        success : function(json, textStatus, xhr) {
    
        
        },
        error : function(xhr, status) {
           
            
        },
        complete : function(xhr, status) {
            alert('Petición realizada '+xhr.status);
        }
    }); 
    traerInformacionDoctores();   
}

function validarCampo(campo){
    if(campo.val() != "")
        return true
    else
        return false;
}

function limpiarFormulario(){
    $("#name").val("");
    $("#email").val("");
    $("#age").val("");
}