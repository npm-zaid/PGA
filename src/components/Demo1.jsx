import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import logo from '../assets/logo.png';

import pic1 from '../assets/1.jpg'
import pic2 from '../assets/2.jpg'
import pic3 from '../assets/3.jpg';
import pic4 from '../assets/4.jpg';
import pic5 from '../assets/5.jpg';
import pic6 from '../assets/6.jpg';
import pic7 from '../assets/7.jpg';
import pic8 from '../assets/8.jpg';
import pic9 from '../assets/9.jpg';
import pic10 from '../assets/10.jpg';
import pic15 from '../assets/15.jpg';
import pic16 from '../assets/16.jpg';
import pic17 from '../assets/17.jpg';


gsap.registerPlugin(ScrollTrigger);


const Demo1 = () => {
  useEffect(() => {
    initAnimations();
  }, []);

  const initAnimations = () => {
    const grids = document.querySelectorAll('.grid');
    
    grids.forEach((grid, i) => {
      const animationType = `type${(i % 6) + 1}`;
      applyAnimation(grid, animationType);
    });
  };

  const getGrid = selector => {
	let elements = gsap.utils.toArray(selector),
		bounds,
		getSubset = (axis, dimension, alternating, merge) => {
		  	let a = [], 
			  	subsets = {},
			  	onlyEven = alternating === "even",
			  	p;
			bounds.forEach((b, i) => {
				let position = Math.round(b[axis] + b[dimension] / 2),
					subset = subsets[position];
				subset || (subsets[position] = subset = []);
				subset.push(elements[i]);
			});
			for (p in subsets) {
				a.push(subsets[p]);
			}
			if (onlyEven || alternating === "odd") {
				a = a.filter((el, i) => !(i % 2) === onlyEven);
			}
		  	if (merge) {
				let a2 = [];
				a.forEach(subset => a2.push(...subset));
				return a2;
		  	}
		  	return a;
		};
	elements.refresh = () => bounds = elements.map(el => el.getBoundingClientRect());
	elements.columns = (alternating, merge) => getSubset("left", "width", alternating, merge);
	elements.rows = (alternating, merge) => getSubset("top", "height", alternating, merge);
	elements.refresh();

	return elements;
}

// Function to apply scroll-triggered animations to a given gallery
const applyAnimation = (grid, animationType) => {
	// Child elements of grid
	const gridWrap = grid.querySelector('.grid-wrap');
	const gridItems = grid.querySelectorAll('.grid__item');
	const gridItemsInner = [...gridItems].map(item => item.querySelector('.grid__item-inner'));
	
	// Define GSAP timeline with ScrollTrigger
	const timeline = gsap.timeline({
	  	defaults: { ease: 'none' },
	  	scrollTrigger: {
			trigger: gridWrap,
			start: 'top bottom+=5%',
			end: 'bottom top-=5%',
			scrub: true
	  	}
	});
	
	// Apply different animations based on type
	switch(animationType) {
		
		case 'type1':

			// Set some CSS related style values
			grid.style.setProperty('--perspective', '1000px');
			grid.style.setProperty('--grid-inner-scale', '0.5');

			timeline
			.set(gridWrap, {
				rotationY: 25
			})
			.set(gridItems, {
				z: () => gsap.utils.random(-1600,200)
			})
			.fromTo(gridItems, {
				xPercent: () => gsap.utils.random(-1000,-500)
			}, {
				xPercent: () => gsap.utils.random(500,1000)
			}, 0)
			.fromTo(gridItemsInner, {
				scale: 2
			}, {
				scale: .5
			}, 0)
			
			break;

	  	case 'type2':
			
			// Set some CSS related style values
			grid.style.setProperty('--grid-width', '160%');
			grid.style.setProperty('--perspective', '2000px');
			grid.style.setProperty('--grid-inner-scale', '0.5');
			grid.style.setProperty('--grid-item-ratio', '0.8');
			grid.style.setProperty('--grid-columns', '6');
			grid.style.setProperty('--grid-gap', '14vw');

		  	timeline
		  	.set(gridWrap, {
				rotationX: 20
			})
			.set(gridItems, {
				z: () => gsap.utils.random(-3000,-1000)
			})
			.fromTo(gridItems, {
				yPercent: () => gsap.utils.random(100,1000),
				rotationY: -45,
				filter: 'brightness(200%)'
			}, {
				ease: 'power2',
				yPercent: () => gsap.utils.random(-1000,-100),
				rotationY: 45,
				filter: 'brightness(0%)'
			}, 0)
			.fromTo(gridWrap, {
				rotationZ: -5,
			}, {
				rotationX: -20,
				rotationZ: 10,
				scale: 1.2
			}, 0)
			.fromTo(gridItemsInner, {
				scale: 2
			}, {
				scale: 0.5
			}, 0)

			break;
	  
		case 'type3':
			
			// Set some CSS related style values
			grid.style.setProperty('--grid-width', '105%');
			grid.style.setProperty('--grid-columns', '8');
			grid.style.setProperty('--perspective', '1500px');
			grid.style.setProperty('--grid-inner-scale', '0.5');
			
			timeline
			.set(gridItems, {
				transformOrigin: '50% 0%',
				z: () => gsap.utils.random(-5000,-2000),
				rotationX: () => gsap.utils.random(-65,-25),
				filter: 'brightness(0%)'
			})	
			.to(gridItems, {
				xPercent: () => gsap.utils.random(-150,150),
				yPercent: () => gsap.utils.random(-300,300),
				rotationX: 0,
				filter: 'brightness(200%)'
			}, 0)
			.to(gridWrap, {
				z: 6500
			}, 0)
			.fromTo(gridItemsInner, {
				scale: 2
			}, {
				scale: 0.5
			}, 0);
			
			break;

		case 'type4':
			
			// Set some CSS related style values
			grid.style.setProperty('--grid-width', '50%');
			grid.style.setProperty('--perspective', '3000px');
			grid.style.setProperty('--grid-item-ratio', '0.8');
			grid.style.setProperty('--grid-columns', '3');
			grid.style.setProperty('--grid-gap', '1vw');

			timeline
			.set(gridWrap, {
				transformOrigin: '0% 50%',
				rotationY: 30,
				xPercent: -75
			})
			.set(gridItems, {
				transformOrigin: '50% 0%'
			})
			.to(gridItems, {
				duration: 0.5,
				ease: 'power2',
				z: 500,
				stagger: 0.04
			}, 0)
			.to(gridItems, {
				duration: 0.5,
				ease: 'power2.in',
				z: 0,
				stagger: 0.04
			}, 0.5)
			.fromTo(gridItems, {
				rotationX: -70,
				filter: 'brightness(120%)'
			}, {
				duration: 1,
				rotationX: 70,
				filter: 'brightness(0%)',
				stagger: 0.04
			}, 0)
			
			break;

		case 'type5':

			// Set some CSS related style values
			grid.style.setProperty('--grid-width', '120%');
			grid.style.setProperty('--grid-columns', '8');
			grid.style.setProperty('--grid-gap', '0');
			
			const gridObj = getGrid(gridItems);

			timeline
			.set(gridWrap, {
				rotationX: 50
			})
			.to(gridWrap, {
				rotationX: 30
			})
			.fromTo(gridItems, {
				filter: 'brightness(0%)'
			}, {
				filter: 'brightness(100%)'
			}, 0)
			.to(gridObj.rows('even'), {
				xPercent: -100,
				ease: 'power1'
			}, 0)
			.to(gridObj.rows('odd'), {
				xPercent: 100,
				ease: 'power1'
			}, 0)
			.addLabel('rowsEnd', '>-=0.15')
			.to(gridItems, {
				ease: 'power1',
				yPercent: () => gsap.utils.random(-100, 200),
			}, 'rowsEnd');
			break;

		case 'type6':

			// Set some CSS related style values
			grid.style.setProperty('--perspective', '2500px');
			grid.style.setProperty('--grid-width', '100%');
			grid.style.setProperty('--grid-gap', '6');
			grid.style.setProperty('--grid-columns', '3');
			grid.style.setProperty('--grid-item-ratio', '1');
			
			timeline
			.fromTo(gridItems, {
				transformOrigin: '50% 200%',
				rotationX: 0,
				yPercent: 400,
			}, {
				yPercent: 0,
				rotationY: 360,
				opacity: 0.2,
				scale: 0.8,
				stagger: 0.03,
			})

			break;
	  	
		default:
			console.error('Unknown animation type.');
			break;
	}
}

 
 const images = [
    { key: 1, src: pic1 },
    { key: 2, src: pic2 },
    { key: 3, src: pic3 },
    { key: 4, src: pic4 },
    { key: 5, src: pic5 },
    { key: 6, src: pic6 },
    { key: 7, src: pic7 },
    { key: 8, src: pic8 },
    { key: 9, src: pic9 },
    { key: 10, src: pic10 },
    { key: 11, src: pic15 },
    { key: 12, src: pic16 },
    { key: 13, src: pic17 },
    { key: 14, src: pic1 },
    { key: 15,src: pic2 },
    { key: 16,src: pic3 },
    { key: 17,src: pic4 },
    { key: 18,src: pic5 },
    { key: 19,src: pic6 },
    { key: 21,src: pic7 },
    { key: 22,src: pic8 },
    { key: 23,src: pic9 },
    { key: 24, src: pic10 },
    { key: 25, src: pic15 },
    { key: 26, src: pic16 },
    { key: 27, src: pic17 }, 
    { key: 28,src: pic2 },
  
    
   
    
    
  ];

  return (
    <div className="App text-white">
   <div className=' m-5 flex  items-center '>
    <img className='h-full w-[4vw] object-cover' src={logo} alt=""/>

   </div>
      
      <div className="intro"> 
        <h1 className="intro__title"> 
         
          <span className="text-[8vw] bg-gradient-to-b from-[#907030] via-[#907030] to-zinc-800  text-transparent bg-clip-text">
          On-Scroll
            </span>
        
          <span className="text-[8vw] bg-gradient-to-b from-white via-white/80 to-zinc-800  text-transparent bg-clip-text">
          Perspective Grid 
            </span>
            <span className="text-[8vw] bg-gradient-to-b from-white via-white/80 to-zinc-800  text-transparent bg-clip-text">
          Animations
            </span>
        </h1> 
        <span className="intro__info">Scroll moderately to fully experience the animations</span> 
      </div>

      {/* Grid 1 */}
      <section className="content min-h-screen">
        <div className="grid grid--1">
          <div className="grid-wrap">
            {images.slice(0, 48).map((image) => (
              <div key={image.key} className="grid__item h-[50vh] w-[50vh]">
                <img className="grid__item-inner h-full w-full object-contain" style={{ backgroundImage: `url(${image.src})` }} />
              </div>
            ))}
          </div>
        </div>
        <h3 className="content__title  content__title--right content__title--top leading-[10vw] ">
        Journey Beyond Limits
        </h3>
      </section>

      {/* Grid 2 */}
      <section className="content min-h-screen">
        <div className="grid grid--2">
          <div className="grid-wrap">
            {images.slice(0, 48).map((image) => (
              <div key={`grid2-${image.key}`} className="grid__item">
                <div className="grid__item-inner" style={{ backgroundImage: `url(${image.src})` }} />
              </div>
            ))}
          </div>
        </div>
        <h3 className="content__title leading-[10vw]">Explore Future Possibilities</h3>
      </section>

      {/* Grid 3 */}
      <section className="content min-h-screen">
        <div className="grid grid--3">
          <div className="grid-wrap">
            {images.slice(0, 48).map((image) => (
              <div key={`grid3-${image.key}`} className="grid__item">
                <div className="grid__item-inner" style={{ backgroundImage: `url(${image.src})` }} />
              </div>
            ))}

            </div>
        </div>
        <h3 className="content__title leading-[10vw] content__title--right">Venture Beyond Boundaries</h3>
      </section>

       {/* Grid 4 */}
       <section className="content min-h-screen">
        <div className="grid grid--4">
          <div className="grid-wrap">
            {images.slice(0, 48).map((image) => (
              <div key={`grid4-${image.key}`} className="grid__item">
                <div className="grid__item-inner" style={{ backgroundImage: `url(${image.src})` }} />
              </div>
            ))}
          </div>
        </div>
        <h3 className="content__title leading-[10vw]">Pioneer Limitless Realms Of Innovation</h3>
      </section>

         {/* Grid 5 */}
       <section className="content content--spacing h-screen">
				<div className="grid grid--5">
					<div className="grid-wrap">
            {images.slice(0, 48).map((image) => (
              <div key={`grid5-${image.key}`} className="grid__item">
                <div className="grid__item-inner" style={{ backgroundImage: `url(${image.src})` }} />
              </div>
            ))}
		
					</div>
				</div>
				<h3 className="content__title leading-[10vw]">Unleash Your Epic Future Now</h3>
			</section>

       {/* Grid 6 */}
       <section className="content min-h-screen">
        <div className="grid grid--6">
          <div className="grid-wrap">
            {images.slice(0, 48).map((image) => (
              <div key={`grid6-${image.key}`} className="grid__item">
                <div className="grid__item-inner" style={{ backgroundImage: `url(${image.src})` }} />
              </div>  
            ))}
          </div>
        </div>
        <h3 className="content__title leading-[10vw]">Ignite Dreams That Shape Tomorrow</h3>
      </section>


      
      
      <p className="credits">Made by <a target='_blank' href="https://zr-agency-1.vercel.app">@zaidCraftStudio</a></p>
    </div>
  );
};

export default Demo1;