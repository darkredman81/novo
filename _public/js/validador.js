   var ck_name = /^[a-zA-Z ]{2,30}$/;
   var ck_valor = /^\$?\d+((,\d{3})+)?(\.\d+)?$/;

   
   function validar() {

     var nome = document.getElementById("nome").value;
     var valor = document.getElementById("valor").value;
     
     
     if (!ck_name.test(nome)) { 
       window.alert("Tem de inserir um nome válido.");
       return false;
     }

    if (!ck_valor.test(valor)) {
    window.alert("Tem de inserir valor numérico no patrocinio.");
    return false;
    }

    
   window.alert("Formulário submetido com sucesso!");
     return true;
    }

   function CheckURL(fieldId, alertMessage) {
       var url = fieldId.value;
       if(url !== "")
       {
           if (url.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g) !== null)
               return true;
           else {
               alert(alertMessage);
               fieldId.focus();
               return false;
           }
       }
   }