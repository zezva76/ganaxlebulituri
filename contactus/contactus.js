// ინიციალიზაცია შენი Public Key-ით
emailjs.init("RSMphI6KCo-xCq2Pm");

// მენიუს ღილაკის ფუნქციონალი (მობილურისთვის)
const menuBar = document.getElementById('menu-bar');
const navbar = document.querySelector('header .navbar');

menuBar.addEventListener('click', () => {
  navbar.classList.toggle('active');
});

// ფორმის გაგზავნის ლოჯიკა EmailJS-ით
const contactForm = document.getElementById('contactForm');
const statusMessage = document.getElementById('statusMessage');

contactForm.addEventListener('submit', function(event) {
  event.preventDefault();

  // ვალიდაცია HTML5-ის მეთოდებით
  if (!contactForm.checkValidity()) {
    contactForm.reportValidity();
    return;
  }

  // ღილაკის დეაქტივაცია და ტექსტის შეცვლა გაგზავნის პროცესის დროს
  const sendBtn = contactForm.querySelector('.send-btn');
  sendBtn.disabled = true;
  sendBtn.textContent = 'იგზავნება...';

  // EmailJS form send
  emailjs.sendForm('service_1pnr22q', 'template_x6g9wnl', this)
    .then(() => {
      statusMessage.style.color = 'green';
      statusMessage.textContent = 'Message sent successfully! Thank you.';  // შეტყობინება წარმატებით გაიგზავნა! მადლობა.
      contactForm.reset();
      sendBtn.disabled = false;
      sendBtn.textContent = 'Send';  //გაგზავნა
    })
    .catch(() => {
      statusMessage.style.color = 'red';
      statusMessage.textContent = 'Failed to send. Please try again.'; //გაგზავნა ვერ მოხერხდა. გთხოვთ სცადეთ თავიდან.
      sendBtn.disabled = false;
      sendBtn.textContent = 'Send'; //გაგზავნა
    });
});



document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contactForm');
  const statusMessage = document.getElementById('statusMessage');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    emailjs.sendForm('service_1pnr22q', 'template_x6g9wnl', form)
      .then(() => {
        statusMessage.innerText = 'შეტყობინება წარმატებით გაიგზავნა!';
        statusMessage.style.color = 'green';
        form.reset(); // ცარიელდება ფორმა
      })
      .catch((error) => {
        console.error('შეცდომა:', error);
        statusMessage.innerText = 'შეცდომა შეტყობინების გაგზავნისას.';
        statusMessage.style.color = 'red';
      });
  });
});
