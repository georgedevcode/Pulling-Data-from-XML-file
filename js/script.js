
function cargarTexto() {
    var peticion = new XMLHttpRequest();
    peticion.onreadystatechange = function() {
        if(this.readyState == 4 &&  this.status == 200) {
            document.getElementById('resultado').innerHTML = '<p>' +
        this.response + '</p>';
        }
    };
    peticion.open('Get', 'documento.txt', true);
    peticion.send();
}

/********************************************************************/
function cargarXML() {
    var peticion = new XMLHttpRequest();
    peticion.onreadystatechange = function() {
        if(this.readyState == 4 &&  this.status == 200) {
           miFuncion(this);
        }
    }

    peticion.open("GET", "catalogo.xml", true);
    peticion.send();
}

function miFuncion(xml) {
    var i;
    var xmlDoc = xml.responseXML;
    var tabla = "<tr><th>Artistas</th><th>Titulo</th><th>Pais</th></tr>";
    var x = xmlDoc.getElementsByTagName("CD");
    for (i = 0; i < x.length; i++) {
        tabla += "<tr><td>" +
        x[i].getElementsByTagName("ARTISTA")[0].childNodes[0].nodeValue +
        "</td><td>" +
        x[i].getElementsByTagName("TITULO")[0].childNodes[0].nodeValue +
        "</td><td>" +
        x[i].getElementsByTagName("PAIS")[0].childNodes[0].nodeValue +
        "</td></tr>";
    }
    document.getElementById("lista").innerHTML = tabla;
}

/******************************************************************/
peticion_req = function() {
    if (window.ActiveXObject) {
        return new ActiveXObject("Microsoft.XMLHTTP");
    } else if (window.XMLHttpRequest) {
        return new XMLHttpRequest();
    } else {
        console.log("ajax no soportado");
        return null;
    }
}

cargaContenido = function() {
    var req = peticion_req();
    var m = 'GET';
    var url="data.json";
    req.open(m, url, true);
    req.setRequestHeader('Accept', "application/json"); //tipo de aplicacion json
    req.onreadystatechange = function() {
        if (req.readyState == 4) {
            muestraContenido(req.responseText);//carga respuesta de peticion
        }
    }
    req.send(null);
}

muestraContenido = function(r) {
    var idj = document.getElementById("lista2");
    if (!r || r == 'null') {
        idj.innerHTML = 'sin datos';
        return;
    }else{
        var valorJson = jsonContenido(JSON.parse(r));//carga de obj json
        idj.innerHTML =valorJson;
    }

}

jsonContenido = function(obj){
    var j="";
    for(i in obj){
        var valor = obj[i];
        switch (typeof(valor)){
            case "object":
                j +="<br>"+i+"=>"+valor+""+jsonContenido(valor);
                break;
            default:
                j+="<br>"+i+"="+valor;
        }
    }
    return j;
}