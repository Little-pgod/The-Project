const content = document.getElementById('content');
const celebrationContainer = document.getElementById('celebration-container');
const WEBHOOK_URL = 'https://discord.com/api/webhooks/1502928779998269641/UXf_Q4IvWOPoeOlb0nuig0C5a4ktz8as7LwTz9eIoZmNPhSJ6yl6dHe3ywhXJk8ji6ED';

// Sistema de rarezas y descripciones
const RARITIES = {
    comun: { name: 'Común', color: '#686868', textColor: '#a29898', bgClass: 'bg-comun', weight: 50 },
    pocoComun: { name: 'Poco Común', color: '#a8e6d9', textColor: '#2d6b5c', bgClass: 'bg-poco-comun', weight: 18 },
    raro: { name: 'Raro', color: '#8ba8d4', textColor: '#fff', bgClass: 'bg-raro', weight: 10 },
    epico: { name: 'Épico', color: '#c785d8', textColor: '#fff', bgClass: 'bg-epico', weight: 0.5 },
    legendario: { name: 'Legendario', color: '#e8d5b1', textColor: '#5a4a2e', bgClass: 'bg-legendario', weight: 0.22 },
    exotico: { name: 'Exótico', color: '#d9a6ff', textColor: '#fff', bgClass: 'bg-exotico', weight: 0.65 },
    mitico: { name: 'Mítico', color: '#d4537f', textColor: '#fff', bgClass: 'bg-mitico', weight: 0.08 },
};

const RARITY_INDEX_RANGES = {
    comun: [0, 20],
    pocoComun: [20, 40],
    raro: [40, 60],
    epico: [60, 75],
    legendario: [75, 87],
    exotico: [87, 97],
    mitico: [97, 98],
};

const CUPPON_TEMPLATES = [
    // COMÚN - Básicos pero significativos
    'Vale por un masaje de 15 minutos la próxima vez que nos veamos',
    'Vale por un masaje de pies con cremita cuando nos cansemos de caminar',
    'Vale por ir a comprarte tu dulce, gaseosa o salchipapa favorita a la esquina y llevártela a donde estés',
    'Vale por un audio mío improvisando una canción cursi por WhatsApp',
    'Vale por una ráfaga de los mejores 10 memes que encuentre hoy para cambiarte el humor',
    'Vale por 5 mensajes diciendo lo que me encanta de ti',
    'Vale por acompañarte a hacer ese trámite o compra aburrida en el centro para que no vayas sola',
    'Vale por armarte una playlist personalizada para tus trayectos diarios',
    'Vale por un mensaje de buenos días super elaborado y cursi apenas te despiertes',
    'Vale por un show de chistes feos míos en persona hasta que logre sacarte una sonrisa',
    'Vale por lavarte todos los platos y dejarte la cocina impecable hoy',
    'Vale por ir a tu casa a limpiar y ordenar tu habitación mientras tú descansas',
    'Vale por ir a verte solo a hacerte compañía en silencio mientras estudias para tus exámenes',
    'Vale por cambiar todos mis planes de la tarde para ir a verte a donde sea que estés libre',
    'Vale por contarte la historia más tonta o graciosa que me pase hoy en la calle',
    'Vale por un masaje en las manos y muñecas para aliviar el cansancio después de un día largo de escribir',
    'Vale por dejar que uses mis piernas como almohada para recostarte en una banca todo el rato que quieras hoy',
    'Vale por una tarde entera de hablar sobre tu tema conspiranoio favorito',
    'Vale por un paseo por el parque o la zona con más árboles que encontremos cuando necesites un respiro del ruido y el cemento',
    'Vale por un dibujo improvisado',

    // POCO COMÚN - Más creativos
    'Vale por elegir el plan y el lugar a donde iremos a caminar hoy (sin quejas de mi parte)',
    'Vale por desvío de mi ruta para ir a dejarte tu dulce o snack favorito a donde estés',
    'Vale por una tarde juntos en el vicio: vamos a las cabinas de PlayStation a jugar en pareja',
    'Vale por escribirte una carta de amor personalizada',
    'Vale por ir por un helado gigante de varios sabores',
    'Vale por elegir el outfit que voy a usar en nuestra próxima salida',
    'Vale por ir a buscarte para dar una caminata nocturna corta cerca de tu casa',
    'Vale por una tarde de buscar la mejor cafetería escondida de la ciudad para volverla nuestro lugar secreto',
    'Vale por cantar en nuestro karaoke casero hasta que nos quedemos sin voz con nuestras canciones favoritas',
    'Vale por ir a una librería a elegir un libro el uno para el otro a ciegas',
    'Vale por una tarde de buscar la puesta de sol desde el punto más alto y con mejor vista de la ciudad',
    'Vale por un dibujo o retrato tuyo hecho a mano por mí',
    'Vale por una bolsita con 20 papelitos escritos a mano con razones por las cuales me enamoré de ti',
    'Vale por regalarte un anillo mío para que lo uses tú de ahora en adelante',
    'Vale por una carta escrita que podrás abrir dentro de 1 mes',
    'Vale por hacer un tablero de Pinterest juntos dedicado exclusivamente a ideas para nuestros plans del futuro',
    'Vale por un meme hecho por mí usando una foto graciosa mía',
    'Vale por un juego de rol en público: tú eliges el tema y yo actúo como personaje improvisado',
    'Vale por dejar que me maquilles, me pintes las uñas o me hagas un cambio de look completo',
    'Vale por una noche entera de hacernos promesas serias sobre cosas pequeñas que cumpliremos sin falta en los próximos meses',
    
    // RARO - Experiencias especiales
    'Vale por un viaje de todo un día a un pueblo fuera de la ciudad',
    'Vale por regalarte esa prenda de ropa mía que te gustó',
    'Vale por hacer cumplir un sueño o capricho tuyo',
    'Vale por una joya grabado con nuestras iniciales o una fecha',
    'Vale por un regalo sorpresa elegido especialmente para ti',
    'Vale por una noche de lujo (spa, cena gourmet en casa, champagne)',
    'Vale por un juego de misterio: te dejo pistas en sobres por la ciudad y tienes que encontrarme en el lugar final',
    'Vale por una sesión de preguntas profundas sobre el alma, los miedos y el futuro usando tarjetas de conversación',
    'Vale por un mapa estelar impreso que muestre exactamente cómo estaba el universo de alguna fecha especial',
    'Vale por una sesión de fotos profesional en exteriores contratada por mí',
    'Vale por crear una cuenta de Instagram secreta y privada solo para nosotros donde subamos los momentos más raros de las citas',
    'Vale por una maratón nocturna de streaming viendo una saga completa (como Harry Potter) de corrido por discord',
    'Vale por un correo electrónico programado para que te llegue exactamente dentro de un año recordándote lo mucho que te amo hoy',
    'Vale por un audio mío tocando un instrumento que no sepa tocar interpretando una melodía que te pueda gustar',
    'Vale por pasar una tarde entera analizando los videoclips musicales más artísticos y raros que conozcamos en YouTube',
    'Vale por una dedicatoria de radio real, donde el locutor diga lo mucho que te amo y lo especial que eres para mí',
    'Vale por un pacto de lealtad absoluta: me cuentas tu mayor secreto y me lo llevo a la tumba sin juzgarte jamás',
    'Vale por un día entero donde yo me encargo de disipar todas tus inseguridades con paciencia, amor y abrazos eternos',
    'Vale por una carta escrita de mi puño y letra disculpándome sinceramente por ese error del pasado y comprometiéndome a mejorar en eso',
    'Vale por una tarde de enterrar una mini cápsula del tiempo en un parque con cartas que abriremos cuando cumplamos tres años juntos',

    
    // ÉPICO - Momentos inolvidables
    'Vale por un Comodín del Tiempo, en el que cancelo cualquier plan o trabajo mío para ir a donde estés en el acto',
    'Vale por un día de excursión hacia algún lugar turístico de la región',
    'Vale por un viaje de ida y vuelta en combi solo para ir a almorzar el plato más típico en un pueblo vecino',
    'Vale por ir a probar los tragos exóticos de la región (como el licor de mora o pur pur) en un barcito tranquilo y bonito por la noche',
    'Vale por ir por un postre y un capuchino gigante un día de lluvia intensa, sentados al lado de la ventana viendo la calle mojada',
    'Vale por una cena donde dejamos que el mozo elija nuestros platos por completo, jugando a la sorpresa de lo que llegue a la mesa',
    'Vale por reservar una habitación en un hotel u hospedaje acogedor para pasar una tarde entera desconectados del mundo, viendo películas',
    'Vale por reservar un espacio campestre por unas horas para estar en un lugar privado rodeados de naturaleza y aire puro',
    'Vale por un masaje de espalda completo de 45 minutos usando aceites aromáticos calientes que compraré especialmente para ti',
    'Vale por una salida al karaoke a cantar nuestras canciones favoritas a todo pulmón y sin vergüenza',
    'Vale por crear un libro personalizado de nuestra historia de amor',
    'Vale por comprar dos entradas para cualquier evento musical, peña cultural o presentación acústica bonita que organicen en la ciudad',
    'Vale por una tarde de ir a un centro de estética local a que te realicen el tratamiento completo de uñas, manicura o cuidado que elijas',
    'Vale por una tarde de taller de pintura en pareja, para pintar juntos lo que tú elijas en ese momento ',
    'Vale por ir a las tiendas del centro y comprarte una prenda random que yo escoja para ti',
    
    // LEGENDARIO - Recuerdos de vida
    'Vale por un viaje de tres días para conocer esa ciudad de la región que ninguno conoce',
    'Vale por un fin de semana entero de hotel, tours y cenas en Moyobamba pagado por mí',
    'Vale por reservar la suite matrimonial más cara de un hotel de la ciudad por dos días',
    'Vale por una joya de plata real grabada con nuestras iniciales o una fecha especial',
    'Vale por una sesión de quiropráctica o masajes descontracturantes con un especialista',
    'Vale por financiar conseguir por completo todos tus libros de texto digitales o fisicos del ciclo actual',
    'Vale por una cena de gala en el restaurante más lujoso y caro del centro de la ciudad',
    'Vale por comprar una estrella real a tu nombre con certificado astronómico oficial',
    'Vale por una conversación seria donde te demuestro con acciones reales el cambio que prometí',
    'Vale por una carta notarial o compromiso serio escrito a mano sobre nuestro plan de vida juntos',
    'Vale por pagar una consulta médica premium con el mejor especialista para tu total salud',
    'Vale por comprar e instalar un sistema de iluminación inteligente LED para todo tu espacio personal',
    
    // EXÓTICO - Ultra especial
    'Vale por cumplirte esa fantasía sexual que te hace morderte los labios cuando la piensas',
    'Vale por una noche donde mis labios recorrerán cada centímetro de tu piel sin dejar un solo rincón sin probar',
    'Vale por ser tu esclavo sexual por una noche: haré exactamente lo que me pidas, como me lo pidas',
    'Vale por comprarte la lencería más provocativa que encuentre para estrenarla juntos esa misma noche',
    'Vale por dejarte marcas de mordiscos y besos intensos en tus zonas más ocultas, esas que solo yo puedo ver',
    'Vale por un juego elegido por ti, donde el ganador de cada ronda dice qué prenda debe quitarse el perdedor',
    'Vale por un show erótico de baile privado totalmente personalizado hecho por mí para ti esa misma noche',
    'Vale por un interrogatorio caliente: por cada verdad atrevida que me confieses, tienes derecho a pedirme un favor íntimo',
    'Vale por obligarte a mirarme fijamente a los ojos mientras te llevo al orgasmo más intenso de tu vida',
    'Vale por vendarte los ojos y hacer que experimentes cada caricia, beso y estímulo sin saber de dónde viene',    

    // MÍTICO - Lo máximo
    'Vale por dos entradas en Zona VIP/Early Access para el concierto de tu artista favorito en el país, con pasajes incluidos',
    'Vale por un viaje de una semana completa a cualquier lugar fuera de la región con hoteles de lujo y guías privados',
    'Vale por comprar un telescopio profesional de gama alta con rastreo satelital para tu habitación',
    'Vale por financiar un viaje al observatorio astronómico más importante y profesional abierto al público',
    'Vale por un Pase Mítico de Inmunidad que consiste en perdón absoluto ante cualquier error grave',
    'Vale por comprarte una cámara fotográfica profesional para que retrates tus viajes y momentos favoritos',
    'Vale por una cena romántica privada en un balcón colonial reservado exclusivamente para nosotros dos toda la noche',
    'Vale por un juramento de lealtad absoluta: anteponer siempre tu paz mental y nuestra felicidad ante mi orgullo',
    'Vale por un baúl gigante misterioso lleno de 50 regalos individuales numerados para que abras uno por día',
];

function getRarityByCouponIndex(index) {
    if (index < 20) return 'comun';
    if (index < 40) return 'pocoComun';
    if (index < 60) return 'raro';
    if (index < 75) return 'epico';
    if (index < 87) return 'legendario';
    if (index < 97) return 'exotico';
    return 'mitico';
}

function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function seededNumber(seed, max) {
    let hash = 0;
    for (let i = 0; i < seed.length; i += 1) {
        hash = (hash << 5) - hash + seed.charCodeAt(i);
        hash |= 0;
    }
    return Math.abs(hash) % max;
}

function getRandomRarity() {
    const totalWeight = Object.values(RARITIES).reduce((sum, rarity) => sum + rarity.weight, 0);
    const random = Math.random();
    let accumulated = 0;

    for (const rarityKey of Object.keys(RARITIES)) {
        accumulated += RARITIES[rarityKey].weight / totalWeight;
        if (random < accumulated) {
            return rarityKey;
        }
    }

    return Object.keys(RARITIES).at(-1);
}

function getRandomCouponIndexForRarity(rarityKey) {
    const [start, end] = RARITY_INDEX_RANGES[rarityKey];
    const available = end - start;
    if (available <= 0) {
        return start;
    }

    return start + Math.floor(Math.random() * available);
}

function getRandomCoupon() {
    const rarityKey = getRandomRarity();
    const couponIndex = getRandomCouponIndexForRarity(rarityKey);
    const coupon = CUPPON_TEMPLATES[couponIndex];

    return {
        coupon,
        rarityKey,
        rarity: RARITIES[rarityKey],
    };
}

function getStoredSpinResult() {
    const saved = localStorage.getItem('miAmorCouponSpin');
    if (!saved) {
        return null;
    }

    try {
        const parsed = JSON.parse(saved);
        if (!parsed || parsed.date !== formatDate(new Date()) || !parsed.coupon || !RARITIES[parsed.rarity]) {
            return null;
        }
        return parsed;
    } catch {
        return null;
    }
}

function markSpunToday(coupon, rarityKey) {
    localStorage.setItem('miAmorCouponSpin', JSON.stringify({
        coupon,
        rarity: rarityKey,
        date: formatDate(new Date()),
    }));
}

function getSavedCoupons() {
    const saved = localStorage.getItem('miAmorSavedCoupons');
    const parsed = saved ? JSON.parse(saved) : [];
    const valid = Array.isArray(parsed) ? parsed.filter(item => item && item.rarity && RARITIES[item.rarity]) : [];
    if (JSON.stringify(valid) !== JSON.stringify(parsed)) {
        localStorage.setItem('miAmorSavedCoupons', JSON.stringify(valid));
    }
    return valid;
}

function isCouponSavedToday(coupon) {
    const savedCoupons = getSavedCoupons();
    const today = formatDate(new Date());
    return savedCoupons.some((item) => item.coupon === coupon && item.date === today);
}

function saveCoupon(coupon, rarityKey) {
    const savedCoupons = getSavedCoupons();
    const today = formatDate(new Date());
    const alreadySaved = savedCoupons.some((item) => item.coupon === coupon && item.date === today);
    if (alreadySaved) return;
    savedCoupons.unshift({ id: Date.now(), coupon, date: today, rarity: rarityKey });
    localStorage.setItem('miAmorSavedCoupons', JSON.stringify(savedCoupons));
}

function hasRedeemedToday() {
    const redeemed = localStorage.getItem('miAmorCouponRedeemed');
    const today = formatDate(new Date());
    if (redeemed === today) return true;
    try {
        const redeemedData = JSON.parse(redeemed);
        return redeemedData && redeemedData.date === today;
    } catch {
        return false;
    }
}

function getRedeemedCouponInfo() {
    const redeemedData = localStorage.getItem('miAmorCouponRedeemed');
    const today = formatDate(new Date());
    if (!redeemedData) return null;
    try {
        const parsed = JSON.parse(redeemedData);
        if (parsed && parsed.date === today && parsed.coupon && parsed.rarity) {
            return parsed;
        }
    } catch {
        if (redeemedData === today) {
            return null;
        }
    }
    return null;
}

function setRedeemedCouponInfo(coupon, rarityKey) {
    const today = formatDate(new Date());
    localStorage.setItem('miAmorCouponRedeemed', JSON.stringify({ coupon, rarity: rarityKey, date: today }));
}

function hasSpunToday() {
    return Boolean(getStoredSpinResult());
}

async function notifyDiscord(coupon, rarityKey) {
    try {
        const rarity = RARITIES[rarityKey];
        const timestamp = new Date().toLocaleString('es-ES');
        const message = {
            content: `🎉 **CUPÓN CANJEADO** 🎉\n\n**Rareza:** ${rarity.name}\n**Cupón:** ${coupon}\n**Fecha:** ${timestamp}`,
            embeds: [{
                color: parseInt(rarity.color.substring(1), 16),
                title: `${rarity.name} - Cupón Canjeado`,
                description: coupon,
                timestamp: new Date().toISOString(),
                footer: { text: '💝 Sistema de Cupones Mi Amor' }
            }]
        };
        
        const response = await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(message),
        });
        
        if (!response.ok) {
            console.error(`Discord webhook error: ${response.status} ${response.statusText}`);
            return false;
        }
        return true;
    } catch (error) {
        console.error('Error notifying Discord:', error);
        return false;
    }
}

function createConfetti(rarity, count = 15) {
    const colors = { comun: '#999', pocoComun: '#32cd32', raro: '#0277bd', epico: '#ba68c8', legendario: '#ff7043', exotico: '#26c6da', mitico: '#ffd700' };
    for (let i = 0; i < count; i++) {
        const confetti = document.createElement('div');
        confetti.className = `confetti ${rarity}`;
        confetti.style.cssText = `left: ${Math.random() * 100}%; top: -10px; width: ${Math.random() * 10 + 5}px; height: ${Math.random() * 10 + 5}px; background-color: ${colors[rarity]}; animation: fall ${2 + Math.random()}s linear forwards;`;
        celebrationContainer.appendChild(confetti);
        setTimeout(() => confetti.remove(), 2500);
    }
}

function createSparkles(rarity, count = 12) {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const colors = { comun: '#999', pocoComun: '#32cd32', raro: '#0277bd', epico: '#ba68c8', legendario: '#ff7043', exotico: '#26c6da', mitico: '#ffd700' };
    for (let i = 0; i < count; i++) {
        const spark = document.createElement('div');
        spark.className = `spark ${rarity}`;
        const angle = (Math.PI * 2 * i) / count;
        const velocity = 5 + Math.random() * 4;
        const tx = Math.cos(angle) * velocity * 40;
        const ty = Math.sin(angle) * velocity * 40;
        spark.style.cssText = `left: ${centerX}px; top: ${centerY}px; width: ${Math.random() * 6 + 4}px; height: ${spark.style.width}; background-color: ${colors[rarity]}`;
        celebrationContainer.appendChild(spark);
        setTimeout(() => {
            spark.style.transition = `all ${0.8 + Math.random() * 0.4}s ease-out`;
            spark.style.transform = `translate(${tx}px, ${ty}px)`;
            spark.style.opacity = '0';
        }, 5);
        setTimeout(() => spark.remove(), 1500);
    }
}

function celebrate(rarity) {
    const celebrations = {
        comun: () => {
            createConfetti(rarity, 20);
        },
        pocoComun: () => {
            createConfetti(rarity, 30);
            createSparkles(rarity, 15);
        },
        raro: () => {
            createConfetti(rarity, 40);
            createSparkles(rarity, 20);
        },
        epico: () => {
            createConfetti(rarity, 50);
            createSparkles(rarity, 25);
            document.body.style.animation = 'pulse-bg 0.5s ease';
            setTimeout(() => { document.body.style.animation = 'none'; }, 500);
        },
        legendario: () => {
            createConfetti(rarity, 60);
            createSparkles(rarity, 35);
            document.body.style.animation = 'pulse-bg 0.6s ease';
            setTimeout(() => { document.body.style.animation = 'none'; }, 600);
        },
        exotico: () => {
            createConfetti(rarity, 50);
            createSparkles(rarity, 30);
            document.body.style.animation = 'pulse-bg 0.5s ease';
            setTimeout(() => { document.body.style.animation = 'none'; }, 500);
        },
        mitico: () => {
            createConfetti(rarity, 80);
            createSparkles(rarity, 50);
            document.body.style.animation = 'pulse-bg 0.8s ease';
            setTimeout(() => { document.body.style.animation = 'none'; }, 800);
            // Efecto adicional de brillo
            const glow = document.createElement('div');
            glow.style.position = 'fixed';
            glow.style.top = '50%';
            glow.style.left = '50%';
            glow.style.transform = 'translate(-50%, -50%)';
            glow.style.width = '400px';
            glow.style.height = '400px';
            glow.style.borderRadius = '50%';
            glow.style.background = 'radial-gradient(circle, rgba(255,215,0,0.3) 0%, transparent 70%)';
            glow.style.pointerEvents = 'none';
            glow.style.animation = 'pulse-glow 0.8s ease-out forwards';
            celebrationContainer.appendChild(glow);
            setTimeout(() => glow.remove(), 800);
        },
    };

    if (celebrations[rarity]) {
        celebrations[rarity]();
    }
}

function drawWheel(canvas, highlightIndex = -1) {
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = canvas.width / 2 - 10;
    
    // Crear una distribución visual equilibrada de rarezas
    const wheelSegments = getWheelSegments();
    const sliceAngle = (Math.PI * 2) / wheelSegments.length;
    
    wheelSegments.forEach((rarityKey, index) => {
        const rarity = RARITIES[rarityKey];
        const startAngle = index * sliceAngle;
        const endAngle = (index + 1) * sliceAngle;
        
        // Dibujar el segmento
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.lineTo(centerX, centerY);
        ctx.fillStyle = rarity.color;
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Añadir brillo si es el segmento resaltado
        if (index === highlightIndex) {
            ctx.globalAlpha = 0.3;
            ctx.fillStyle = '#fff';
            ctx.fill();
            ctx.globalAlpha = 1.0;
        }
    });
}

function getWheelSegments() {
    const segments = [];
    const totalWeight = Object.values(RARITIES).reduce((sum, rarity) => sum + rarity.weight, 0);
    const entries = Object.entries(RARITIES);
    let remaining = 1000;

    entries.forEach(([rarityKey, rarity], index) => {
        const segmentCount = index === entries.length - 1
            ? remaining
            : Math.floor((rarity.weight / totalWeight) * 1000);

        remaining -= segmentCount;
        segments.push(...Array(segmentCount).fill(rarityKey));
    });

    return segments;
}

function updateBodyBackground(rarityKey) {
    const bgClasses = Object.values(RARITIES).map((rarity) => rarity.bgClass).filter(Boolean);
    document.body.classList.remove(...bgClasses);
    if (!rarityKey) return;
    const rarity = RARITIES[rarityKey];
    if (rarity && rarity.bgClass) {
        document.body.classList.add(rarity.bgClass);
    }
}

function removeSavedCouponById(id) {
    const savedCoupons = getSavedCoupons();
    const filtered = savedCoupons.filter((item) => item.id !== Number(id));
    localStorage.setItem('miAmorSavedCoupons', JSON.stringify(filtered));
}

function renderWheel() {
    const redeemed = hasRedeemedToday();
    const redeemedInfo = getRedeemedCouponInfo();
    const storedSpinResult = getStoredSpinResult();
    const activeResult = redeemedInfo || storedSpinResult;
    const displayedCoupon = activeResult ? activeResult.coupon : '';
    const displayedRarityKey = activeResult ? activeResult.rarity : null;
    const displayedRarity = displayedRarityKey ? RARITIES[displayedRarityKey] : null;
    const spunToday = Boolean(storedSpinResult);
    const savedCoupons = getSavedCoupons();
    const savedToday = displayedCoupon ? isCouponSavedToday(displayedCoupon) : false;
    const canSave = !redeemed && displayedCoupon && !savedToday;
    const showResult = spunToday || redeemed;
    const resultMessage = redeemed ? '¡Felicidades! Tu cupón se ha canjeado correctamente.' : '¡Felicidades! Tu cupón ha salido de la ruleta.';
    const resultSubtext = redeemed
        ? 'Disfruta este momento especial.'
        : displayedRarity
            ? `Este cupón tiene rareza ${displayedRarity.name}.`
            : '';

    updateBodyBackground(showResult ? displayedRarityKey : null);

    content.innerHTML = `
        <div class="wheel-panel ${spunToday ? 'hidden' : ''}">
            <div class="wheel-pointer"></div>
            <img class="wheel-image" id="wheel-image" src="imagenes/ruleta.png" alt="Ruleta" />
            <div class="wheel-controls">
                <button class="spin-button" id="spin-button" ${redeemed ? 'disabled' : ''}>
                    ${redeemed ? 'Ya canjeado hoy' : 'GIRAR RULETA'}
                </button>
            </div>
        </div>
        <div class="result-panel ${showResult ? '' : 'hidden'}" id="result-panel">
            <div class="result-display show">
                <div class="result-rarity ${displayedRarityKey || ''}">${displayedRarity ? displayedRarity.name : ''}</div>
                <p class="result-message">${resultMessage}</p>
                <div class="result-cuppon ${displayedRarityKey || ''}">${displayedCoupon}</div>
                <p class="result-description">${resultSubtext}</p>
                <div class="save-redeem-actions">
                    <button class="save-button" id="save-button" ${canSave ? '' : 'disabled'}>
                        ${savedToday ? 'Guardado' : redeemed ? 'Ya canjeado' : 'Guardar'}
                    </button>
                    <button class="redeem-button" id="redeem-button" ${redeemed ? 'disabled' : ''}>
                        ${redeemed ? 'Canjeado' : 'Canjear'}
                    </button>
                </div>
            </div>
        </div>
        ${savedCoupons.length > 0 ? `
            <div class="saved-coupons">
                <h3>Cupones Guardados</h3>
                <ul>
                    ${savedCoupons.map(item => `
                        <li>
                            <div class="saved-coupon-item">
                                <span>
                                    <strong>${item.date}:</strong> ${item.coupon}
                                    <span style="color: #999; font-size: 0.85rem;">
                                        (${RARITIES[item.rarity]?.name || 'Desconocido'})
                                    </span>
                                </span>
                                <button class="redeem-saved" data-id="${item.id}" ${redeemed ? 'disabled' : ''}>
                                    Canjear
                                </button>
                            </div>
                        </li>
                    `).join('')}
                </ul>
            </div>
        ` : ''}
    `;

    const wheelImage = document.getElementById('wheel-image');
    const wheelPanel = document.querySelector('.wheel-panel');
    const resultPanel = document.getElementById('result-panel');
    const spinButton = document.getElementById('spin-button');
    const saveButton = document.getElementById('save-button');
    const redeemButton = document.getElementById('redeem-button');

    let isSpinning = false;

    if (spinButton && !redeemed) {
        spinButton.addEventListener('click', () => {
            if (isSpinning) return;
            isSpinning = true;
            spinButton.classList.add('spinning');
            if (wheelImage) {
                wheelImage.style.transition = 'transform 3s cubic-bezier(0.33, 1, 0.68, 1)';
            }

            const spins = 5 + Math.random() * 3;
            const duration = 3000;
            const startTime = Date.now();
            const wheelSegments = getWheelSegments();
            const segmentCount = wheelSegments.length;
            const randomSegmentIndex = Math.floor(Math.random() * segmentCount);
            const targetRotation = spins * 360 + (randomSegmentIndex / segmentCount) * 360;
            const spinResult = getRandomCoupon();

            const animate = () => {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easeProgress = 1 - Math.pow(1 - progress, 3);
                const rotation = targetRotation * easeProgress;
                if (wheelImage) {
                    wheelImage.style.transform = `rotate(${rotation}deg)`;
                }

                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    markSpunToday(spinResult.coupon, spinResult.rarityKey);
                    renderWheel();
                    celebrate(spinResult.rarityKey);
                    isSpinning = false;
                }
            };

            animate();
        });
    }

    if (saveButton && canSave) {
        saveButton.addEventListener('click', () => {
            saveCoupon(displayedCoupon, displayedRarityKey);
            renderWheel();
        });
    }

    if (redeemButton && !redeemed && displayedCoupon) {
        redeemButton.addEventListener('click', async () => {
            if (hasRedeemedToday()) return;
            setRedeemedCouponInfo(displayedCoupon, displayedRarityKey);
            updateBodyBackground(displayedRarityKey);
            await notifyDiscord(displayedCoupon, displayedRarityKey);
            renderWheel();
        });
    }

    document.querySelectorAll('.redeem-saved').forEach((button) => {
        button.addEventListener('click', async () => {
            if (hasRedeemedToday()) return;
            const savedId = button.getAttribute('data-id');
            const savedEntry = savedCoupons.find(item => item.id == savedId);
            if (savedEntry) {
                removeSavedCouponById(savedId);
                setRedeemedCouponInfo(savedEntry.coupon, savedEntry.rarity);
                updateBodyBackground(savedEntry.rarity);
                await notifyDiscord(savedEntry.coupon, savedEntry.rarity);
                renderWheel();
            }
        });
    });
}

// Agregar estilos dinámicos para animaciones
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse-bg {
        0%, 100% { filter: brightness(1); }
        50% { filter: brightness(1.2); }
    }
    @keyframes pulse-glow {
        0% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        100% { opacity: 0; transform: translate(-50%, -50%) scale(1.5); }
    }
`;
document.head.appendChild(style);

renderWheel();
