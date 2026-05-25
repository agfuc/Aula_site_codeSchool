document.addEventListener('DOMContentLoaded',()=>{
    /* Manipulação do Menu */
    const navMenu = document.getElementById('nav');
    const navLinks = document.querySelectorAll('.nav-link');
    const menuBtn = document.getElementById('menu-btn');
    const menuIcon = menuBtn.querySelector('i');

    menuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');

        /*Lógica para alterar o icone */
        if (navMenu.classList.contains('active')){
            menuIcon.classList.replace('ph-list', 'ph-x');
        } else {
            menuIcon.classList.replace('ph-x', 'ph-list');
        }
    });

    /* FUNÇÕES PARA O SLIDER */
    const slides = document.querySelectorAll('.carousel-slide');
    const btnNext = document.getElementById('btn-next');
    const btnPrev = document.getElementById('btn-prev');

    /* Variaveis*/
    let currentSlide = 0;
    let autoPlayTimer;

    //Função para mostrar o slide atual (currentSlide)
    function showTargetSlide(index){
        //Inicialmente remove todos os slides ativos
        slides.forEach(slide => slide.classList.remove('active'));

        if (index >= slides.length){
            currentSlide = 0;
        }
        else if (index < 0){
            currentSlide = slides.length-1;
        }
        else{
            currentSlide = index;
        }

        slides[currentSlide].classList.add('active');
    }

    function runAutoPlay(){
        autoPlayTimer = setInterval(()=> {
            showTargetSlide(currentSlide+1);
        }, 6000);
    }

    //Ações dos botões
    btnNext.addEventListener('click', ()=>{
        showTargetSlide(currentSlide+1);
        resetAutoPlay();
    });

    btnPrev.addEventListener('click', ()=>{
        showTargetSlide(currentSlide-1);
        resetAutoPlay();
    }); 

    function resetAutoPlay(){
        clearInterval(autoPlayTimer);
        runAutoPlay();
    }



    //Dá a partida na transição dos slides
    runAutoPlay();

   //INICIO DOS CONTADORES
   ///////////////////////

   //Seleciona os itens estatísticos (números)
   const counters = document.querySelectorAll('.stat-num');

   //Função responsável por subir progressivamente a numeração
   function runCounterAnimation(el){
    //pegar o valor data-target
    const targetNumber = parseInt(el.getAttribute('data-target'));
    //Definir o tempo de animação
    const durationLimit = 2000; // 2000 milisegundos = 2 segundos

    //Inicializar uma variável contador
    let counterValue = 0;

    //Logica: Divide o número alvo pela quantidade de frames (2000/20 = 100 frames)
    const incrementAmount = targetNumber / (durationLimit / 20);

    //Cria um looping temporal a cada 20 milisegundos
    const updateVisualsTimer = setInterval(() => {
        //Adiciona o incremento no valor atual
        counterValue += incrementAmount;

        //Verifica se já atingiu ou ultrapassou o alvo
        if (counterValue >= targetNumber){
            //Garante que o valor final é o alvo
            el.innerText = targetNumber;
            //interrompe o setInterval
            clearInterval(updateVisualsTimer);
        } else {
            //Se ainda não chegou no alvo, altera o valor atual
            el.innerText=Math.ceil(counterValue);
        }
    },20);
   } //fecha a função run counter animation

   //API MODERNA! O Observer que "observa" os elementos
   const scrollObserver = 
   new IntersectionObserver((entries, observerInstance) =>{
    //Se observo algo?
    entries.forEach(entry=>{
        if (entry.isIntersecting){
            runCounterAnimation(entry.target);
            observerInstance.unobserve(entry.target);
        }
    });
   }, {
    threshold: 0.6 //Pelo menos 60% do elemento tem que estar visível
   });

   //Habilita o observer para cada entrada
   counters.forEach(counterItem => {
    scrollObserver.observe(counterItem);
   });

   //Dark-mode e Light Mode
   /*Selecionar o botão que faz a troca*/
   const themeBtn = document.getElementById('theme-toggle');
   /*Selecionar o ícone para troca*/
   const themeIcon = themeBtn.querySelector('i'); 

   //Recuperar tema salvo anteriormente
   const currentTheme = localStorage.getItem('theme');
   if (currentTheme === 'dark'){
        document.body.classList.add('dark-mode');
        themeIcon.classList.replace('ph-moon','ph-sun');
   }


   //Adiciona o evento no botão
   themeBtn.addEventListener('click',()=> {
    //Liga a classe quando está desligada e desliga quando está ligada
    document.body.classList.toggle('dark-mode');
    //Verifica se está no darkmode (true) ou não (false)
    const isDark = document.body.classList.contains('dark-mode');

    if (isDark){
        themeIcon.classList.replace('ph-moon','ph-sun');
        localStorage.setItem('theme','dark');
    } else {
        themeIcon.classList.replace('ph-sun','ph-moon');
        localStorage.setItem('theme','light');
    }

   });

});