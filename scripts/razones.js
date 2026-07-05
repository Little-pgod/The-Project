// Array con 30 razones hermosas y románticas
const razones = [
    "Tu sonrisa es mi razón favorita para levantarme cada día",
    "Porque cada momento a tu lado es una aventura de amor",
    "Tu risa es la música más hermosa que mis oídos han escuchado",
    "Por la manera en que me miras, como si fuera lo más importante",
    "Porque conmigo eres tú mismo, sin filtros y sin pretensiones",
    "Tus abrazos son mi refugio más seguro en el mundo",
    "Porque en tus ojos veo mi futuro y quiero vivirlo contigo",
    "Por la forma en que tocas mi mano, llena de ternura",
    "Eres la razón por la que creo en el amor verdadero",
    "Porque me haces reír incluso en los días más grises",
    "Tu presencia llena mi corazón de paz y serenidad",
    "Por cada palabra susurrada, cada gesto de cariño",
    "Eres la respuesta a todas mis plegarias silenciosas",
    "Porque conmigo eres valiente y hermoso sin intentarlo",
    "Tu voz es el sonido más dulce que mi corazón necesita",
    "Por la forma en que me escuchas, realmente me escuchas",
    "Eres la razón de mis sueños más hermosos",
    "Porque tu corazón es tan puro como el cielo",
    "Por cada beso, cada caricia llena de amor infinito",
    "Tú eres mi hogar, mi paz, mi eternidad",
    "Porque iluminas mi mundo con tu presencia",
    "Tu amor es el regalo más precioso que la vida me ha dado",
    "Por la manera en que cuidas mis sueños como propios",
    "Eres la razón por la que el corazón late más fuerte",
    "Porque contigo cada día es un cuento de hadas",
    "Tu bondad me inspira a ser mejor cada día",
    "Por la forma en que haces que me sienta segura",
    "Eres mi razón, mi fuerza, mi inspiración",
    "Porque el amor que nos une es eterno e infinito",
    "Y la trigésima razón es simplemente porque eres tú"
];

// Obtener elementos del DOM
const calendarGrid = document.getElementById('calendarGrid');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const modalDate = document.getElementById('modalDate');
const modalReason = document.getElementById('modalReason');
const tornPaper = document.getElementById('tornPaper');

let currentYear = new Date().getFullYear();
let currentMonth = new Date().getMonth();

const monthLabel = document.getElementById('monthLabel');
const prevMonthButton = document.getElementById('prevMonth');
const nextMonthButton = document.getElementById('nextMonth');

// Crear el calendario clásico (7 columnas) para un mes y año específicos
function crearCalendario(year, month) {
    const today = new Date();
    const currentDay = today.getDate();
    const currentMonthIndex = today.getMonth();
    const currentYearIndex = today.getFullYear();

    const firstDay = new Date(year, month, 1);
    const firstDayOfWeek = (firstDay.getDay() + 6) % 7; // Ajustar para empezar en lunes
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    calendarGrid.innerHTML = '';

    // Llenar días vacíos del inicio
    for (let i = 0; i < firstDayOfWeek; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.className = 'day-cell empty';
        calendarGrid.appendChild(emptyCell);
    }

    // Llenar los días del mes
    for (let dia = 1; dia <= daysInMonth; dia++) {
        const dayCell = document.createElement('div');
        const isPastOrToday = year < currentYearIndex || (year === currentYearIndex && (month < currentMonthIndex || dia <= currentDay));
        const isToday = year === currentYearIndex && month === currentMonthIndex && dia === currentDay;

        dayCell.className = 'day-cell';
        dayCell.innerHTML = `<span class="day-number">${dia}</span>`;

        if (!isPastOrToday) {
            dayCell.classList.add('locked');
            dayCell.innerHTML = `<span class="day-number">${dia}</span><span class="lock-icon"></span>`;
        } else {
            dayCell.addEventListener('click', () => mostrarRazon(dia, year, month));
        }

        if (isToday) {
            dayCell.classList.add('today');
        }

        calendarGrid.appendChild(dayCell);
    }
}

// Mostrar la razón en el modal
function mostrarRazon(dia, year, month) {
    const fecha = obtenerFecha(dia, year, month);
    const razon = razones[(dia - 1) % razones.length];

    modalDate.textContent = fecha;
    modalReason.textContent = razon;

    tornPaper.style.animation = 'none';
    void tornPaper.offsetWidth;
    tornPaper.style.animation = 'paperTear 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Cerrar el modal
function cerrarModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = 'hidden';
}

// Obtener la fecha en formato legible
function obtenerFecha(dia, year, month) {
    const meses = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];

    const nombreMes = meses[month];
    return `${dia} de ${nombreMes} ${year}`;
}

function actualizarMesLabel(year, month) {
    const meses = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    monthLabel.textContent = `${meses[month]} ${year}`;
}

function cambiarMes(delta) {
    currentMonth += delta;

    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear -= 1;
    } else if (currentMonth > 11) {
        currentMonth = 0;
        currentYear += 1;
    }

    crearCalendario(currentYear, currentMonth);
    actualizarMesLabel(currentYear, currentMonth);
}

// Event listeners
modalClose.addEventListener('click', cerrarModal);

modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        cerrarModal();
    }
});

if (prevMonthButton) prevMonthButton.addEventListener('click', () => cambiarMes(-1));
if (nextMonthButton) nextMonthButton.addEventListener('click', () => cambiarMes(1));

// Cerrar con ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        cerrarModal();
    }
});

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    actualizarMesLabel(currentYear, currentMonth);
    crearCalendario(currentYear, currentMonth);
});
