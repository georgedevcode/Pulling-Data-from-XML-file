// function load(){
//     var peticion = new XMLHttpRequest();

//     peticion.onreadystatechange = function(){
//         if (this.readyState == 4 && this.status == 200) {
//             document.getElementById("resultado").innerHTML = this.response;
//         }
//     };

//     peticion.open("Get","documento.txt", true);
//     peticion.send();

//     // peticion.responseType = "text";

//     // peticion.onload = function(){
//     //     console.log(this.response);
//     //     document.getElementById("resultado").innerHTML = this.response;
    //}

    function cargarXML(){
        var peticion = new XMLHttpRequest();
        peticion.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200) {
                miFuncion(this);
            }
        }

        peticion.open("GET","catalogo.xml", true);
        peticion.send();
    }

function miFuncion(xml){
    var i;
    var xmlDoc = xml.responseXML;
    var tabla = "<tr><th>Artista</th><th>Titulo</th></tr>";
    var x = xmlDoc.getElementsByTagName("CD");
    for (i = 0; i < x.length; i++) {
        tabla += "<tr><td>" +
        x[i].getElementsByTagName("ARTISTA")[0].childNodes[0].nodeValue + "</td><td>" +
        x[i].getElementsByTagName("TITULO")[0].childNodes[0].nodeValue + "</td></tr>";
    }
    document.getElementById("lista").innerHTML = tabla;
}