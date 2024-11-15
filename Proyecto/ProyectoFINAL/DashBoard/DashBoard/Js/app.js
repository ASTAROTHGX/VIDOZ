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


function getTransactionDataByCategory() {
    const dataByCategory = {};

    transactions.forEach(transaction => {
        const { category, type, amount } = transaction;

        // Inicializa la categoría y el tipo de transacción si no existe
        if (!dataByCategory[category]) {
            dataByCategory[category] = { income: 0, expense: 0 };
        }

        // Sumar al total de ingresos o gastos
        if (type === 'income') {
            dataByCategory[category].income += amount;
        } else if (type === 'expense') {
            dataByCategory[category].expense += amount;
        }
    });

    return dataByCategory;
}


function prepareChartData() {
    const dataByCategory = getTransactionDataByCategory();
    const categories = Object.keys(dataByCategory);
    const incomes = categories.map(category => dataByCategory[category].income);
    const expenses = categories.map(category => dataByCategory[category].expense);

    return {
        labels: categories,
        datasets: [
            {
                label: 'Ingresos',
                backgroundColor: 'green',
                data: incomes
            },
            {
                label: 'Gastos',
                backgroundColor: 'red',
                data: expenses
            }
        ]
    };
}

function renderChart() {
    const ctx = document.getElementById('transactionsChart').getContext('2d');
    const chartData = prepareChartData();

    new Chart(ctx, {
        type: 'bar', // Puedes cambiar a 'line', 'pie', etc.
        data: chartData,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top'
                },
                title: {
                    display: true,
                    text: 'Ingresos y Gastos por Categoría'
                }
            }
        }
    });
}

// Llama a renderChart cuando quieras actualizar o crear la gráfica
renderChart();


