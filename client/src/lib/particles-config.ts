declare global {
  interface Window {
    particlesJS: any;
  }
}

// Optimized lightweight particles config
export const initParticles = () => {
  // Delay particle initialization by 500ms to prioritize essential content loading
  if (typeof window !== 'undefined' && window.particlesJS) {
    // Use lightweight config for faster rendering
    const config = {
      particles: {
        number: { 
          value: 30,  // Reduced number of particles
          density: { 
            enable: true, 
            value_area: 1000 
          } 
        },
        color: { 
          value: "#3B82F6" 
        },
        shape: { 
          type: "circle" 
        },
        opacity: { 
          value: 0.3, 
          random: false 
        },
        size: { 
          value: 2, 
          random: true 
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#8B5CF6",
          opacity: 0.2,
          width: 1
        },
        move: {
          enable: true,
          speed: 1.5,  // Slower movement
          direction: "none",
          random: false,
          straight: false,
          out_mode: "out",
          bounce: false
        }
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { 
            enable: false,  // Disable hover effects for better performance
            mode: "grab" 
          },
          onclick: { 
            enable: false,  // Disable click effects
            mode: "push" 
          },
          resize: true
        },
        modes: {
          grab: { 
            distance: 140, 
            line_linked: { 
              opacity: 1 
            } 
          },
          push: { 
            particles_nb: 4 
          }
        }
      },
      retina_detect: false  // Disable retina detection for faster rendering
    };
    
    // Delay particles initialization to prioritize critical content
    setTimeout(() => {
      window.particlesJS('particles-js', config);
    }, 500);
  }
};
