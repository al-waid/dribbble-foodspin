import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
 
  title = 'foodspin';
  mRx: number;
  menuItems =
  [
      {
        title: "Green Goddess Chicken Salad", 
        desc: "It is a non vegetarian salad which consists of the green goddess dressing mixed with chicken, peppers, olives and celery.",
        thumb: "../assets/images/thumb-1.png",
        image: "../assets/images/1img.png",
        price: "35",
        vegan: false
      },
      {
        title: "Asian Cucumber Salad", 
        desc: "Asian Cucumber Salad Recipe made with crunchy cucumber, onion, rice wine vinegar, and a few secret ingredients!",
        thumb: "../assets/images/thumb-2.png",
        image: "../assets/images/2img.png",
        price: "30",
        vegan: true

      },
      {
        title: "Green Goddess Chicken Salad", 
        desc: "It is a non vegetarian salad which consists of the green goddess dressing mixed with chicken, peppers, olives and celery.",
        thumb: "../assets/images/thumb-3.png",
        image: "../assets/images/3img.png",
        price: "25",
        vegan: false
      },
      {
        title: "Green  Salad", 
        desc: "It is a non vegetarian salad which consists of the green goddess dressing mixed with chicken, peppers, olives and celery.",
        thumb: "https://via.placeholder.com/100",
        image: "https://via.placeholder.com/300",
        price: "9",
        vegan: true
      },
      {
        title: "Green Goddess boeuf Salad", 
        desc: "It is a non vegetarian salad which consists of the green goddess dressing mixed with chicken, peppers, olives and celery.",
        thumb: "../assets/images/thumb-1.png",
        image: "../assets/images/1img.png",
        price: "48",
        vegan: false
      },
      {
        title: "European Cucumber Salad", 
        desc: "European Cucumber Salad Recipe made with crunchy cucumber, onion, rice wine vinegar, and a few secret ingredients!",
        thumb: "../assets/images/thumb-2.png",
        image: "../assets/images/2img.png",
        price: "33",
        vegan: true

      },
      {
        title: "Green Goddess Chicken Salad", 
        desc: "It is a non vegetarian salad which consists of the green goddess dressing mixed with chicken, peppers, olives and celery.",
        thumb: "../assets/images/thumb-3.png",
        image: "../assets/images/3img.png",
        price: "19",
        vegan: false
      },
      {
        title: "Composite Salad", 
        desc: "It is a non vegetarian salad which consists of the green goddess dressing mixed with chicken, peppers, olives and celery.",
        thumb: "https://via.placeholder.com/100",
        image: "https://via.placeholder.com/300",
        price: "11",
        vegan: true
      }
  ];
  slideItemsNumber: number;
  rotableContainer: any;
  currentSlideImg: any;
  currentSlideIdx: number = 0;
  rad: number = 0;
  rotationSteep: number = 0;
  slideItem: any;
  currentuMenuItem: any;
  activeColor = "";
  homeContent: any;
  sliderTimer;

  @ViewChild("rot", { static: true }) rotable: ElementRef;
  Position = {
    ellipse: function(n, rx, ry, so, wh, idd, cw) {
      var ss: any  = document.styleSheets[0];
      ss.insertRule('#' + idd + ' {  width: ' + String((rx * 2) + wh) + 'px; height: ' + String((ry * 2) + wh) + 'px; }', 1);
      
      for (var i = 0; i < n; i++) {
        ss.insertRule(`.item--`+ i +`{ top: `+String(ry + -ry * Math.cos((360 / n / 180) * (i + so) * Math.PI)) + `px;
            left:` + String( rx + rx * (cw ? Math.sin((360 / n / 180) * (i + so) * Math.PI) : -Math.sin((360 / n / 180) * (i + so) * Math.PI)))  + `px;
            }`, 1);
      }
    }
  };

  color = {
    green : "#54BF29",
    orange : "#FF922C",
    light_green: "#EAFFE2",
    pink: "#FFEEDE"
  };
  
  

  ngOnInit(): void {
    
    this.mRx = this.rotable.nativeElement.offsetWidth / 2;
    this.slideItemsNumber = this.menuItems.length;
    this.currentSlideImg = document.querySelector('.slider-nav__img');
    this.rotableContainer = document.querySelector('#rotables-img');
    this.homeContent = document.querySelector('.home-content');
    this.rotationSteep = 360 / this.slideItemsNumber;
    this.getCurrentItem();
    this.currentSlideImg.src = this.menuItems.length > 0 ? this.currentuMenuItem.image : ""; 
    this.Position.ellipse(this.slideItemsNumber, this.mRx, this.mRx, 0, 100, 'rotables-img', false);

    this.autoRunAnimation();
    
  }

  mooveSlide (next = true) {

    this.getCurrentItem();

    if(this.currentSlideImg.classList.contains("menu-img-animation")){
      this.currentSlideImg.classList.remove("menu-img-animation");
    }
    this.rad = next ? this.rad + this.rotationSteep : this.rad - this.rotationSteep;
    this.rotableContainer.style.transform = 'translate(-50%, -50%) rotate('+this.rad+'deg)';
    this.rotableContainer.style.transition = 'transform 3s  ease-in-out';
    this.currentSlideImg.offsetHeight;
    this.currentSlideImg.classList.add("menu-img-animation");
    this.currentSlideImg.src = this.currentuMenuItem.image;
  }

  getCurrentItem() {
    this.currentuMenuItem = this.menuItems[this.currentSlideIdx];
    this.activeColor = this.currentuMenuItem.vegan ? this.color.green : this.color.orange;
    this.updateColorSheme();
  }

  updateColorSheme() {
    document.querySelectorAll('.btn').forEach((el:any) =>{
      el.style.backgroundColor = this.activeColor;
    });  
   const price:any = document.querySelector('.price');
   const top:any = document.querySelector('.homepage');
   const details:any = document.querySelector('.menu-details');
   price.style.color = this.activeColor;

   if(!(this.currentuMenuItem.vegan && top.classList.contains('homepage--vegan'))) top.classList.remove('homepage--vegan');
   
   if(this.currentuMenuItem.vegan && !top.classList.contains('homepage--vegan'))  top.classList.add('homepage--vegan');
   
   
   if(details.classList.contains('menu-animation')) details.classList.remove("menu-animation");
   details.offsetHeight;
   details.classList.add("menu-animation");
  }

  nextSlide () {
    
    this.currentSlideIdx = this.currentSlideIdx >= this.slideItemsNumber-1 ? 0 : this.currentSlideIdx + 1; 
    this.mooveSlide();
  }

  prevSlide () {
    this.currentSlideIdx = this.currentSlideIdx <= 0 ? this.slideItemsNumber-1 : this.currentSlideIdx - 1;
    this.mooveSlide(false);
  }

  autoRunAnimation() {
    
    this.playSlider();
    console.log(this.sliderTimer);
    this.homeContent.addEventListener("mouseover", ()=>this.pauseSlider(), false);
    this.homeContent.addEventListener("mouseleave", this.playSlider.bind(this), false);
    /* const lastPoint = {x: null, y: null}
    this.homeContent.addEventListener("mousemove", e => {
      if(e.clientX > lastPoint.x) this.nextSlide();
      if(e.clientX < lastPoint.x) this.prevSlide();
      lastPoint.x = e.clientX
      lastPoint.y = e.clientY
    }); */
  }

  pauseSlider(){
    console.log('-----------Pause---------------', this.sliderTimer);
    if(this.sliderTimer){
      clearInterval(this.sliderTimer);
      this.sliderTimer = null;
      console.log(this.sliderTimer);
    }
    
  }

  playSlider(){ 
    console.log('-----------Play---------------');
    var i = 0;
    this.sliderTimer = setInterval( () => {
      
      console.log(i++);
      this.nextSlide();
    }, 3000 );
  }
}
