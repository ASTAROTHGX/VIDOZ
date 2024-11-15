document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('myModal');
    const closeButton = document.querySelector('.close');

    // Función para abrir el modal
    function openModal() {
        modal.classList.add('show'); // Añadir la clase para mostrar el modal
    }

    // Función para cerrar el modal
    function closeModal() {
        modal.classList.remove('show'); // Quitar la clase para ocultar el modal
        // Esperar a que la animación de opacidad termine antes de ocultar el modal
        setTimeout(() => {
            modal.style.visibility = 'hidden'; // Cambiar a invisible
        }, 300); // Este tiempo debe coincidir con la duración de la animación CSS
    }

    // Abrir el modal automáticamente al cargar la página
    openModal();

    // Cerrar el modal al hacer clic en el elemento con clase close
    closeButton.onclick = closeModal;

    // Cerrar el modal al hacer clic fuera del contenido
    window.onclick = function(event) {
        if (event.target === modal) {
            closeModal();
        }
    }

    // Para asegurarnos de que el modal sea visible al abrir
    modal.style.visibility = 'visible';
});

// script.js

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registrationForm");
    const submitBtn = document.getElementById("submitBtn");

    submitBtn.addEventListener("click", (event) => {
        event.preventDefault(); // Evita que el formulario se envíe

        // Obtener los valores de cada campo
        const formData = {
            firstName: document.getElementById("firstName").value,
            lastName: document.getElementById("lastName").value,
            gender: document.getElementById("gender").value,
            dob: document.getElementById("dob").value,
            occupation: document.getElementById("occupation").value,
            nationality: document.getElementById("nationality").value,
            howWeMet: document.getElementById("howWeMet").value,
            ingresosMensuales: document.getElementById("ingresosmensuales").value || "0",
            presupuestoMensual: document.getElementById("Presupuestomensual").value || "0",
            cuentasBancarias: document.getElementById("CuentasBancarias").value
        };

        // Validación: Verifica que todos los campos obligatorios estén llenos
        if (!formData.firstName || !formData.lastName || !formData.gender || !formData.dob || !formData.occupation || !formData.nationality) {
            alert("Por favor, completa todos los campos obligatorios.");
            return;
        }

        // Guardar los datos en localStorage
        localStorage.setItem("userData", JSON.stringify(formData));

        // Confirmación de que los datos se guardaron
        alert("¡Datos guardados exitosamente!");

        // Opcional: Redirigir a otra página después de guardar
        window.location.href = "/DashBoard/sidebar-menu/index.html";
    });
});

// Llamar a la función para mostrar los datos
mostrarDatosUsuario();

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registrationForm");
    const submitBtn = document.getElementById("submitBtn");

    // Evento para manejar el envío del formulario
    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Evita que el formulario se envíe

        // Obtener los valores de cada campo
        const formData = {
            firstName: document.getElementById("firstName").value,
            lastName: document.getElementById("lastName").value,
            gender: document.getElementById("gender").value,
            dob: document.getElementById("dob").value,
            occupation: document.getElementById("occupation").value,
            nationality: document.getElementById("nationality").value,
            howWeMet: document.getElementById("howWeMet").value,
            ingresosMensuales: document.getElementById("ingresosmensuales").value || "0",
            presupuestoMensual: document.getElementById("Presupuestomensual").value || "0",
            cuentasBancarias: document.getElementById("CuentasBancarias").value
        };

        // Validación: Verifica que todos los campos obligatorios estén llenos
        if (!formData.firstName || !formData.lastName || !formData.gender || !formData.dob || !formData.occupation || !formData.nationality) {
            alert("Por favor, completa todos los campos obligatorios.");
            return;
        }

        // Guardar los datos en localStorage
        localStorage.setItem("userData", JSON.stringify(formData));

        // Confirmación de que los datos se guardaron
        alert("¡Datos guardados exitosamente!");

        // Opcional: Redirigir a otra página después de guardar
        window.location.href = "/ProyectoFINAL/DashBoard/sidebar-menu/index.html";
    });
});

// Función para recuperar y mostrar los datos del usuario en el HTML
function mostrarDatosUsuario() {
    // Verificar si estamos en la página específica
    if (window.location.pathname.includes("/ProyectoFINAL/DashBoard/sidebar-menu/index.html")) {
        // Recuperar los datos de localStorage
        const userData = JSON.parse(localStorage.getItem("userData"));

        // Verificar si hay datos guardados
        if (userData) {
            // Crear el mensaje con los datos del usuario
            const userInfo = `¡Hola ${userData.firstName}!👋`;

            // Mostrar el mensaje en el HTML
            document.getElementById("welcomeMessage").innerText = userInfo;
        } else {
            // Si no hay datos guardados
            document.getElementById("welcomeMessage").innerText = "No hay datos guardados para mostrar.";
        }
    }
}

// Llamar a la función para mostrar los datos solo si estamos en la página correcta
document.addEventListener("DOMContentLoaded", mostrarDatosUsuario);


document.addEventListener("DOMContentLoaded", () => {
    const submitBtn = document.getElementById("submitBtn");

    submitBtn.addEventListener("click", (event) => {
        event.preventDefault(); // Evita que el formulario se envíe

        // Obtener el valor del presupuesto mensual
        const presupuestoMensual = document.getElementById("Presupuestomensual").value || "0";

        // Establecer el valor máximo de la barra de progreso (esto es solo un ejemplo, puedes ajustarlo)
        const maxBudget = 1000; // Establecer un valor máximo para la barra (en este caso 1000)

        // Calcular el porcentaje del presupuesto mensual
        const percentage = (presupuestoMensual / maxBudget) * 100;

        // Actualizar el círculo de progreso
        const progressCircle = document.querySelector(".circle-progress");
        const percentageText = document.getElementById("percentage-text");

        // Calcular el stroke-dashoffset para el círculo
        const offset = 565.48 - (percentage / 100) * 565.48;
        progressCircle.style.strokeDashoffset = offset;

        // Cambiar el color del círculo a rojo cuando el progreso es mayor al 50%
        if (percentage > 50) {
            progressCircle.style.stroke = "#ff0000"; // Rojo
        } else {
            progressCircle.style.stroke = "#ffffff"; // Blanco
        }

        // Actualizar el texto del porcentaje
        percentageText.textContent = `${Math.round(percentage)}%`;

        // Confirmación de que los datos se guardaron
        alert(`¡Datos guardados exitosamente! El presupuesto mensual es: ${presupuestoMensual}`);
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registrationForm");
    const submitBtn = document.getElementById("submitBtn");

    // Cargar datos del localStorage si existen
    const storedData = localStorage.getItem("userData");
    if (storedData) {
        const formData = JSON.parse(storedData);

        // Rellenar los campos del formulario con los datos guardados
        document.getElementById("firstName").value = formData.firstName || "";
        document.getElementById("lastName").value = formData.lastName || "";
        document.getElementById("gender").value = formData.gender || "";
        document.getElementById("dob").value = formData.dob || "";
        document.getElementById("occupation").value = formData.occupation || "";
        document.getElementById("nationality").value = formData.nationality || "";
        document.getElementById("howWeMet").value = formData.howWeMet || "";
        document.getElementById("ingresosmensuales").value = formData.ingresosMensuales || "0";
        document.getElementById("Presupuestomensual").value = formData.presupuestoMensual || "0";
        document.getElementById("CuentasBancarias").value = formData.cuentasBancarias || "";
    }

    // Evento para manejar el envío del formulario
    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Evita que el formulario se envíe por defecto

        // Obtener los valores de cada campo
        const formData = {
            firstName: document.getElementById("firstName").value,
            lastName: document.getElementById("lastName").value,
            gender: document.getElementById("gender").value,
            dob: document.getElementById("dob").value,
            occupation: document.getElementById("occupation").value,
            nationality: document.getElementById("nationality").value,
            howWeMet: document.getElementById("howWeMet").value,
            ingresosMensuales: document.getElementById("ingresosmensuales").value || "0",
            presupuestoMensual: document.getElementById("Presupuestomensual").value || "0",
            cuentasBancarias: document.getElementById("CuentasBancarias").value
        };

        // Validación: Verifica que todos los campos obligatorios estén llenos
        if (!formData.firstName || !formData.lastName || !formData.gender || !formData.dob || !formData.occupation || !formData.nationality) {
            alert("Por favor, completa todos los campos obligatorios.");
            return;
        }

        // Intentar guardar los datos en localStorage
        try {
            localStorage.setItem("userData", JSON.stringify(formData));

            // Confirmación de que los datos se guardaron
            alert("¡Datos actualizados exitosamente!");
            // Redirigir a otra página después de guardar
            window.location.href = "DashBoard/sidebar-menu/index.html";
        } catch (error) {
            alert("Hubo un problema al guardar los datos. Intenta nuevamente.");
            console.error("Error al guardar en localStorage: ", error);
        }
    });
});

document.getElementById("registrationForm").addEventListener("submit", function(event) {
    // Verificar si todos los campos obligatorios están llenos
    const form = document.getElementById("registrationForm");
    if (!form.checkValidity()) {
        event.preventDefault(); // Evitar el envío del formulario si hay campos vacíos
        alert("Por favor, completa todos los campos obligatorios.");
    }
});





