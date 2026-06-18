const termsOverlay = document.getElementById('termsOverlay');
const sectionOptions = document.getElementById('sectionOptions');
const termsCodeInput = document.getElementById('termsCode');
const termsError = document.getElementById('termsError');
const btnAgree = document.getElementById('btnAgree');

const sections = [
    {
        id: 'dias.html',
        title: 'Eventos',
        description: 'Revisa los días importantes y especiales compartidos entre nosotros.',
        icon: 'imagenes/days.png',
    },
    {
        id: 'cupones.html',
        title: 'Cupones diarios',
        description: 'Guarda o canjea el cupón del día. Aquí tendrás acceso a los cupones normales y super cupones en una sola hoja.',
        icon: 'imagenes/cupon.png',
    },
    {
        id: 'razones.html',
        title: 'Nuestras razones',
        description: 'Descubre una razón única por la cual te amo hoy. Es una sola razón por día y se muestra en un formato limpio.',
        icon: 'imagenes/corazon.png',
    },
    {
        id: 'cartas.html',
        title: 'Cartita',
        description: 'Lee una carta especial escrita solo para ti hoy, con todo mi cariño.',
        icon: 'imagenes/carta.png',
    },
    {
        id: 'espacio.html',
        title: 'Constelación',
        description: 'Un mensaje espacial para recordarte lo especial que eres. El contenido aquí estará listo para imágenes y texto renovables.',
        icon: 'imagenes/estrellita.png',
    },
    {
        id: 'musica.html',
        title: 'Nuestra música',
        description: 'Selecciona la música dedicada especialmente para ti. El diseño será sencillo y funcional.',
        icon: 'imagenes/musica.png',
    },
    {
        id: 'flores.html',
        title: 'Flores',
        description: 'Un detalle floral que hace más bonito el día.',
        icon: 'imagenes/flores.png',
    },
    {
        id: 'extras.html',
        title: 'Extras',
        description: 'Un espacio para notas personales y detalles extras. Aquí puedes escribir cómo te sientes hoy.',
        icon: 'imagenes/conejo.png',
    },
];
let selectedSectionId = null;

const importantEvents = [
    {
        id: 'firstTalk',
        label: 'Primer día que hablamos',
        date: new Date(2025, 11, 11),
        note: 'El día en que empezó todo lo especial entre nosotros.'
    },
    {
        id: 'firstKiss',
        label: 'Primer beso',
        date: new Date(2026, 0, 31),
        note: 'Ese momento mágico que se quedó en mi memoria.'
    },
    {
        id: 'firstDate',
        label: 'Nuestra primera cena',
        date: new Date(2026, 0, 7),
        note: 'La primera vez que salimos juntos y todo cambió.'
    }
];

function getDaysBetween(date) {
    const now = new Date();
    const diff = now - date;
    return Math.floor(diff / (1000 * 60 * 60 * 24));
}

function renderTimeline() {
    // Logic moved to días.html
}

function hideTerms() {
    if (termsOverlay) {
        termsOverlay.classList.remove('active');
    }
}

function showTerms() {
    if (termsOverlay) {
        termsOverlay.classList.add('active');
    }
}

function renderSectionOptions() {
    if (!sectionOptions) return;

    sectionOptions.innerHTML = sections.map((section) => {
        return `
            <button type="button" class="gift-card" data-id="${section.id}">
                <img src="${section.icon}" alt="${section.title}">
                <span>${section.title}</span>
            </button>
        `;
    }).join('');

    sectionOptions.querySelectorAll('.gift-card').forEach((button) => {
        button.addEventListener('click', () => {
            const targetId = button.dataset.id;
            const section = sections.find((item) => item.id === targetId);
            if (!section) return;
            window.location.href = section.id;
        });
    });
}

function init() {
    renderSectionOptions();

    const hasAcceptedTerms = localStorage.getItem('miAmorAccepted') === 'true';
    if (!hasAcceptedTerms) {
        showTerms();
    } else {
        hideTerms();
    }

    const termsCode = '7177';

    if (termsCodeInput) {
        termsCodeInput.addEventListener('input', () => {
            btnAgree.disabled = !termsCodeInput.value.trim();
            if (termsError) {
                termsError.textContent = '';
            }
        });
    }

    if (btnAgree) {
        btnAgree.addEventListener('click', () => {
            const enteredCode = termsCodeInput ? termsCodeInput.value.trim() : '';
            if (enteredCode === termsCode) {
                localStorage.setItem('miAmorAccepted', 'true');
                hideTerms();
            } else {
                if (termsError) {
                    termsError.textContent = 'Código incorrecto. Vuelve a intentarlo.';
                }
                btnAgree.disabled = true;
                if (termsCodeInput) {
                    termsCodeInput.value = '';
                    termsCodeInput.focus();
                }
            }
        });
    }

}

init();
