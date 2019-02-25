

window.onload = function() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            gestionarXML(this);
        }
    }
    xhttp.open("GET", "XML/main.xml", true);
    xhttp.send();
}

function gestionarXML(dadesXml) {
    var xmlDoc = dadesXml.responseXML;
    var tipo = "";
    var numeroCajaTexto = 0;
    for (i = 0; i < 10; i++) {
        tipo = xmlDoc.getElementsByTagName("type")[i].innerHTML;
        switch(tipo) {
            case "radio":
                crearDivPregunta(i);
                imprimirTituloPregunta(i, xmlDoc);
                imprimirCajaText(numeroCajaTexto, xmlDoc);
                numeroCajaTexto++;
                preguntasText.push(i);
                respuestasText.push(parseInt(xmlDoc.getElementsByTagName("question")[i].getElementsByTagName("answer")[0].innerHTML));
                break;
        }
    }
    imprimirEspacios(3);
    imprimirBotonCorregir();
    imprimirEspacios(2);
}

function imprimirTituloPregunta(i, xmlDoc) {
    var tituloPregunta = document.createElement("h3");
    tituloPregunta.innerHTML = xmlDoc.getElementsByTagName("tittle")[i].innerHTML;
    document.getElementById("pregunta" + i).appendChild(tituloPregunta);
}

function imprimirCajaText(numeroCajaTexto, xmlDoc) {
    var cajaTexto = document.createElement("input");
    cajaTexto.type = "number";
    cajaTexto.id = "cajaTexto" + numeroCajaTexto;
    document.getElementById("pregunta" + i).appendChild(cajaTexto);
}

function imprimirRadioButton(i, xmlDoc) {
    var numOpciones = xmlDoc.getElementsByTagName("question")[i].getElementsByTagName("option").length;
    var opt = xmlDoc.getElementsByTagName("question")[i].getElementsByTagName("option");
    for(j = 0; j < numOpciones; j++) {
        var input = document.createElement("input");
        var answerTitle = opt[j].innerHTML;
        var span = document.createElement("span");
        span.innerHTML = answerTitle;
        input.type = "radio";
        input.name = "preg" + 1;
        document.getElementById("pregunta" + 1).appendChild(input);
        document.getElementById("pregunta" + i).appendChild(span);
        document.getElementById("pregunta" + i).appendChild(document.createElement("br"));
    }
}