const translations = {
  en: {
    imereti: "Imereti",
    guria: "Guria",
    samegrelo: "Samegrelo",
    kakheti: "Kakheti",
    qartli: "Qartli"
  },
  ka: {
    imereti: "იმერეთი",
    guria: "გურია",
    samegrelo: "სამეგრელო",
    kakheti: "კახეთი",
    qartli: "ქართლი"
  }
};



function setLanguage(lang) {
  localStorage.setItem('lang', lang);

  // textContent-ების განახლება
  document.querySelectorAll('[data-translate]').forEach(el => {
    const key = el.getAttribute('data-translate');
    if (translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  // placeholder-ის განახლება
  document.querySelectorAll('[data-translate-placeholder]').forEach(el => {
    const key = el.getAttribute('data-translate-placeholder');
    if (translations[lang][key]) {
      el.setAttribute('placeholder', translations[lang][key]);
    }
  });

  // input value-ს განახლება (submit button)
  document.querySelectorAll('[data-translate-value]').forEach(el => {
    const key = el.getAttribute('data-translate-value');
    if (translations[lang][key]) {
      el.setAttribute('value', translations[lang][key]);
    }
  });

  // დიდ ტექსტს ინახავ
  const imeretiTextEl = document.getElementById('imereti-description');
  if (imeretiTextEl && translations[lang].imeretiDescription) {
    imeretiTextEl.innerHTML = translations[lang].imeretiDescription;
  }

  // active კლასის გადართვა ენის ღილაკებზე
  document.querySelectorAll('.language-switcher button').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });
}




function search() {
  const query = document.getElementById("search-bar").value.trim().toLowerCase();
  if (!query) { closePopup(); return; }

  const box = Array.from(document.querySelectorAll("#package .box"))
    .find(b => {
      const name = b.getAttribute("data-name");
      return name && name.toLowerCase().includes(query);
    });

  if (!box) {
    alert("ადგილი არ მოიძებნა: " + query);
    return;
  }

  // === 1. გადავდივართ home-ზე ===
  document.getElementById("home").scrollIntoView({ behavior: "smooth" });

  // === 2. ვქმნით მინიმალურ popup box-ს ===
  const clone = document.createElement("div");
  clone.className = "box popup-box";
  clone.style.cursor = "pointer";

  const originalImg = box.querySelector("img");
  const originalTitle = box.querySelector("h3 a") || box.querySelector("h3");

  // სურათი
  if (originalImg) {
    const img = originalImg.cloneNode();
    img.style.width = "100%";
    img.style.height = "200px";
    img.style.objectFit = "cover";
    img.style.borderRadius = "15px 15px 0 0";
    clone.appendChild(img);
  }

  // სახელი
  if (originalTitle) {
    const title = document.createElement("h3");
    title.innerHTML = originalTitle.innerHTML;
    title.style.margin = "15px 0 10px";
    title.style.textAlign = "center";
    title.style.fontSize = "1.4rem";
    clone.appendChild(title);
  }

  // ღილაკი
  const btn = document.createElement("button");
  btn.innerText = "აჩვენე ინფორმაცია";
  btn.className = "btn";
  btn.style.display = "block";
  btn.style.margin = "0 auto 15px";
  btn.style.padding = "10px 20px";
  btn.onclick = function(e) {
    e.stopPropagation();
    closePopup();
    setTimeout(() => {
      goToPackage(box.id);
    }, 300);
  };
  clone.appendChild(btn);

  // === 3. popup-ში ჩასმა ===
  const popupContent = document.getElementById("popup-content");
  popupContent.innerHTML = "";
  popupContent.appendChild(clone);

  document.getElementById("search-popup").style.display = "block";
  document.getElementById("popup-overlay").style.display = "block";

  // === 4. დააჭირე box-ზე (არა ღილაკზე) → გადადი #package-ზე ===
  clone.onclick = function(e) {
    if (e.target.tagName === "BUTTON") return;
    closePopup();
    setTimeout(() => {
      goToPackage(box.id);
    }, 300);
  };
}

// === ფუნქცია: გადასვლა #package-ზე + ანათება (არა ავტომატური ინფო!) ===
function goToPackage(boxId) {
  document.getElementById("package").scrollIntoView({ behavior: "smooth" });

  setTimeout(() => {
    const originalBox = document.getElementById(boxId);
    if (!originalBox) return;

    // გადადის და ანათებს
    originalBox.scrollIntoView({ behavior: "smooth", block: "center" });
    originalBox.style.transition = "all 0.4s ease";
    originalBox.style.transform = "scale(1.06)";
    originalBox.style.boxShadow = "0 0 30px rgba(255, 193, 7, 0.9)";
    originalBox.style.zIndex = "10";

    // ანიმაციის დასრულება
    setTimeout(() => {
      originalBox.style.transform = "";
      originalBox.style.boxShadow = "";
      originalBox.style.zIndex = "";
    }, 5200);

    // ინფორმაცია არ იხსნება ავტომატურად!
  }, 500);
}

function closePopup() {
  document.getElementById("search-popup").style.display = "none";
  document.getElementById("popup-overlay").style.display = "none";
}







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





function showName(key, foto) {
  const lang = localStorage.getItem('lang') || 'en';
  const nameDisplay = document.getElementById('nameDisplay');
  const fotoDisplay = document.getElementById('photoDisplay');
  const infoDisplay = document.getElementById('infoDisplay');

  if (nameDisplay && fotoDisplay && infoDisplay) {
    // translations ობიექტიდან ენაზე მიხედვით ვიღებთ სახელს
    const translatedName = translations[lang] && translations[lang][key] ? translations[lang][key] : key;

    nameDisplay.textContent = translatedName;
    nameDisplay.setAttribute('data-translate', key); // რომ setLanguage-ში იმუშაოს
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





// ღილაკი "read more" — მხოლოდ ტექსტის ჩვენება
document.querySelectorAll('.show-info-button-class').forEach(button => {
  button.addEventListener('click', function () {
    const box = this.closest('.box');
    const modal = box.querySelector('.photo-info-modal-class');
    const map = modal.querySelector('.modal-map-content');
    const text = modal.querySelector('.modal-text-content');

    modal.style.display = 'flex';
    text.style.display = 'block';  // ტექსტი ჩართულია
    map.style.display = 'none';    // რუკა დამალულია
  });
});






// იკონაზე დაჭერა — მხოლოდ რუკის ჩვენება
document.querySelectorAll('.show-map-button-class').forEach(icon => {
  icon.addEventListener('click', function (e) {
    e.preventDefault();

    const box = this.closest('.box');
    const modal = box.querySelector('.photo-info-modal-class');
    const map = modal.querySelector('.modal-map-content');
    const text = modal.querySelector('.modal-text-content');

    modal.style.display = 'flex';
    map.style.display = 'block';   // რუკა ჩართულია
    text.style.display = 'none';   // ტექსტი დამალულია
  });
});

// დახურვის ღილაკი
document.querySelectorAll('.close-button-class').forEach(button => {
  button.addEventListener('click', function () {
    const modal = this.closest('.photo-info-modal-class');
    modal.style.display = 'none';
  });
});




const API_BASE_URL = "https://my-tourism-production.up.railway.app";
 // შეცვალე აქ თუ სერვერი არ არის ლოკალზე


const form = document.getElementById("commentForm");
const wrapper = document.getElementById("reviewWrapper");

let swiper;

function renderReview(review) {
  const div = document.createElement("div");
  div.className = "swiper-slide";
  div.innerHTML = `
    <div class="box">
      ${review.photo ? `<img src="${review.photo}" alt="User Photo" width="200" />` : ""}
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

async function loadReviews() {
  wrapper.innerHTML = "";
  try {
    const res = await fetch(`${API_BASE_URL}/api/comments`);
    if (!res.ok) throw new Error("Failed to fetch comments");

    const reviews = await res.json();

    reviews.forEach(renderReview);

    if (!swiper) {
      swiper = new Swiper(".review-slider", {
        spaceBetween: 20,
        loop: true,
        autoplay: { delay: 2500, disableOnInteraction: false },
        pagination: { el: ".swiper-pagination", clickable: true },
        navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
        breakpoints: {
          0: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          991: { slidesPerView: 3 },
        },
      });
    } else {
      swiper.update();
    }
  } catch (error) {
    console.error("Failed to load reviews:", error);
  }
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  console.log("Sending formData:", [...formData.entries()]);

  try {
    const res = await fetch(`${API_BASE_URL}/api/comments`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    console.log("Response from server:", data);

    if (!res.ok) {
      alert(data.message || "Error submitting comment");
      return;
    }

    alert("Comment added successfully!");
    form.reset();
    loadReviews();
  } catch (error) {
    alert("Failed to send comment.");
    console.error(error);
  }
});

// გვერდის ჩატვირთვისას დატვირთე კომენტარები
loadReviews();
