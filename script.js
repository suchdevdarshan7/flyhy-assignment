document.addEventListener('DOMContentLoaded', function() {

    

    const contactUsBtn = document.querySelector('.header-btn');
    const header = document.querySelector('.header');
    const form = document.querySelector('.form');
    const submitBtn = document.querySelector('.form__button');

    const SliderActiveLogo = './images/activedot.png';
    const DefaultSliderLogo = './images/dot.png';

    const SliderIcons = document.querySelectorAll('.slider-icons');
    const carouselContainer = document.querySelector('.carousel-container');
    const carousels = document.querySelectorAll('.carousel');

    const ArticleContainerImage = document.querySelector('.article-container-image');
    
    const AsideContainerImage = document.querySelectorAll('.aside-container');

    const imagesPath = ['./images/Carousel-image1.png','./images/image.png','./images/Carousel-image.png']

    console.log(AsideContainerImage)


    AsideContainerImage.forEach((element, idx) => {
    element.addEventListener('click', (e) => {
        ArticleContainerImage.src = imagesPath[idx];
        removeActiveClass();
        element.classList.toggle('active');
    });
});

    function removeActiveClass(){
        AsideContainerImage.forEach(element=> element.classList.remove('active'));
    }



    console.log(ArticleContainerImage.src)


    document.body.addEventListener('keyup',(e)=>{
        if(e.key==="Escape"){
            header.classList.remove('active');
            form.classList.remove('active')
        }
    })


    let currentIndex = 0;

    function updateCarousel() {
        carouselContainer.style.transform = `translateX(-${currentIndex * 100}px)`;
        SliderIcons.forEach((icon, index) => {
            icon.src = index === currentIndex ? SliderActiveLogo : DefaultSliderLogo;
        });
    }

    SliderIcons.forEach((element, index) => element.addEventListener("click", () => {
        currentIndex = index;
        updateCarousel();
    }));

    function toggleActive() {
        header.classList.toggle('active');
        form.classList.toggle('active');
    }

    contactUsBtn.addEventListener('click', toggleActive);

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    function validateForm() {
        let isValid = true;
        let FirstName = document.querySelector('.form__input--firstname').value.trim();
        let LastName = document.querySelector('.form__input--lastname').value.trim();
        let Email = document.querySelector('.form__input--email').value.trim();
        let checkbox = document.querySelector('.checkbox__input').checked;

        if (FirstName === '') {
            isValid = false;
            alert('First Name is required');
        }
        if (LastName === '') {
            isValid = false;
            alert('Last Name is required');
        }
        if (Email === '' || !validateEmail(Email)) {
            isValid = false;
            alert('Valid Email is required');
        }
        if (!checkbox) {
            isValid = false;
            alert('You must agree to the terms and conditions');
        }

        return isValid;
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        if (validateForm()) {
            let FirstName = document.querySelector('.form__input--firstname').value;
            let LastName = document.querySelector('.form__input--lastname').value;
            let Email = document.querySelector('.form__input--email').value;
            const Data = { name: `${FirstName} ${LastName}`, Email };
            toggleActive();
            submitForm(Data);
        }
    });

    function submitForm(formData) {
        fetch("https://getform.io/f/bvrerxkb", {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
    }

    // Automatically update the carousel every 3 seconds
    setInterval(() => {
        currentIndex = (currentIndex + 1) % carousels.length;
        updateCarousel();
    }, 3000);
});
