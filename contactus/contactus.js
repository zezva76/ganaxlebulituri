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

  if (!contactForm.checkValidity()) {
    contactForm.reportValidity();
    return;
  }

  const sendBtn = contactForm.querySelector('.send-btn');
  sendBtn.disabled = true;
  sendBtn.textContent = 'იგზავნება...';

  // აქ შეცვალე send() => sendForm() და formData-თი ჩანაცვლება this-ზე
  emailjs.sendForm('service_1pnr22q', 'template_x6g9wnl', this)
    .then(() => {
      statusMessage.style.color = 'green';
      statusMessage.textContent = 'შეტყობინება წარმატებით გაიგზავნა! მადლობა.';
      contactForm.reset();
      sendBtn.disabled = false;
      sendBtn.textContent = 'გაგზავნა';
    })
    .catch(() => {
      statusMessage.style.color = 'red';
      statusMessage.textContent = 'გაგზავნა ვერ მოხერხდა. გთხოვთ სცადეთ თავიდან.';
      sendBtn.disabled = false;
      sendBtn.textContent = 'გაგზავნა';
    });
});
