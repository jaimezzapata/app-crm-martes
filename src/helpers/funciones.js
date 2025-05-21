import Swal from "sweetalert2";

export function alerta(titulo, mensaje, icono) {
  Swal.fire({
    title: titulo,
    text: mensaje,
    icon: icono,
  });
}

export function alertaConfirmar(id, apiEnvios, getEnvios) {
  Swal.fire({
    title: "Está seguro?",
    text: "Esta acción no se puede revertir",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, Eliminar"
  }).then((result) => {
    if (result.isConfirmed) {
      fetch(apiEnvios + "/" + id, {
        method: "DELETE"
      }).then(()=> {
        getEnvios()
      })
      Swal.fire({
        title: "Eliminado!",
        text: "Envio eliminado.",
        icon: "success"
      });
    }
  });
}

export function generarToken() {
  return "token" + Math.random() * 1000 + Math.random() * 10;
}

export function generarId() {
  return (
    Math.random().toString(36).substring(2) +
    Math.random().toString(36).substring(2)
  );
}
