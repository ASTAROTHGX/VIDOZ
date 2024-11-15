// Se cargan los usuarios del json al localstorage

fetch("/Proyecto FINAL/Json/Users.json")
  .then((response) => response.json())
  .then((data) => {
    localStorage.setItem("usuarios", JSON.stringify(data));
  })
  .catch((error) => console.error("Error al cargar los usuarios:", error));

// Registro de usuario
document
  .getElementById("registroForm")
  ?.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const repeatPassword = document.getElementById("repeatPassword").value;
    const termsAceptado = document.getElementById("terminos").checked;

    if (!termsAceptado) {
      alert("Debe aceptar terminos y condiciones");
    } else {
      if (password !== repeatPassword) {
        alert("Las contraseñas no coinciden.");
        return;
      }

      // Guardar usuario en localStorage
      const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
      const userioExiste = usuarios.find((user) => user.email === email);

      if (userioExiste) {
        alert("El usuario ya está registrado.");
      } else {
        usuarios.push({ email, password });
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        alert("Registro exitoso. \nPuedes iniciar sesión ahora.");
        window.location.href = "/ProyectoFINAL/Login.html";
      }
    }
  });

//Login de usuario

document.getElementById("loginForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  //obetiene los usuarios de localStorage
  const users = JSON.parse(localStorage.getItem("usuarios")) || [];

  const user = users.find((user) => user.email === email && user.password === password);

  if (user) {
    alert("Inicio de sesión exitoso.");
    window.location.href = "Formulario_Inicio/Bienvenida.html";
  } else {
    alert("Correo electrónico o contraseña incorrectos. \nInténtalo de nuevo.");
  }
});

