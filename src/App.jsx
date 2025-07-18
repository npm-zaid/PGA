import React, { useEffect, useRef } from 'react'
import Lenis from '@studio-freight/lenis';
import Demo1 from './components/Demo1';
import './App.css'

const App = () => {
  const lenisRef = useRef();
  useEffect(() => { 
    const lenis = new Lenis({
      duration: 1.2, 
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      direction: 'vertical',
      gestureDirection: 'vertical', 
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: true,
      touchMultiplier: 2,
      infinite: false,
      lerp: 0.02,
      wheelMultiplier: 1,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    lenisRef.current = lenis; 

    return () => {
      lenis.destroy(); 
    };
  }, []);
  return (
    <div className='bg-black overflow-hidden'>

<Demo1/>
    </div>
  )
}

export default App