// Navbar Hamberger Function 

const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".navbar-links");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("open");
    navLinks.classList.toggle("active");
});


// Subscription Radio Button 

const subscriptionRadios = document.querySelectorAll('input[name="subscription"]');
const subDetails = document.querySelectorAll(".sub-details");

function toggleSubscriptionDetails() {

    const selected = document.querySelector(
        'input[name="subscription"]:checked'
    );

    subDetails.forEach(detail => {
        detail.classList.remove("active");
    });

    if (selected) {
        const target = selected.dataset.target;
        document.getElementById(target).classList.add("active");
    }
}


toggleSubscriptionDetails();


subscriptionRadios.forEach(radio => {
    radio.addEventListener("change", toggleSubscriptionDetails);
});


// Accordation Function Open / Close

const accordions = document.querySelectorAll(".accordation");

accordions.forEach(acc => {
    acc.querySelector(".accordation-head").addEventListener("click", () => {
        
        accordions.forEach(item => {
            if (item !== acc) {
                item.classList.remove("active");
                item.querySelector(".icon i").className = "fa-solid fa-plus";
            }
        });

        
        acc.classList.toggle("active");
        const icon = acc.querySelector(".icon i");
        if (acc.classList.contains("active")) {
            icon.className = "fa-solid fa-minus";
        } else {
            icon.className = "fa-solid fa-plus";
        }
    });

});


// Percentage Counter Animation

const section = document.querySelector('.section-percent');
const counters = document.querySelectorAll('.percent-content h2');

const startCounter = () => {
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'), 10);
        let count = 0;
        const updateCounter = () => {
            const increment = Math.ceil(target / 180);
            count += increment;
            if (count < target) {
                counter.innerText = `${count}%`;
                requestAnimationFrame(updateCounter);
            } else {
                counter.innerText = `${target}%`;
            }
        };
        updateCounter();
    });
};

const observer = new IntersectionObserver(
    entries => {
        if (entries[0].isIntersecting) {
            startCounter();
            observer.disconnect(); 
        }
    },
    { threshold: 0.4 }
);

observer.observe(section);


// Image banner Slider


const images = [
    "assets/banner-img-1.png",
    "assets/v-2.png",
    "assets/v-3.png"
];

let currentIndex = 0;

const imgElement = document.querySelector(".prod-banner .p-img img");
const dots = document.querySelectorAll(".dots input");
const prevBtn = document.querySelector(".btn-left");
const nextBtn = document.querySelector(".btn-right");

function updateSlider(index) {
    imgElement.src = images[index];
    imgElement.style.opacity = 0.6;

    setTimeout(() => {
        imgElement.src = images[index];
        imgElement.style.opacity = 1;

        dots.forEach(dot => dot.checked = false);
        dots[index].checked = true;

    }, 200);
        
}

nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % images.length;
    updateSlider(currentIndex);
});

prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateSlider(currentIndex);
});

dots.forEach((dot, index) => {
    dot.addEventListener("change", () => {
        currentIndex = index;
        updateSlider(currentIndex);
    });
});