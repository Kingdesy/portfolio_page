
window.addEventListener("load", () => {
    alert("Bienvenue sur mon portfolio ! N’hésitez pas à me contacter.");
  });
  

  document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector("header");
    header.style.opacity = 0;
    header.style.transition = "opacity 2s";
    setTimeout(() => {
      header.style.opacity = 1; 
    }, 500);
  

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      });
    });
  });
  

  document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("themeToggle");
  
    toggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
  
      
      if (document.body.classList.contains("dark-mode")) {
        toggle.textContent = "🌙";
      } else {
        toggle.textContent = "🌞";
      }
    });
  });
  
  