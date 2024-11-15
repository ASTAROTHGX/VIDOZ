const toggleButton = document.getElementById('toggle-btn');
const sidebar = document.getElementById('sidebar');

// Abrir y cerrar barra lateral
function toggleSidebar() {
    sidebar.classList.toggle('close');
    toggleButton.classList.toggle('rotate');
    closeAllSubMenus();
}

// Abrir y cerrar submenús
function toggleSubMenu(button) {
    if (!button.nextElementSibling.classList.contains('show')) {
        closeAllSubMenus();
    }
    button.nextElementSibling.classList.toggle('show');
    button.classList.toggle('rotate');

    if (sidebar.classList.contains('close')) {
        sidebar.classList.toggle('close');
        toggleButton.classList.toggle('rotate');
    }
}

// Cerrar todos los submenús
function closeAllSubMenus() {
    Array.from(sidebar.getElementsByClassName('show')).forEach(ul => {
        ul.classList.remove('show');
        ul.previousElementSibling.classList.remove('rotate');
    });
}



let wallets = [];
let categories = [];
let transactions = [];

// Abrir y cerrar modales
function openModal(modalId) {
    document.getElementById(modalId).style.display = "block";
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}

// Agregar billetera
function addWallet() {
    const walletName = document.getElementById("walletName").value;
    const walletBalance = parseFloat(document.getElementById("walletBalance").value);

    if (walletName && !isNaN(walletBalance)) {
        wallets.push({ name: walletName, balance: walletBalance });
        updateWalletList();
        closeModal('walletModal');
    }
}

// Actualizar listado de billeteras
function updateWalletList() {
    const walletList = document.getElementById("wallet-list");
    walletList.innerHTML = "";
    wallets.forEach(wallet => {
        const walletDiv = document.createElement("div");
        walletDiv.innerText = `${wallet.name}: $${wallet.balance}`;
        walletList.appendChild(walletDiv);
    });
    updateWalletSelect();
    updateWalletSelectSubtotal();
    updateTotalBalance();
}

// Agregar categoría
function addCategory() {
    const categoryName = document.getElementById("categoryName").value;
    if (categoryName) {
        categories.push(categoryName);
        updateCategoryList();
        closeModal('categoryModal');
    }
}

// Actualizar listado de categorías
function updateCategoryList() {
    const categoryList = document.getElementById("category-list");
    categoryList.innerHTML = "";
    categories.forEach(category => {
        const categoryDiv = document.createElement("div");
        categoryDiv.innerText = category;
        categoryList.appendChild(categoryDiv);
    });
    updateCategorySelect();
}


// Agregar transacción
function addTransaction() {
    const walletSelect = document.getElementById("walletSelect").value;
    const transactionAmount = parseFloat(document.getElementById("transactionAmount").value);
    const transactionDescription = document.getElementById("transactionDescription").value;
    const selectedCategory = document.getElementById("categorySelect").value;
    const transactionType = document.getElementById("transactionType").value;

    if (walletSelect && !isNaN(transactionAmount) && transactionDescription && selectedCategory) {
        const newTransaction = {
            wallet: walletSelect,
            amount: transactionAmount,
            description: transactionDescription,
            category: selectedCategory,
            type: transactionType
        };

        transactions.push(newTransaction);
        updateWalletBalance(walletSelect, transactionType === 'expense' ? -transactionAmount : transactionAmount);
        addTransactionToDOM(newTransaction);
        closeModal('transactionModal');
    }
}

// Añadir transacción al DOM
function addTransactionToDOM(transaction) {
    const transactionDiv = document.createElement("div");
    transactionDiv.classList.add('transaction-item');
    
    const amountSpan = document.createElement("span");
    amountSpan.innerText = `$${transaction.amount.toFixed(2)}`;
    amountSpan.className = transaction.type === 'expense' ? 'expense' : 'income';

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "X";
    deleteButton.className = "delete-btn";
    deleteButton.addEventListener("click", () => deleteTransaction(transactionDiv, transaction));

    transactionDiv.innerHTML = `${transaction.wallet} - ${transaction.description} (${transaction.category}) - `;
    transactionDiv.appendChild(amountSpan);
    transactionDiv.appendChild(deleteButton);

    document.getElementById("transaction-list").appendChild(transactionDiv);
    updateSubtotal();
    updateCharts();
}

// Eliminar transacción
function deleteTransaction(transactionDiv, transaction) {
    transactions = transactions.filter(t => t !== transaction);
    transactionDiv.remove();
    updateWalletBalance(transaction.wallet, transaction.type === 'expense' ? transaction.amount : -transaction.amount);
    updateSubtotal();
    updateCharts();
}

// Actualizar saldo de billetera
function updateWalletBalance(walletName, amount) {
    wallets = wallets.map(wallet => {
        if (wallet.name === walletName) wallet.balance += amount;
        return wallet;
    });
    updateWalletList();
}

// Actualizar saldo total
function updateTotalBalance() {
    const totalBalance = wallets.reduce((acc, wallet) => acc + wallet.balance, 0);
    document.getElementById("saldoTotal").innerText = totalBalance.toFixed(2);
}

// Actualizar selector de billeteras y categorías
function updateWalletSelect() {
    const walletSelect = document.getElementById("walletSelect");
    walletSelect.innerHTML = wallets.map(wallet => `<option value="${wallet.name}">${wallet.name}</option>`).join('');
}

function updateCategorySelect() {
    const categorySelect = document.getElementById("categorySelect");
    categorySelect.innerHTML = categories.map(category => `<option value="${category}">${category}</option>`).join('');
}



// Asegúrate de que se llame a updateSubtotal en addTransaction y deleteTransaction
function addTransaction() {
    const walletSelect = document.getElementById("walletSelect").value;
    const transactionAmount = parseFloat(document.getElementById("transactionAmount").value);
    const transactionDescription = document.getElementById("transactionDescription").value;
    const selectedCategory = document.getElementById("categorySelect").value;
    const transactionType = document.getElementById("transactionType").value;

    if (walletSelect && !isNaN(transactionAmount) && transactionDescription && selectedCategory) {
        const newTransaction = {
            wallet: walletSelect,
            amount: transactionAmount,
            description: transactionDescription,
            category: selectedCategory,
            type: transactionType
        };

        transactions.push(newTransaction);
        updateWalletBalance(walletSelect, transactionType === 'expense' ? -transactionAmount : transactionAmount);
        addTransactionToDOM(newTransaction);
        updateSubtotal(); // Asegúrate de llamar a esta función
        closeModal('transactionModal');
    }
}

function deleteTransaction(transactionDiv, transaction) {
    transactions = transactions.filter(t => t !== transaction);
    transactionDiv.remove();
    updateWalletBalance(transaction.wallet, transaction.type === 'expense' ? transaction.amount : -transaction.amount);
    updateSubtotal(); // Asegúrate de llamar a esta función
    updateCharts();
}

// Actualizar selector de billeteras para el subtotal
function updateWalletSelectSubtotal() {
    const walletSelectSubtotal = document.getElementById("walletSelectSubtotal");
    walletSelectSubtotal.innerHTML = wallets.map(wallet => `<option value="${wallet.name}">${wallet.name}</option>`).join('');
}

let goals = []; // Array para almacenar las metas

// Mostrar el modal de nueva meta
document.getElementById('openGoalModal').onclick = function() {
    document.getElementById('goalModal').style.display = "block";
    document.getElementById('overlay').style.display = "block";
};


// Cerrar el modal de nueva meta
document.getElementById('closeGoalModal').onclick = function() {
    document.getElementById('goalModal').style.display = "none";
    document.getElementById('overlay').style.display = "none";
};

// Cerrar el modal de ahorro
document.getElementById('closeSavingsModal').onclick = function() {
    document.getElementById('savingsModal').style.display = "none";
    document.getElementById('overlay').style.display = "none";
};

// Evento para manejar la creación de la meta
document.getElementById('savings-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const goalName = document.getElementById('goal-name').value;
    const goalValue = parseFloat(document.getElementById('goal-value').value);
    const goalDeadline = document.getElementById('goal-deadline').value;

    // Validar que el valor de la meta sea un número positivo
    if (goalValue > 0) {
        goals.push({ name: goalName, value: goalValue, deadline: goalDeadline, saved: 0 });
        document.getElementById('goalModal').style.display = "none"; // Cerrar modal de meta
        document.getElementById('overlay').style.display = "none"; // Cerrar overlay
        displayGoals();
    } else {
        alert("Por favor, ingresa un valor válido para la meta.");
    }
});

// Función para mostrar las metas
function displayGoals() {
    const goalsList = document.getElementById('goalsList');
    goalsList.innerHTML = ''; // Limpiar la lista actual

    let totalSaved = 0; // Variable para almacenar el monto total ahorrado

    goals.forEach((goal, index) => {
        const goalItem = document.createElement('div');
        goalItem.classList.add('goal-item'); // Agregar una clase para el div contenedor

        const remainingAmount = goal.value - goal.saved; // Calcular cuánto falta para llegar al 100%
        
        goalItem.innerHTML = `  
            <div class="goal-info">
                <p>${goal.name} ${goal.saved}/${remainingAmount}</p>
                <button onclick="openSavingsModal(${index})">+</button>
                <button onclick="confirmDeleteGoal(${index})">x</button>
            </div>

            <div class="goal-info">
                <canvas id="progressChart${index}" width="200" height="200"></canvas>
            </div>


        `;
        
        goalsList.appendChild(goalItem);
        createChart(index);
    
        // Actualizar el monto total ahorrado
        totalSaved += goal.saved;
    });
    
    // Mostrar el monto total ahorrado
    document.getElementById('total-saved').innerHTML = `Monto total ahorrado: $${totalSaved}`;
}


// Función para abrir el modal de ahorro
function openSavingsModal(index) {
    document.getElementById('savingsModal').style.display = "block";
    document.getElementById('overlay').style.display = "block";

    // Limpiar el campo de entrada de ahorro
    document.getElementById('amount-saved').value = '';

    document.getElementById('savings-input-form').onsubmit = function(event) {
        event.preventDefault();
        const amountSaved = parseFloat(document.getElementById('amount-saved').value);
        
        // Validar que el monto ahorrado sea un número positivo
        if (amountSaved > 0) {
            const newTotal = goals[index].saved + amountSaved; // Calcular el nuevo total

            // Verificar si el nuevo total excede el valor de la meta
            if (newTotal > goals[index].value) {
                alert("No puedes agregar más ahorro. Has alcanzado el 100% de tu meta.");
            } else {
                goals[index].saved = newTotal; // Actualizar el monto ahorrado
                if (newTotal === goals[index].value) {
                    showSuccessMessage(`¡Felicidades! Lograste tu ahorro: ${goals[index].name}`);
                }
                updateChart(index);
                displayGoals(); // Actualizar la lista de metas y el monto total ahorrado
                document.getElementById('savingsModal').style.display = "none"; // Cerrar modal de ahorro
                document.getElementById('overlay').style.display = "none"; // Cerrar overlay
            }
        } else {
            alert("Por favor, ingresa un monto válido.");
        }
    };
}

// Función para confirmar la eliminación de una meta
function confirmDeleteGoal(index) {
    if (confirm(`¿Estás seguro de eliminar la meta "${goals[index].name}"?`)) {
        deleteGoal(index);
    }
}

// Función para eliminar una meta
function deleteGoal(index) {
    goals.splice(index, 1); // Eliminar la meta del array
    displayGoals(); // Actualizar la lista de metas y el monto total ahorrado
}

// Función para crear el gráfico circular de progreso
function createChart(index) {
    const ctx = document.getElementById(`progressChart${index}`).getContext('2d');
    drawProgressCircle(ctx, index);
}

// Función para dibujar el círculo de progreso
function drawProgressCircle(ctx, index) {
    const radius = 90;
    const centerX = ctx.canvas.width / 2;
    const centerY = ctx.canvas.height / 2;
    const startAngle = -0.5 * Math.PI; // Comenzar desde la parte superior
    const endAngle = startAngle + (2 * Math.PI * (goals[index].saved / goals[index].value));

    // Limpiar el canvas
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Dibujar el círculo de fondo
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 10;
    ctx.stroke();

    // Dibujar el círculo de progreso
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.strokeStyle = '#5E63FF';
    ctx.lineWidth = 10;
    ctx.stroke();

    // Mostrar el porcentaje de progreso en el centro del círculo
    ctx.font = '24px Arial';
    ctx.fillStyle = '#5E63FF';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const percentage = Math.round((goals[index].saved / goals[index].value) * 100);
    ctx.fillText(`${percentage}%`, centerX, centerY);
}

// Función para actualizar el gráfico circular de progreso
function updateChart(index) {
    const ctx = document.getElementById(`progressChart${index}`).getContext('2d');
    drawProgressCircle(ctx, index);
}

// Función para mostrar un mensaje de éxito en el centro de la pantalla
function showSuccessMessage(message) {
    const successMessage = document.getElementById('success-message');
    successMessage.innerHTML = message;
    successMessage.style.display = "block";
    setTimeout(function() {
        successMessage.style.display = "none";
    }, 3000); // Ocultar el mensaje después de 3 segundos
}

document.addEventListener('DOMContentLoaded', function () {
    let calendarioElemento = document.getElementById('calendar');
    let calendario = new FullCalendar.Calendar(calendarioElemento, {
        locale: 'es',
        initialView: 'dayGridMonth',
        selectable: true,
        headerToolbar: {
            left: 'prev',
            center: 'title',
            right: 'next'
        },
        dateClick: function (info) {
            abrirModal(info.dateStr);
        },
        eventClick: function (info) {
            mostrarInfoEvento(info.event);
        }

        
    });
    calendario.render();

    // Elementos del modal
    const modal = document.getElementById("eventModal");
    const cerrarModal = document.getElementsByClassName("close")[0];
    const guardarEvento = document.getElementById("saveEvent");
    
    // Elementos para ver información de eventos
    const modalInfo = document.getElementById("eventInfoModal");
    const closeInfoModal = document.getElementsByClassName("close-info")[0];
    let eventoActual; // Variable para almacenar el evento seleccionado

    // Función para abrir el modal y configurar la fecha seleccionada
    function abrirModal(fechaStr) {
        modal.style.display = "block";
        guardarEvento.onclick = function () {
            const tipoEvento = document.getElementById("eventType").value;
            const cantidadEvento = document.getElementById("eventAmount").value;
            const descripcionEvento = document.getElementById("eventDescription").value;

            if (tipoEvento && cantidadEvento) {
                const evento = {
                    title: `$${cantidadEvento}`, // Solo mostrar la cantidad en el título
                    start: fechaStr,
                    allDay: true,
                    extendedProps: {
                        descripcion: descripcionEvento
                    },
                    classNames: [tipoEvento === "Ingreso" ? "evento-ingreso" : "evento-gasto"] // Asignar clase según tipo
                };
                calendario.addEvent(evento);
                cerrarModalFunc();
            }
        };
    }

    // Función para mostrar la información del evento
    function mostrarInfoEvento(event) {
        eventoActual = event; // Almacenar el evento actual
        document.getElementById("eventInfoTitle").innerText = event.title;
        document.getElementById("eventInfoDate").innerText = event.start.toLocaleDateString();
        document.getElementById("eventInfoDescription").innerText = event.extendedProps.descripcion || "Sin descripción";
        modalInfo.style.display = "block";
    }

    // Función para cerrar el modal de creación
    function cerrarModalFunc() {
        modal.style.display = "none";
        document.getElementById("eventType").value = '';
        document.getElementById("eventAmount").value = '';
        document.getElementById("eventDescription").value = '';
    }

    // Cerrar el modal cuando el usuario hace clic en la 'X'
    cerrarModal.onclick = cerrarModalFunc;

    // Cerrar el modal de información cuando el usuario hace clic en la 'X'
    closeInfoModal.onclick = function () {
        modalInfo.style.display = "none";
    };

    // Cerrar el modal cuando se hace clic fuera del contenido del modal
    window.onclick = function (event) {
        if (event.target === modal) {
            cerrarModalFunc();
        }
        if (event.target === modalInfo) {
            modalInfo.style.display = "none";
        }
    };

    // Función para eliminar el evento seleccionado
    document.getElementById("deleteEvent").onclick = function () {
        if (eventoActual) {
            eventoActual.remove();
            modalInfo.style.display = "none";
        }
    };

    // Función para eliminar eventos pasados
    function eliminarEventosPasados() {
        const eventos = calendario.getEvents();
        const fechaHoy = new Date();
        eventos.forEach(evento => {
            if (evento.start < fechaHoy) {
                evento.remove(); // Eliminar el evento si la fecha de inicio es anterior a hoy
            }
        });
    }

    // Función para verificar y mostrar alerta de eventos del día
    function verificarEventosDelDia() {
        const eventos = calendario.getEvents();
        const fechaHoy = new Date().toISOString().split('T')[0]; // Obtener la fecha de hoy en formato YYYY-MM-DD

        eventos.forEach(evento => {
            const fechaEvento = evento.start.toISOString().split('T')[0]; // Obtener la fecha del evento
            if (fechaEvento === fechaHoy) {
                alert(`¡Tienes un evento hoy! ${evento.title}`); // Mostrar alerta
            }
        });
    }

    // Verificar y eliminar eventos pasados cada día (86400000 ms)
    setInterval(function() {
        verificarEventosDelDia(); // Verificar eventos del día
    }, 86400000 );
    
    // Llamar a las funciones inicialmente para limpiar eventos pasados y verificar eventos del día al cargar
    verificarEventosDelDia();
});

document.querySelectorAll('#openGoalModal1, #openGoalModal2').forEach(button => {
  button.addEventListener('click', () => {
    // Código para abrir el modal
    console.log("Modal abierto");
  });
});

// Abre el modal de confirmación
function abrirModal() {
    document.getElementById('modalConfirmacion').style.display = 'flex';
  }
  
  // Cierra el modal de confirmación sin cerrar sesión
  function cerrarModal() {
    document.getElementById('modalConfirmacion').style.display = 'none';
  }
  
  // Cierra sesión, elimina el localStorage y redirige al usuario
  function cerrarSesion() {
    localStorage.clear(); // Elimina todos los datos en localStorage
    window.location.href = "/ProyectoFINAL/Login.html"; // Redirige al inicio de sesión
  }

  
  document.getElementById("openModalButton").addEventListener("click", function() {
    document.getElementById("modal").style.display = "flex";
  });
  
  document.querySelector(".close-button").addEventListener("click", function() {
    document.getElementById("modal").style.display = "none";
  });
  
  document.getElementById("taskForm").addEventListener("submit", function(event) {
    event.preventDefault();
  
    // Obtener valores del formulario
    const taskName = document.getElementById("taskName").value;
    const taskDate = document.getElementById("taskDate").value;
  
    // Crear elemento de tarea
    const taskItem = document.createElement("div");
    taskItem.classList.add("task-item");
  
    taskItem.innerHTML = `
      <span>${taskName} - ${taskDate}</span>
      <button class="check"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" style="fill: rgba(255, 255, 255, 1);transform: ;msFilter:;"><path d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z"></path></svg></button>
      <button class="delete">x</button>
    `;
  
    // Agregar el elemento al contenedor de tareas
    document.getElementById("taskList").appendChild(taskItem);
  
    // Limpiar formulario y cerrar modal
    document.getElementById("taskForm").reset();
    document.getElementById("modal").style.display = "none";
  
    // Evento para el botón de "Lograr"
    taskItem.querySelector(".check").addEventListener("click", function() {
      alert("¡Felicidades por completar tu meta!");
      taskItem.remove();
    });
  
    // Evento para el botón de "Eliminar"
    taskItem.querySelector(".delete").addEventListener("click", function() {
      const confirmed = confirm("¿Seguro que no completaste la meta?");
      if (confirmed) {
        alert("Lamentamos que no hayas completado tu meta. ¡No te rindas!");
        taskItem.remove();
      }
    });
  });
  
  // Cerrar modal al hacer clic fuera del contenido
  window.addEventListener("click", function(event) {
    if (event.target === document.getElementById("modal")) {
      document.getElementById("modal").style.display = "none";
    }
  });
  
  const advices = [
    "Evita deudas de consumo: Usa el crédito solo para inversiones o necesidades esenciales, no para gastos de lujo o placeres momentáneos. Las deudas de consumo, especialmente las de tarjetas de crédito, pueden acumularse rápidamente con altas tasas de interés.",
    "Haz un presupuesto realista: Elabora un presupuesto detallado y ajustado a tu estilo de vida. Establece límites para tus gastos en diferentes categorías y cúmplelos rigurosamente. Un presupuesto adecuado te ayudará a controlar tus finanzas y ahorrar para tus metas.",
    "Ahorra un porcentaje fijo de tus ingresos: Asegúrate de ahorrar al menos el 10% de tus ingresos mensuales. El ahorro constante, aunque sea pequeño, te permitirá formar un fondo de emergencia y te prepara para inversiones futuras.",
    "Invierte en tu futuro: Comienza a invertir lo antes posible. Aunque sea con pequeñas cantidades, las inversiones pueden hacer crecer tu dinero mucho más rápido que solo ahorrar. Considera fondos indexados, acciones o bienes raíces como opciones a largo plazo.",
    "Haz un seguimiento de tus gastos: Lleva un registro de tus gastos diarios para identificar áreas donde puedas recortar. Esto te ayudará a comprender mejor tus hábitos de consumo y a mejorar tu capacidad de ahorro.",
    "Mantén un fondo de emergencia: Asegúrate de tener al menos tres meses de gastos esenciales en un fondo de emergencia. Este fondo te proporcionará seguridad financiera en caso de imprevistos como pérdida de empleo o gastos médicos inesperados.",
    "Paga tus deudas lo más rápido posible: Si tienes deudas, especialmente de tarjetas de crédito, enfócate en pagarlas lo antes posible. Las deudas no solo afectan tu capacidad de ahorro, sino que los intereses pueden aumentar rápidamente.",
    "Diversifica tus inversiones: No pongas todos tus ahorros en un solo tipo de inversión. Diversificar tu portafolio de inversión reduce el riesgo y te ofrece un mayor potencial de ganancias. Incluye acciones, bonos, bienes raíces y otros instrumentos financieros.",
    "Aprovecha las ofertas y descuentos: Antes de realizar compras importantes, busca descuentos y ofertas especiales. Comparar precios en diferentes tiendas te permitirá ahorrar dinero y hacer compras más inteligentes.",
    "Evita gastos impulsivos: Haz compras reflexivas y evita los gastos impulsivos. Tómate un tiempo para pensar si realmente necesitas lo que estás por comprar y si encaja con tu presupuesto.",
    "Revisa tus suscripciones mensuales: Muchas veces, suscribimos a servicios que no usamos regularmente. Revisa tus suscripciones mensuales y elimina aquellas que no son necesarias. Esto puede liberar una cantidad significativa de dinero.",
    "Invierte en tu educación financiera: La educación financiera es clave para tomar decisiones inteligentes con tu dinero. Lee libros, toma cursos o sigue blogs sobre finanzas personales para mejorar tu conocimiento y tomar decisiones más informadas.",
    "Establece metas financieras claras: Tener objetivos financieros específicos y medibles te ayuda a mantener el enfoque. Ya sea ahorrar para una casa, pagar una deuda o crear un fondo de inversión, tener metas claras te motivará a alcanzarlas.",
    "Vive por debajo de tus medios: Es fundamental gastar menos de lo que ganas. Aunque tus ingresos aumenten, trata de mantener tu estilo de vida en línea con tu presupuesto para poder ahorrar más y tener más libertad financiera.",
    "Revisa tus tarifas bancarias: Algunas cuentas bancarias tienen tarifas innecesarias que puedes evitar. Investiga diferentes opciones y cambia de banco si encuentras una mejor oferta que se ajuste a tus necesidades.",
    "Aprende a negociar: No temas negociar precios en compras grandes o contratos. Ya sea en un servicio de telefonía, seguros o compras importantes, siempre hay margen para reducir el costo si sabes negociar adecuadamente.",
    "Mantén tus finanzas separadas: Si tienes varias fuentes de ingreso o varias cuentas, asegúrate de mantenerlas separadas. Esto te ayudará a llevar un mejor control de cada una y evitar confusiones.",
    "Haz una revisión de tus seguros: Asegúrate de tener el seguro adecuado para tu situación. Ya sea de salud, vida, hogar o automóvil, contar con un seguro te puede ahorrar grandes gastos en el futuro.",
    "No pongas todos tus ahorros en el banco: Aunque el ahorro es esencial, también es importante que consideres otras opciones de inversión. Los bancos ofrecen bajos rendimientos, así que busca alternativas para hacer crecer tu dinero de manera más eficiente.",
    "Haz compras inteligentes: Antes de comprar algo, investiga las características y compara precios. Asegúrate de que realmente necesitas el producto y de que estás obteniendo el mejor valor por tu dinero.",
    "Reduce tus gastos fijos: Revisa tus gastos fijos mensuales, como servicios públicos, alquiler, transporte, y busca formas de reducirlos. Si puedes, considera mudarte a una vivienda más económica o buscar formas de reducir tu factura de energía.",
    "Piensa a largo plazo: A la hora de tomar decisiones financieras, piensa siempre a largo plazo. Las decisiones que tomas hoy pueden tener un gran impacto en tu futuro, así que haz lo posible por tomar decisiones que te beneficien en el futuro.",
    "Haz un plan para tu jubilación: Nunca es demasiado pronto para empezar a planificar para tu jubilación. Abre una cuenta de ahorro para el retiro y establece aportaciones automáticas para asegurarte un futuro tranquilo.",
    "Establece un fondo para tus hijos: Si tienes hijos, piensa en establecer un fondo educativo para ellos. Este fondo puede ayudarte a cubrir los gastos de su educación universitaria sin tener que recurrir a préstamos.",
    "No compres solo porque está en oferta: Las ofertas pueden ser tentadoras, pero no caigas en la trampa de comprar algo solo porque tiene descuento. Asegúrate de que el artículo sea algo que realmente necesitas.",
    "Aprende a gestionar el riesgo: Toda inversión implica cierto grado de riesgo. Aprende a evaluar el riesgo de tus decisiones financieras y busca estrategias para reducirlo, como diversificación o fondos más conservadores.",
    "Automatiza tus ahorros: Establece transferencias automáticas a una cuenta de ahorros o inversión. Así te aseguras de ahorrar cada mes sin tener que pensar en ello, lo que facilita la creación de hábitos financieros saludables.",
    "No gastes tu bonificación o aguinaldo inmediatamente: Es tentador gastar todo el dinero extra que recibes en vacaciones o bonificaciones, pero considera utilizarlo para fortalecer tu fondo de emergencia o invertir en algo que te beneficie a largo plazo.",
    "Haz una lista de compras antes de ir al supermercado: Esto te ayudará a evitar compras impulsivas y a gastar solo lo que realmente necesitas. También puedes aprovechar las ofertas, pero siempre con un plan claro.",
    "Invierte en activos tangibles: Además de las inversiones tradicionales, considera invertir en activos tangibles, como bienes raíces o metales preciosos. Estos pueden ser una buena forma de proteger tu dinero contra la inflación.",
    "Revisa tu estado de crédito regularmente: Mantén un control sobre tu historial crediticio y puntaje de crédito. Esto es importante para obtener mejores tasas de interés en préstamos o hipotecas.",
    "Construye tu red profesional: Aumentar tu red de contactos profesionales no solo puede ayudarte a obtener mejores oportunidades laborales, sino que también puede ser clave para nuevas oportunidades de inversión o negocio.",
    "No pongas todo tu dinero en una sola inversión: La clave del éxito financiero es la diversificación. No pongas todos tus ahorros en un solo activo, ya que si ese activo pierde valor, podrías perder una gran parte de tu dinero.",
    "Revisa tus impuestos y deducciones: Asegúrate de conocer todas las deducciones fiscales a las que tienes derecho para reducir tu carga tributaria. Consultar con un experto fiscal puede ayudarte a ahorrar dinero en tus impuestos."
];

function newAdvice() {
    // Randomly select three pieces of advice
    const shuffled = advices.sort(() => 0.5 - Math.random());
    document.getElementById('advice1').textContent = shuffled[0];
    document.getElementById('advice2').textContent = shuffled[1];
    document.getElementById('advice3').textContent = shuffled[2];
}

document.getElementById('openModalButton').addEventListener('click', function() {
    this.classList.add('hidden');
  });

  document.getElementById('myButton').addEventListener('click', function() {
    this.classList.add('hidden');
  });
  