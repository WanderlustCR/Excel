const db = firebase.firestore();
const Listas = document.getElementById('Listas');
const onGetTask = () => {
  return new Promise(resolve=>{
    resolve(db.collection("Clientes").get());
  })
}
const onGetTask2 = (ID) =>{
  return new Promise(resolve=>{
        resolve(db.collection(" Tours/collection/"+ID).get());
  })
 
} 
let ArrayTours = [];


/*OBJETOS*/
function  Tour(Nombre,Precio){
this.Nombre =Nombre ;
this.Precio =Precio ;
}
/*FIN OBJETOS*/


/* EXCEL */
function Excel() {

  document.getElementById('BTNExcel').style.display = 'none';
  document.getElementById('example').style.display = 'block';
  $('#example').DataTable({
    order: [[3,'desc']],
    pagingType: 'full_numbers',
    dom: 'Bfrtip',
    buttons: [
    {
      extend: 'excel',
      text: 'Exportar Excel',
      className: 'exportExcel',
      filename: 'Exportar Excel',
      exportOptions: {
        modifier: {
          page: 'all'
        }
      }
    }, 
    {
      extend: 'copy',
      text: '<u>C</u>opiar a portapapeles',
      className: 'exportExcel',
      key: {
        key: 'c',
        altKey: true
      }
    }]
  });
}
/* FIN EXCEL */

/*OBTENER DATOS*/
async function getDatos(){
  const querySnapshot =  await onGetTask();
  return new Promise(resolve=>{
     resolve(querySnapshot.forEach(doc=>{
          getTours(doc.data().Tours,doc.data().Name,doc.data().Concierge,doc.data().FechaHoy,doc.data().In,doc.data().Out,doc.data().Tours);     
        }))
  });
        

}



async function getTours(ID,Name,Concierge,FechaHoy,In,Out,Tours){
    
    const querySnapshot =  await onGetTask2(ID);
    await obtener(ID,Name,Concierge,FechaHoy,In,Out,Tours,querySnapshot);     
}

function obtener(ID,Name,Concierge,FechaHoy,In,Out,Tours,querySnapshot){
  return new Promise(resolve=>{
    resolve(querySnapshot.forEach(doc=>{
          const tr = new Tour(doc.data().ID,doc.data().Price);
          Listas.innerHTML +=`<tr>
                              <td>${Name}</td>
                              <td>${Concierge}</td>
                              <td>${FechaHoy}</td>
                              <td>${doc.data().In}</td>
                              <td>${doc.data().Out}</td>
                              <td>${Tours}</td>
                              <td>${tr.Nombre}</td>
                              <td>${tr.Precio}</td>
                              </tr>`;}));
  });
  
}

/*FIN OBTENER DATOS*/

/* CARGA AL INICIAR PANTALLA*/
window.addEventListener('DOMContentLoaded', async (e) =>{ 
  document.getElementById('example').style.display = 'none';
  document.getElementById('BTNExcel').style.display = 'none';
   getDatos().then(e=>{
          Listas.innerHTML=` `;
      document.getElementById('carga').style.display = 'none';
          document.getElementById('BTNExcel').style.display = 'block';
   });


})
/* FIN CARGA AL INICIAR PANTALLA*/

/* FUNCIONES DE ADMIN NO TOCAR
function BorradoFirebaseCompleta(){
  const ref2 = db.collection('collection');
  ref2.doc('collection')
  .delete()
  .then(()=>console.log("Borrado"))
  .catch(e =>console.log('error',e));
  


  const usuarioRef = db.collection('Clientes');
  usuarioRef
    .doc("kyzIsCWwljOJnpe6iG0I")
    .delete()
    .then(()=>console.log("Borrado"))
    .catch(e =>console.log('error',e));
}
 FIN FUNCIONES DE ADMIN NO TOCAR*/
