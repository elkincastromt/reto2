function traerInformacionClientes(){
    $.ajax({    
            url : 'https://g1a87438372da7f-database1.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client',
            type : 'GET',
            dataType : 'JSON',
            
            error : function(xhr, status) {
                alert('ha sucedido un problema, '+xhr.status);
            },
            success : function(resultado) {
                $("#resultado").empty();
                tabla = "<center><table border='1'><tr><th>ID<th>Nombre<th>Email<th>Edad<th>Acciones"
                filas = ""
                for(i = 0;  i < resultado.items.length; i++){
                   filas += "<tr>"
                   filas +="<td>"+resultado.items[i].id+"</td>"   
                   filas +="<td>"+resultado.items[i].name+"</td>" 
                   filas +="<td>"+resultado.items[i].email+"</td>" 
                   filas +="<td>"+resultado.items[i].age+"</td>" 
                   filas +="<td><button onclick='eliminarCliente("+resultado.items[i].id+")'>Eliminar</button>"
                   filas += "<button onclick='actualizarCliente("+resultado.items[i].id+")'>Actualizar</button>"
                }
                $("#resultado").append(tabla + filas+"</tr></table></center>")
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
                    filas +="<td>"+resultado.items[0].id+"</td>"   
                    filas +="<td>"+resultado.items[0].name+"</td>" 
                    filas +="<td>"+resultado.items[0].email+"</td>" 
                    filas +="<td>"+resultado.items[0].age+"</td>" 
                    filas +="<td><button onclick='eliminarCliente("+resultado.items[0].id+")'>Eliminar</button>"
                   filas += "<button onclick='actualizarCliente("+resultado.items[0].id+")'>Actualizar</button>"
                    $("#resultado").append(tabla + filas+"</tr></table></center>")  
                }
                else{
                    alert("Client con ID "+id.val()+" no existe")
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
            window.location.href="clientes.html";
        }
    });
}

function eliminarCliente(idCliente){
    var datos={id:idCliente}
    console.log(idCliente);
    
    $.ajax({    
        url : 'https://g1a87438372da7f-database1.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client',
        data: JSON.stringify(datos),
        contentType: 'application/json',
        dataType: 'text',
        type : 'DELETE',
        success : function(json, textStatus, xhr) {
    
        
        },
        error : function(xhr, status) {
           
            
        },
        complete : function(xhr, status) {
            alert('Petición realizada '+xhr.status);
        }
    }); 
    window.location.href="clientes.html";   
}

function actualizarCliente(idClient){
    console.log(idClient)
    location.href="actualizarClientes.html?variable="+idClient+"";
}

function cargarDatosCliente(id){
    $.ajax({    
        url : 'https://g1a87438372da7f-database1.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client/'+id,
        dataType : 'JSON',
        type : 'GET',
        success : function(resultado) {
            $("#id").val(resultado.items[0].id)  
            $("#name").val(resultado.items[0].name)
            $("#email").val(resultado.items[0].email)
            $("#age").val(resultado.items[0].age) 
        },
        error : function(xhr, status) {
            alert('ha sucedido un problema'+ xhr.status);
        }
    });
}

function editarCliente(){ 
var datos={
        id:$("#id").val(),
        name: $("#name").val(),
        email: $("#email").val(),
        age: $("#age").val()
    }

$.ajax({    
    url : 'https://g1a87438372da7f-database1.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client',
    data: JSON.stringify(datos),
    contentType: 'application/json',
    dataType: 'text',
    type : 'PUT',
    dataType: 'JSON',
    success : function(json, textStatus, xhr) {

    
    },
    error : function(xhr, status) {
       
        
    },
    complete : function(xhr, status) {
        alert('Petición realizada '+xhr.status);
        limpiarFormulario();
        window.location.href="clientes.html";
    }
});
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