const btnEntrar = document.getElementById("btnEntrar");

if (btnEntrar) {
    btnEntrar.addEventListener("click", () => {
        document.body.classList.add("fade-out");
        setTimeout(() => {
            window.location.href = "menu.html";
        }, 1000);
    });
}