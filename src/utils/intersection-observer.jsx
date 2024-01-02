import { setScrollProgress, setShowNavigation } from "../components/navigation/navigation";

const navigationObserverOptions = {
  // root: document.querySelector("#scrollArea"),
  rootMargin: "0%",
  threshold: 0.1,
};

const toggleNavigationVisibility = (entries, observer) => {

    entries.forEach((entry) => {
      if (entry.isIntersecting) {

        // console.log(entry.target.dataset)
        if (entry.target.dataset.showNavigation == "true") {
          // console.log(entry.target)

          if (entry.target.dataset.navigationIndex) {
            setScrollProgress(`${entry.target.dataset.navigationIndex / 4 * 100}%`)
          }
          // entry.target.style.setProperty('--scroll-progress', `${entry.target.dataset.navigationIndex * 20}%`)
          return setShowNavigation(true)
        }
        return setShowNavigation(false)

      }

    });
}

export const navigationVisibilityObserver = new IntersectionObserver(toggleNavigationVisibility, navigationObserverOptions);


const loadInObserverOptions = {
  // root: document.querySelector("#scrollArea"),
  rootMargin: "0%",
  threshold: 0.4,
};

const animateLoadIn = (entries, observer) => {

    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        return entry.target.dataset.animateHidden = false
      } 

    });
}

export const loadInObserver = new IntersectionObserver(animateLoadIn, loadInObserverOptions)

export const createAnimation = (element) => {
  element.dataset.animateHidden = true
  loadInObserver.observe(element)
}