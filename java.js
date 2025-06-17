/*

let searchBtn = document.querySelector('#search-btn');
let searchBar = document.querySelector('.search-bar-container');
let formBtn = document.querySelector('#login-btn');
let loginForm = document.querySelector('.login-form-container');
let formClose = document.querySelector('#form-close');
let menu = document.querySelector('#menu-bar');
let navbar = document.querySelector('.navbar');


window.onscroll = () =>{
    searchBtn.classList.remove('fa-times');
    searchBar.classList.remove('active');
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');
    loginForm.classList.remove('active');
 
}

menu.addEventListener('click', () => {
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
});

searchBtn.addEventListener('click', () => {
    searchBtn.classList.toggle('fa-times');
    searchBar.classList.toggle('active');
});

formBtn.addEventListener('click', () => {
    loginForm.classList.add('active');
});

formClose.addEventListener('click', () => {
    loginForm.classList.remove('active');
});

function showName(name, foto) {
    var nameDisplay = document.getElementById('nameDisplay');
    var fotoDisplay = document.getElementById('photoDisplay')
    nameDisplay.textContent = name;
    fotoDisplay.src = foto;

    var infoDisplay = document.getElementById('infoDisplay');
    infoDisplay.style.display = 'block';
}

var swiper = new Swiper(".review-slider", {
    spaceBetween: 20,
    loop:true,
    autoplay:{
        delay: 2500,
        disableOnInteraction: false,
    },
    breakpoints:{
        640:{
            slidesPerView: 1,
        },
            768: {
                slidesPerView: 2,
            },
            1024:{
                slidesPerView: 3,
            },
    },
});

//home

const showButtonDiscover = document.getElementById('show-info-button-discover');
const photoInfoDiscover = document.getElementById('info-discover');
const closeButtonDiscover = document.getElementById('close-button-discover');

showButtonDiscover.addEventListener('click', () => {
  
    photoInfoDiscover.style.display = 'flex';
    showButtonDiscover.style.display = 'none';
});

closeButtonDiscover.addEventListener('click', () => {
 
    photoInfoDiscover.style.display = 'none';
    showButtonDiscover.style.display = 'inline-block';
});


*/



document.addEventListener('DOMContentLoaded', () => {

  const searchBtn = document.querySelector('#search-btn');
  const searchBar = document.querySelector('.search-bar-container');
  const formBtn = document.querySelector('#login-btn');
  const loginForm = document.querySelector('.login-form-container');
  const formClose = document.querySelector('#form-close');
  const menu = document.querySelector('#menu-bar');
  const navbar = document.querySelector('.navbar');
  const showButtonDiscover = document.getElementById('show-info-button-discover');
  const photoInfoDiscover = document.getElementById('info-discover');
  const closeButtonDiscover = document.getElementById('close-button-discover');

  window.addEventListener('scroll', () => {
    searchBtn?.classList.remove('fa-times');
    searchBar?.classList.remove('active');
    menu?.classList.remove('fa-times');
    navbar?.classList.remove('active');
    loginForm?.classList.remove('active');
  });

  menu?.addEventListener('click', () => {
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
  });

  searchBtn?.addEventListener('click', () => {
    searchBtn.classList.toggle('fa-times');
    searchBar.classList.toggle('active');
  });

  formBtn?.addEventListener('click', () => {
    loginForm.classList.add('active');
  });

  formClose?.addEventListener('click', () => {
    loginForm.classList.remove('active');
  });

  if (showButtonDiscover && photoInfoDiscover && closeButtonDiscover) {
    showButtonDiscover.addEventListener('click', () => {
      photoInfoDiscover.style.display = 'flex';
      showButtonDiscover.style.display = 'none';
    });

    closeButtonDiscover.addEventListener('click', () => {
      photoInfoDiscover.style.display = 'none';
      showButtonDiscover.style.display = 'inline-block';
    });
  }

  new Swiper(".review-slider", {
    spaceBetween: 20,
    loop: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    breakpoints: {
      640: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
    },
  });

});



//ლოგინი logi in

const loginForm = document.getElementById('loginForm');

if (loginForm) {
  loginForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const email = loginForm.email.value;
    const password = loginForm.password.value;

    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const result = await response.json();

    if (response.ok) {
      alert('შესვლა წარმატებულია!');
      console.log('მონაცემები:', result);
    } else {
      alert(result.message || 'შეცდომა ავტორიზაციაში');
    }
  });
}


// showName ფუნქცია დარჩება გარეთ თუ სხვაგან იძახები
function showName(name, foto) {
  const nameDisplay = document.getElementById('nameDisplay');
  const fotoDisplay = document.getElementById('photoDisplay');
  const infoDisplay = document.getElementById('infoDisplay');

  if (nameDisplay && fotoDisplay && infoDisplay) {
    nameDisplay.textContent = name;
    fotoDisplay.src = foto;
    infoDisplay.style.display = 'block';
  }
}








// PACKAGE SECTION JS OPTIMIZED
// 1. "read more" ღილაკების მართვა
const showButtons = document.querySelectorAll('.show-info-button-class'); // აირჩიეთ ყველა ღილაკი ამ კლასით

showButtons.forEach(button => {
    button.addEventListener('click', () => {
        // იპოვეთ შესაბამისი "photo-info-modal-class" კონტეინერი
        const box = button.closest('.box');
        const photoInfoModal = box.querySelector('.photo-info-modal-class');

        if (photoInfoModal) {
            photoInfoModal.style.display = 'flex'; // გამოაჩინეთ მოდალი
            button.style.display = 'none'; // დამალეთ "read more" ღილაკი
        }
    });
});

// 2. "close" ღილაკების მართვა
const closeButtons = document.querySelectorAll('.close-button-class'); // აირჩიეთ ყველა close ღილაკი

closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        // იპოვეთ შესაბამისი "photo-info-modal-class" კონტეინერი
        const photoInfoModal = button.closest('.photo-info-modal-class');
        // იპოვეთ შესაბამისი "read more" ღილაკი
        const box = button.closest('.box');
        const showButton = box.querySelector('.show-info-button-class');

        if (photoInfoModal) {
            photoInfoModal.style.display = 'none'; // დამალეთ მოდალი
        }
        if (showButton) {
            showButton.style.display = 'block'; // გამოაჩინეთ "read more" ღილაკი
        }
    });
});

// 3. "book now" ღილაკების მართვა (სურვილისამებრ)
// თუ bookNow, bookNow1, bookNow2... ფუნქციები მხოლოდ გადამისამართებას აკეთებენ,
// შეგიძლიათ ესეც განაზოგადოთ.
const bookNowButtons = document.querySelectorAll('.book-now-button-class');

bookNowButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        event.preventDefault(); // შეაჩერეთ სტანდარტული გადამისამართება
        window.location.href = button.getAttribute('href'); // გადაამისამართეთ href-ის მიხედვით
        alert('Booking initiated!'); // შეგიძლიათ შეცვალოთ ეს შეტყობინება
    });
});




//review

const form = document.getElementById('commentForm');
const wrapper = document.getElementById('reviewWrapper');

let reviews = JSON.parse(localStorage.getItem('reviews') || '[]');

const renderReview = (review) => {
    const div = document.createElement('div');
    div.className = 'swiper-slide';
    div.innerHTML = `
        <div class="box">
            <img src="${review.image}" alt="User Photo">
            <h3>${review.name}</h3>
            <p>${review.text}</p>
            <div class="stars">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star-half-alt"></i>
                <i class="far fa-star"></i>
            </div>
        </div>
    `;
    wrapper.appendChild(div);
}

// პირველადი კომენტარების ნახვა და სლაიდერისთვის დამატება
reviews.forEach(renderReview);

// დააამატე სლაიდერი აქ, რათა შემდეგ მოხდეს update
var swiper = new Swiper(".review-slider", {
    spaceBetween: 20,
    loop: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        0: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        991: { slidesPerView: 3 }
    },
});

// ფორმის გასააქტიურებლად
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('username').value;
    const comment = document.getElementById('commentInput').value;
    const file = document.getElementById('imageInput').files[0];

    if (!file) {
        alert("გთხოვ, ატვირთე სურათი!");
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const newReview = {
            name: name,
            text: comment,
            image: e.target.result
        };
        reviews.push(newReview);
        localStorage.setItem('reviews', JSON.stringify(reviews));
        renderReview(newReview);
        swiper.update();  // აუცილებლად განაახლე სლაიდერი
        form.reset();
    };
    reader.readAsDataURL(file);
});
