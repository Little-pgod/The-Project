const content = document.getElementById('content');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const musicList = [
    { title: 'Right Here - Lil Peep', url: 'https://youtu.be/m-44PIocS_4?si=B1Sf85Z5mKs0xs6l' },
    { title: 'Gone, Gone, Gone - Phillip Phillips', url: 'https://youtu.be/oozQ4yV__Vw?si=sw4iC5gAgyLKBQzj' },
    { title: 'Till Kingdom Come - Coldplay', url: 'https://youtu.be/E0UN-pVTLf4?si=1rNzG0qJvD8tNSSw' },
    { title: 'Golden Hour - JVKE', url: 'https://youtu.be/PEM0Vs8jf1w?si=phjEgf403aBhWydN' },
    { title: 'Big City Blues - Lil Peep', url: 'https://youtu.be/6ViiarPAoYY?si=QbORLSR4A1RJjH1m' },
    { title: 'Lose my mind - Lil Peep', url: 'https://youtu.be/Wo2xASBNWVU?si=72zBvwag_aBkwYQc' },
];

content.classList.add('musica-card');
content.innerHTML = `
    <div class="modal-header">
        <ul class="song-list">
            ${musicList.map(song => `
                <li>
                    <a class="song-link" href="${song.url}" target="_blank" rel="noreferrer">
                        ${song.title}
                    </a>
                </li>
            `).join('')}
        </ul>
    </div>
`;
const noteScene = document.querySelector('.music-floating-notes');
if (!prefersReducedMotion && noteScene) {
    const notes = [
        { left: '10%', top: '14%', size: '42px', opacity: 0.88, shape: 'circle', icon: '♪', color: '255, 118, 173', speed: 0.85 },
        { left: '24%', top: '28%', size: '34px', opacity: 0.76, shape: 'diamond', icon: '♬', color: '135, 198, 255', speed: 0.75 },
        { left: '82%', top: '12%', size: '38px', opacity: 0.82, shape: 'rounded', icon: '♫', color: '229, 190, 255', speed: 0.95 },
        { left: '88%', top: '42%', size: '30px', opacity: 0.78, shape: 'square', icon: '♩', color: '255, 196, 130', speed: 0.90 },
        { left: '12%', top: '66%', size: '36px', opacity: 0.84, shape: 'heart', icon: '♥', color: '255, 152, 206', speed: 0.65 },
        { left: '70%', top: '76%', size: '32px', opacity: 0.72, shape: 'spark', icon: '✦', color: '166, 255, 196', speed: 0.80 },
    ];

    const floatingNotes = notes.map(({ left, top, size, opacity, shape, icon, color, speed }) => {
        const note = document.createElement('div');
        note.className = `note-floating shape-${shape}`;
        note.style.left = left;
        note.style.top = top;
        note.style.width = size;
        note.style.height = size;
        note.style.opacity = opacity;
        note.style.setProperty('--note-color', color);
        note.setAttribute('data-icon', icon);
        noteScene.appendChild(note);

        const w = parseFloat(size);
        const x = (parseFloat(left) / 100) * window.innerWidth;
        const y = (parseFloat(top) / 100) * window.innerHeight;
        const angle = Math.random() * Math.PI * 2;
        return {
            el: note,
            x,
            y,
            w,
            h: w,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
        };
    });

    function updateFloatingNotes() {
        const width = window.innerWidth;
        const height = window.innerHeight;

        floatingNotes.forEach(item => {
            item.x += item.vx;
            item.y += item.vy;

            if (item.x < -item.w) item.x = width + item.w;
            if (item.x > width + item.w) item.x = -item.w;
            if (item.y < -item.h) item.y = height + item.h;
            if (item.y > height + item.h) item.y = -item.h;

            item.el.style.left = `${item.x}px`;
            item.el.style.top = `${item.y}px`;
        });

        requestAnimationFrame(updateFloatingNotes);
    }

    requestAnimationFrame(updateFloatingNotes);
}

/* Entrance animation sequence:
   1) white overlay visible
   2) show card
   3) stagger songs appearance
*/

document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('entrance-overlay');
    const body = document.querySelector('.app-body.musica-page');
    const card = document.querySelector('.hero-card.musica-card');
    const items = Array.from(document.querySelectorAll('.song-list li'));

    // entrance timings (in ms)
    const initialWhite = 200;
    const overlayRevealDelay = 300;
    const overlayFadeDuration = 700;
    const cardDelayAfterOverlay = 320;
    const staggerBase = 180;

    // start after the tiny white flash
    setTimeout(() => {
        // reveal the colors quickly while background continues flowing
        setTimeout(() => {
            overlay.classList.add('revealed');

            // after overlay faded, show card and stagger items
            setTimeout(() => {
                card.classList.add('card-show');
                items.forEach((li, idx) => {
                    li.style.animationDelay = (staggerBase * idx + 120) + 'ms';
                    li.classList.add('song-in');
                });
            }, cardDelayAfterOverlay + overlayFadeDuration);

        }, overlayRevealDelay);

    }, initialWhite);
});
 