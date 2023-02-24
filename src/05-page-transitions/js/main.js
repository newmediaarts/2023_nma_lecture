import { lerp } from "./utils/lerp";
import { initPreloader } from "./components/preloader";
import { workGallery } from "./components/workGallery";

class App {
  constructor() {
    // Smooth scroll properties
    this.scrollElement = document.querySelector("[smooth-scroll]");
    this.currentScrollPos = 0;
    this.targetScrollPos = 0;
    this.scrollEase = 0.1;

    this.workGalleryElements = document.querySelectorAll(".work");

    // Page transition properties
    this.links = document.querySelectorAll("a");
    this.template = document.querySelector("[data-template]");

    this._initSmoothScroll();
    // RequestAnimationFrame timestamp
    this._update();

    this._createPage();
  }

  /** @method update
   * RequestAnimationFrame loop, animation callbacks
   * can be run here
   */
  _update() {
    // Run smooth scroll for every frame
    this._smoothScroll();
    this.frame = requestAnimationFrame(this._update.bind(this));
  }

  _createPage() {
    initPreloader();

    this.links.forEach(async (link) => await this._watchPageTransitions(link));

    if (this.workGalleryElements.length > 0) {
      this.workGalleryElements.forEach((gallery) => workGallery(gallery));
    }
  }

  _initSmoothScroll() {
    // Calculate total scrollable height
    document.body.style.height = `${
      this.scrollElement.getBoundingClientRect().height
    }px`;
  }

  _smoothScroll() {
    // Capture the position the screen would be at with native scroll
    this.targetScrollPos = window.scrollY;

    // Calculate a value that "eases" to the targetScrollPosition
    this.currentScrollPos = lerp(
      this.currentScrollPos,
      this.targetScrollPos,
      this.scrollEase
    );

    // Smooth out transition in case there are a lot of decimals
    this.currentScrollPos = parseFloat(this.currentScrollPos.toFixed(2));

    // Transform the scroll container to the lerp value
    const transformProperty = `translate3d(0, ${
      this.currentScrollPos * -1
    }px, 0)`;

    this.scrollElement.style.transform = transformProperty;
  }

  async _watchPageTransitions(link) {
    link.addEventListener("click", async (e) => {
      try {
        // Stop the link for automatically going to the next page
        e.preventDefault();

        // Fetch the next page from the href
        const pageRequest = await fetch(link.href);

        // If the fetch is successful get the content
        if (pageRequest.status === 200) {
          const pageContent = await pageRequest.text();

          // Update the url
          window.history.pushState({}, "", link.href);

          // Create a "fake div" wrapper so we can access
          // the fetched page content as html
          const fakeDiv = document.createElement("div");
          fakeDiv.innerHTML = pageContent;

          const fetchedTemplate = fakeDiv.querySelector("[data-template]");

          this.template.innerHTML = fetchedTemplate.innerHTML;

          this._createPage();

          // window.addEventListener("popstate", window.location.pathname, false);
        }
      } catch (e) {
        // Error handling or default behavior can be run here
      }
    });
  }
}

new App();
