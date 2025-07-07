document.addEventListener('DOMContentLoaded', function() {
    // Seleciona os elementos principais e opcionais da página
    const navLinks = document.querySelectorAll('#navbar a');
    const slides = document.querySelectorAll('.slide');
    const feedbackForm = document.getElementById('feedbackForm');
    const modal = document.getElementById('confirmationModal');
    const closeModalBtn = document.getElementById('closeModal');
    const swiperContainer = document.querySelector('.cronograma-swiper');

    // --- Animação de entrada para as seções ---
    // Garante que o conteúdo apareça ao rolar a página
    if (slides.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.2 // A animação inicia quando 20% da seção está visível
        });

        slides.forEach(slide => {
            observer.observe(slide);
        });
    }
    
    // --- Destaque do link ativo na barra de navegação ---
    const activateNavOnScroll = () => {
        let currentActive = '';
        const navbar = document.getElementById('navbar');
        // Define um deslocamento padrão caso a navbar não exista
        const offset = navbar ? navbar.offsetHeight : 0;

        slides.forEach(slide => {
            const slideTop = slide.offsetTop - offset - 100;
            if (window.scrollY >= slideTop) {
                currentActive = slide.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === currentActive) {
                link.classList.add('active');
            }
        });
    };
    
    window.addEventListener('scroll', activateNavOnScroll);

    // --- Inicialização do Carrossel (Swiper) ---
    // Apenas inicializa se o elemento do carrossel e a biblioteca Swiper existirem
    if (swiperContainer && typeof Swiper !== 'undefined') {
        const swiper = new Swiper('.cronograma-swiper', {
            effect: 'coverflow',
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: 'auto',
            coverflowEffect: {
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
    }

    // --- Lógica do Formulário de Avaliação ---
    // Apenas adiciona os eventos se todos os elementos do formulário existirem
    if (feedbackForm && modal && closeModalBtn) {
        feedbackForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Impede o envio real do formulário
            modal.classList.add('visible');
        });

        closeModalBtn.addEventListener('click', function() {
            modal.classList.remove('visible');
        });

        // Fecha o modal se o usuário clicar fora dele
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.remove('visible');
            }
        });
    }
});
