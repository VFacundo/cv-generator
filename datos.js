const regionNames = new Intl.DisplayNames(
    ['en'], {type: 'region'}
  );

var datos = '',
    mediaqueryList = window.matchMedia("(min-width: 768px)");

mediaqueryList.addListener(function(EventoMediaQueryList){
});
//Obtengo info de la api
    $.ajax({
        url: 'https://randomuser.me/api/',
        dataType: 'json',
        success: function(data) {
           displayData(data);
        }
      });

function displayInfoContacto() {  //Muestra el div con la informacion del contacto
    if(document.getElementById('contacto').style.display == "block"){
        document.getElementById('contacto').style.display = "none";
    }else{
        document.getElementById('contacto').style.display = "block";
        //document.getElementById('contacto').style.position = "fixed";
    }
    //Verifica el tamaño de la pantalla para modificar la posicion del elemento
    if(window.matchMedia("(max-width: 768px").matches){
        document.getElementById('contacto').style.position = "fixed";
        //console.log("menos de 768");
    }else{
        document.getElementById('contacto').style.position = "static";
    }
}

function changeAccordion(){//Cambia el icono del div informacion del contacto
    let spanElement = $("#botonContacto > span:nth-child(2)");
    spanElement.toggleClass("glyphicon-chevron-down glyphicon-chevron-up");
}

function displayData(data) {    //Muestra la informacion obtenida
    datos = data.results[0];
    console.log(datos);
    let img = '<img src="' + datos['picture']['large'] + '" class="img-thumbnail" alt="Foto Personal CV">';
    
    let date = new Date(datos['dob']['date']);
    let dotDate = date.getDate() + '/' + parseInt(date.getMonth()+1) + '/' + date.getFullYear();

    let nombreCompleto = '<h1>' + datos['name']['first'] + " " + datos['name']['last'] + '</h1>';

    let dataInfo = 
    '<ul>'+
    //'<li> Nombre: '+ datos['name']['first'] + " " + datos['name']['last'] + ' </li>'+
    '<li class="glyphicon glyphicon-calendar"> '+ dotDate + ' </li>'+ 
    '<li class="glyphicon glyphicon-user"> '+ datos['dob']['age'] + ' años </li>'+ 
    '<li class="glyphicon glyphicon-flag"> '+ regionNames.of(datos['nat']) + ' </li>'+           
    '</ul>';

    let contactInfo = 
    '<ul>'+
    '<li class="glyphicon glyphicon-envelope"> '+ datos['email'] +'</li>'+
    '<li class="glyphicon glyphicon-phone"> '+ datos['cell'] +'</li>'+
    '<li class="glyphicon glyphicon-earphone"> '+ datos['phone'] +'</li>'+
    '<li class="glyphicon glyphicon-home"> ' + datos['location']['street']['name'] + ' ' + datos['location']['street']['number'] + ', ' +  datos['location']['city'] + ', ' + datos['location']['state'] + ', ' + datos['location']['country'] +'</li>'+
    '</ul>';

document.getElementById("nombreCompleto").innerHTML = nombreCompleto;
document.getElementById("datos").innerHTML = dataInfo;
document.getElementById("foto").innerHTML = img;
document.getElementById("contacto").innerHTML = contactInfo;

}

