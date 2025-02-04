/* update of year */

document.getElementById("copyright-year").textContent =
  new Date().getFullYear();

// header event scroll
window.addEventListener("scroll", function () {
  let header = this.document.querySelector("header");
  if (this.window.scrollY > 50) {
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
        resultForm.style.display = "none";
      }, 3000);
    });
});
