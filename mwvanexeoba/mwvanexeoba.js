// mwvanexeoba.js

// DOM ელემენტების მიღება
const fullImgBox = document.getElementById("fullImgBox");
const fullImg = document.getElementById("fullImg");
const closeBtn = document.getElementById('closeBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const galleryImages = document.querySelectorAll('.img-gallery img');

let images = []; // ყველა სურათის src მასივი
let currentImageIndex = 0; // მიმდინარე სურათის ინდექსი

// DOM-ის ჩატვირთვის შემდეგ შევავსოთ images მასივი და დავამატოთ Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // შეავსეთ images მასივი ყველა გალერეის სურათის src-ით
    galleryImages.forEach(img => {
        images.push(img.src);
    });

    // დაამატეთ click Event Listener ყველა thumbnail სურათს
    galleryImages.forEach((img, index) => {
        img.addEventListener('click', function() {
            openFullImg(this.src); // გახსენით დაჭერილი სურათი
            currentImageIndex = index; // დააყენეთ მიმდინარე ინდექსი
            updateNavButtons(); // განაახლეთ ნავიგაციის ღილაკები
        });
    });

    // დაამატეთ Event Listener დახურვის ღილაკს
    if (closeBtn) {
        closeBtn.addEventListener('click', closeFullImg);
    }
    
    // დაამატეთ Event Listener ნავიგაციის ღილაკებს
    if (prevBtn) {
        prevBtn.addEventListener('click', showPreviousImage);
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', showNextImage);
    }

    // დაამატეთ Event Listener კლავიატურის ღილაკებისთვის (Esc, Arrow Left, Arrow Right)
    document.addEventListener('keydown', function(event) {
        if (fullImgBox.classList.contains('active')) { // მხოლოდ მაშინ, როცა lightbox აქტიურია
            if (event.key === 'Escape') {
                closeFullImg();
            } else if (event.key === 'ArrowLeft') {
                showPreviousImage();
            } else if (event.key === 'ArrowRight') {
                showNextImage();
            }
        }
    });

    // დაამატეთ Event Listener ფონზე დაჭერისთვის (lightbox-ის დასახურად)
    fullImgBox.addEventListener('click', function(event) {
        // თუ დაჭერა მოხდა თავად fullImgBox-ზე და არა მის შვილებზე (img, span, button)
        if (event.target === fullImgBox) {
            closeFullImg();
        }
    });
});

// ფუნქცია სრული გამოსახულების გასახსნელად
function openFullImg(picSrc) {
    fullImg.src = picSrc;
    fullImgBox.classList.add('active'); // დავამატებთ 'active' კლასს CSS ანიმაციისთვის
    // scroll-ის გათიშვა სხეულზე, როცა lightbox ღიაა
    document.body.style.overflow = 'hidden'; 
} 

// ფუნქცია სრული გამოსახულების დასახურად
function closeFullImg() {
    fullImgBox.classList.remove('active'); // მოვაშორებთ 'active' კლასს
    // scroll-ის აღდგენა სხეულზე
    document.body.style.overflow = 'auto'; 
}

// ფუნქცია შემდეგ სურათზე გადასასვლელად
function showNextImage() {
    currentImageIndex++;
    if (currentImageIndex >= images.length) {
        currentImageIndex = 0; // ციკლი: ბოლოდან პირველზე
    }
    fullImg.src = images[currentImageIndex];
    updateNavButtons();
}

// ფუნქცია წინა სურათზე გადასასვლელად
function showPreviousImage() {
    currentImageIndex--;
    if (currentImageIndex < 0) {
        currentImageIndex = images.length - 1; // ციკლი: თავიდან ბოლოზე
    }
    fullImg.src = images[currentImageIndex];
    updateNavButtons();
}

// ნავიგაციის ღილაკების ხილვადობის განახლება (სურვილისამებრ, შეგიძლიათ მოაშოროთ, თუ ყოველთვის გინდათ ღილაკები)
function updateNavButtons() {
    if (images.length <= 1) {
        if (prevBtn) prevBtn.style.display = 'none';
        if (nextBtn) nextBtn.style.display = 'none';
    } else {
        if (prevBtn) prevBtn.style.display = 'block';
        if (nextBtn) nextBtn.style.display = 'block';
    }
}

// მობილური მენიუს ფუნქციონალი (თუ გაქვთ)
// ეს შეიძლება იყოს თქვენს მთავარ script.js-ში, თუ გლობალურად გამოიყენება
const menuBar = document.getElementById('menu-bar');
const navbar = document.querySelector('.navbar');

if (menuBar && navbar) {
    menuBar.addEventListener('click', () => {
        navbar.classList.toggle('active');
        menuBar.classList.toggle('fa-times'); // შეგიძლიათ X-ზე შეცვალოთ
    });
}