libros();

function libros() {
  fetch("api/libros")
    .then(function (res) {
      return res.json();
    })
    .then(function (datos) {
      let libros = "";
      for (let i = 0; i < datos.length; i++) {
        libros += `
              <div>
                  <p>Titulo: ${datos[i].titulo}</p>
                  <p>Estado: ${datos[i].estado}</p>
              </div>    
          `;
      }
      document.getElementById("div1").innerHTML = libros;
    });
}

function buscar() {
  const titulo = document.getElementById("titulo").value;
  fetch(`/api/libros/${titulo}`)
    .then(function (res) {
      return res.json();
    })
    .then(function (datos) {
      let libros = "";
      for (let i = 0; i < datos.length; i++) {
        libros += `
              <div>
                  <p>Titulo: ${datos[i].titulo}</p>
                  <p>Estado: ${datos[i].estado}</p>
              </div>    
          `;
      }
      document.getElementById("div1").innerHTML = libros;
    });
}

function anyadir() {
  const titulo = document.getElementById("tituloAnyadir").value;

  fetch(`/api/nuevoLibro/${titulo}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  })
    .then(function (res) {
      return res.json();
    })
    .then(function (datos) {
      console.log(datos);
      libros();
    });
}

function editar() {
  const titulo = document.getElementById("editarLibro").value;
  fetch(`/api/editarLibro/${titulo}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  })
    .then(function (res) {
      return res.json();
    })
    .then(function (datos) {
      console.log(datos);
      libros();
    });
}

function borrar() {
  const titulo = document.getElementById("borrarLibro").value;
  fetch(`/api/borrarLibro/${titulo}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  })
    .then(function (res) {
      return res.json();
    })
    .then(function (datos) {
      console.log(datos);
      libros();
    });
}
