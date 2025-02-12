/* update of year */

document.getElementById("copyright-year").textContent =
  new Date().getFullYear();

// header event scroll
window.addEventListener("scroll", function () {
  let header = this.document.querySelector(".header");
  if (this.window.scrollY > 80) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// sending form
const formContact = document.getElementById("contact-form");
const resultForm = document.getElementById("result-form");
const submitButton = document.getElementById("btn-form");
const textButton = submitButton.textContent;

formContact.addEventListener("submit", function (e) {
  e.preventDefault();
  const formData = new FormData(formContact);
  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);
  submitButton.disabled = true; // disable submit button
  submitButton.textContent = "Sending...";

  fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: json,
  })
    .then(async (response) => {
      let json = await response.json();
      if (response.status == 200) {
        resultForm.innerHTML = json.message;
      } else {
        // console.log(response);
        resultForm.innerHTML = json.message;
      }
      resultForm.classList.toggle("visible");
    })
    .catch((error) => {
      // console.log(error);
      resultForm.innerHTML = "Error sending the data of form!";
    })
    .then(function () {
      submitButton.disabled = false;
      submitButton.textContent = textButton;

      formContact.reset();
      setTimeout(() => {
        resultForm.classList.toggle("visible");
      }, 3000);
    });
});

/* burger menu */
function openCloseMenu() {
  document.querySelector(".header .burger").classList.toggle("active");
  document.querySelector("nav").classList.toggle("open");
  document.querySelector("body").classList.toggle("no-scroll");
}

document.querySelector(".header").addEventListener("click", function (event) {
  if (event.target.closest(".burger")) {
    openCloseMenu();
    return;
  }

  if (event.target.matches(".open .btn")) {
    const href = this.querySelector(".open .btn").getAttribute("href");
    if (href.startsWith("#")) {
      event.preventDefault(); // Prevent standard behavior
      const targetId = href.substring(1);
      location.hash = ""; // reset hash
      location.hash = targetId; // set again
      history.pushState(null, null, href); // update
      openCloseMenu(); // close menu
      }
  }
});
