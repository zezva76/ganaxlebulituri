// ინიციალიზაცია შენი Public Key-ით
emailjs.init("RSMphI6KCo-xCq2Pm");

// მენიუს ღილაკის ფუნქციონალი (მობილურისთვის)
const menuBar = document.getElementById('menu-bar');
const navbar = document.querySelector('header .navbar');

menuBar.addEventListener('click', () => {
  navbar.classList.toggle('active');
});

// ფორმის გაგზავნის ლოგიკა EmailJS-ით
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contactForm');
  const statusMessage = document.getElementById('statusMessage');
  const sendBtn = form.querySelector('.send-btn');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // ვალიდაცია HTML5 მეთოდით
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    // ღილაკის დაბლოკვა და სტატუსის ჩვენება
    sendBtn.disabled = true;
    sendBtn.textContent = 'Sending...';

    emailjs.sendForm('service_gf3puag', 'template_x6g9wnl', form)
      .then(() => {
        statusMessage.innerText = 'Message sent successfully!';
        statusMessage.style.color = 'green';
        form.reset(); // ცარიელდება ფორმა
      })
      .catch((error) => {
        console.error('Error:', error);
        statusMessage.innerText = 'Failed to send. Please try again.';
        statusMessage.style.color = 'red';
      })
      .finally(() => {
        sendBtn.disabled = false;
        sendBtn.textContent = 'Send';
      });
  });
});

