
let tbody = document.getElementById("tbcontent");


function Obtenertodos(){
    fetch('https://my-json-server.typicode.com/fedegaray/telefonos/db',{
        method: 'GET',
        headers: {'Content-Type' : 'application/json'} 
    })
    .then(response => response.json()) 
    .then(data => {
      let tbcontent = '';

      for (let dato of data.dispositivos) {
        let fila = `<tr>
          <td>${dato.id}</td>
          <td>${dato.marca}</td>
          <td>${dato.modelo}</td>
          <td>${dato.color}</td>
          <td>${dato.almacenamiento}</td>
          <td>${dato.procesador}</td>
        </tr>`;

        tbcontent += fila;
      }

      tbody.innerHTML = tbcontent;
    })
    .catch(error => console.error('Error: ', error));
}


async function buscarID(){
  try{

    let id = document.getElementById("articulo").value;

    if (id === '') {
      alert('No ingresaste un ID');
      return;
    }

   axios.get('https://my-json-server.typicode.com/fedegaray/telefonos/dispositivos/' + id)
    .then(respuesta => {
        let dispositivo = respuesta.data;
        
            document.getElementById("consultarMarca").value = dispositivo.marca;
            document.getElementById("consultarModelo").value = dispositivo.modelo;
            document.getElementById("consultarColor").value = dispositivo.color; 
            document.getElementById("consultarAlmacenamiento").value = dispositivo.almacenamiento;
            document.getElementById("consultarProcesador").value = dispositivo.procesador;

        })
      .catch(error => {throw new Error("Error en la solicitud: " + error)})
    } catch(error){ console.error(error);
  }
}

async function modificar() {
  try{
        let id = document.getElementById("articulo").value;
        let marca = document.getElementById("consultarMarca").value;
        let modelo = document.getElementById("consultarModelo").value ;
        let color = document.getElementById("consultarColor").value; 
        let almacenamiento = document.getElementById("consultarAlmacenamiento").value;
        let procesador = document.getElementById("consultarProcesador").value;

        if (id === '') {
          alert('Los valores estan incompletos');
          return;
        }

        fetch('https://my-json-server.typicode.com/fedegaray/telefonos/dispositivos/' + id, {
          method: 'PUT',
          headers: {'Content-Type' : 'application/json'} ,
          body: JSON.stringify({ 
            id: id,
            data:{
            
            marca: marca,
            modelo: modelo,
            color: color,
            almacenamiento: almacenamiento,
            procesador: procesador, 
            }
          })

        }) .then(respuesta => respuesta.json())
        .then(data => {
          alert(`Archivo modificado ${id}. nuevo contenido: \n${JSON.stringify(data)}`);
          Obtenertodos();
        }).catch(error => {throw new Error(error)});
        
  } catch (error){
   console.error(error)
  } 
}

async function eliminar(){
  try{
    let id = document.getElementById("articulo").value 
    
    if (id === '') {
      alert('No ha ingresado ningun ID');
      return;
    }

    fetch('https://my-json-server.typicode.com/fedegaray/telefonos/dispositivos/' + id, {
      method: 'DELETE',
      
  })
  .then(respuesta =>{
    alert(`Se elimino archivo ${id}`)

  let marca = document.getElementById("consultarMarca").value ="";
  let modelo = document.getElementById("consultarModelo").value ="";
  let color = document.getElementById("consultarColor").value =""; 
  let almacenamiento = document.getElementById("consultarAlmacenamiento").value ="";
  let procesador = document.getElementById("consultarProcesador").value ="";
  }) 
  Obtenertodos();
} catch (error){
  console.error(error)
 } 


}

async function Postear(){
  try{
  let marca = document.getElementById("Marca").value ;
  let modelo = document.getElementById("Modelo").value ;
  let color = document.getElementById("color").value ;
  let almacenamiento = document.getElementById("Almacenamiento").value ;
  let procesador = document.getElementById("Procesador").value ;

  if (marca === '') {
    alert('Los valores estan incompletos');
    return;
  }

  fetch('https://my-json-server.typicode.com/fedegaray/telefonos/dispositivos/',{
    method: 'POST',
    headers: {'Content-Type' : 'application/json'} ,
    body: JSON.stringify({ 
    
      
      marca: marca,
      modelo: modelo,
      color: color,
      almacenamiento: almacenamiento,
      procesador: procesador, 
      
    })
  }).then(respuesta => respuesta.json())
  .then(data => {
    alert(`Nuevo archivo creado, sus valores son: \nMarca: ${data.marca}\nModelo: ${data.modelo}\nColor: ${data.color}\nAlmacenamiento: ${data.almacenamiento}\nProcesador: ${data.procesador}`)
    Obtenertodos();
  }).catch(error=>{
    console.error(error)
  });
}catch(error){
  console.log(error);
}
}
 
      