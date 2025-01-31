document.getElementById("copyright-year").textContent = new Date().getFullYear();

// header event scroll
window.addEventListener("scroll", function() {
    let header = this.document.querySelector("header");
    if (this.window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});