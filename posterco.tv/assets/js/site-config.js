/**
 * Site Configuration Loader
 * Reads config.json and applies feature toggles dynamically
 */

(function () {
  'use strict';

  let config = null;
  let projectsData = null;

  // Load projects data
  async function loadProjectsData() {
    try {
      const response = await fetch('/projects-data.json');
      if (!response.ok) {
        throw new Error('Projects data file not found');
      }
      projectsData = await response.json();
      console.log('✓ Projects data loaded');
    } catch (error) {
      console.warn('⚠ Could not load projects-data.json:', error);
    }
  }

  // Load configuration
  async function loadConfig() {
    try {
      const response = await fetch('/config.json');
      if (!response.ok) {
        throw new Error('Config file not found');
      }
      config = await response.json();
      console.log('✓ Site config loaded:', config);
      await loadProjectsData();
      applyConfig();
    } catch (error) {
      console.warn('⚠ Could not load config.json, using defaults:', error);
      // Use default config if file not found
      config = {
        features: {
          introAnimation: { enabled: true },
          navigation: {
            worksPage: { enabled: true },
            aboutPage: { enabled: true },
            contactPage: { enabled: true }
          },
          projectsNav: { enabled: true },
          homeBoxLinks: {
            videoClickable: { enabled: true },
            mobileViewProject: { enabled: true }
          },
          projectsListing: {
            clickable: { enabled: true }
          }
        },
        demo: { mode: false }
      };
      applyConfig();
    }
  }

  // Update existing project item - preserves event handlers
  function updateProjectItem(listItem, project) {
    // Update data-cat attribute
    listItem.setAttribute('data-cat', project.dataCat);

    const link = listItem.querySelector('a.box--work__link');
    if (link) {
      // Update href
      link.setAttribute('href', `works/${project.slug}`);

      // Update text content
      const infoH2 = link.querySelector('.box--work__info h2');
      const infoPs = link.querySelectorAll('.box--work__info p');
      if (infoH2) infoH2.textContent = project.title;
      if (infoPs[0]) infoPs[0].textContent = project.director;
      if (infoPs[1]) infoPs[1].textContent = project.category;

      // Update image
      const img = link.querySelector('img.video-img-poster');
      if (img) {
        img.setAttribute('data-src', project.posterImage);
        img.setAttribute('data-srcset', project.posterImageSrcset);
        // Trigger lazy load update
        img.removeAttribute('src');
        img.removeAttribute('srcset');
      }

      // Update video
      const video = link.querySelector('video.js-video');
      if (video) {
        video.setAttribute('data-src', project.videoUrl);
        // Reset video
        video.removeAttribute('src');
        video.load();
      }

      // Update cursor text
      const cursorH2 = link.querySelector('.cursor-main-text h2');
      const cursorPs = link.querySelectorAll('.cursor-main-text p');
      if (cursorH2) cursorH2.textContent = project.title;
      if (cursorPs[0]) cursorPs[0].textContent = project.director;
      if (cursorPs[1]) cursorPs[1].textContent = project.category;
    }
  }

  // Create new project item
  function createProjectItem(project) {
    const li = document.createElement('li');
    li.className = 'box box--work';
    li.setAttribute('data-cat', project.dataCat);

    li.innerHTML = `
                    <a
                      href="works/${project.slug}"
                      data-navigo
                      class="box--work__link js-has-cursor-text"
                    >
                      <div class="box--work__info">
                        <h2>${project.title}</h2>
                        <p>${project.director}</p>
                        <p>${project.category}</p>
                      </div>

                      <div class="box--work__video video-wrapper has-poster">
                        <img
                          class="video-img-poster lazy-media"
                          data-src="${project.posterImage}"
                          data-srcset="${project.posterImageSrcset}"
                          alt=""
                        />
                        <video
                          class="js-video lazy-media"
                          data-src="${project.videoUrl}"
                          playsinline
                          loop
                          muted
                        ></video>
                      </div>
                      <div class="cursor-text-animated js-cursor-text-animated">
                        <div
                          class="mooving-elements is-arrow"
                          data-friction="1"
                        >
                          <svg
                            width="11"
                            height="10"
                            viewBox="0 0 11 10"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M8.72366 3.91174H7.0685L5.14349 3.8482L6.53777 4.99985L8.40882 6.65189L7.19444 7.72412L5.3234 6.07209L4.01007 4.83306L4.07303 6.50892L4.06404 8.02593L2.3819 6.54069L2.39989 2.42649L7.04152 2.42649L8.72366 3.91174Z"
                              fill="white"
                            />
                          </svg>
                        </div>
                        <div
                          class="mooving-elements shift cursor-main-text"
                          data-friction="5"
                        >
                          <h2>${project.title}</h2>
                          <p>${project.director}</p>
                          <p>${project.category}</p>
                        </div>
                      </div>
                    </a>
`;
    return li;
  }

  // Load site content based on mode (dubaifilmmaker or posterco)
  function loadSiteContent(siteMode) {
    if (!projectsData || !projectsData[siteMode]) {
      console.warn(`⚠ No data found for site mode: ${siteMode}`);
      return;
    }

    const projects = projectsData[siteMode].projects;
    const projectsList = document.querySelector(
      '.bloc-projects-listing .list--works'
    );

    if (!projectsList) {
      console.warn('⚠ Projects list container not found');
      console.log('Available elements:', {
        blocProjectsListing: document.querySelector('.bloc-projects-listing'),
        listWorks: document.querySelector('.list--works'),
        worksId: document.querySelector('#works')
      });
      return;
    }

    console.log(
      `🔄 Updating projects with ${siteMode} content...`,
      projectsList
    );

    // Get existing <li> elements
    const existingItems = Array.from(
      projectsList.querySelectorAll('li.box--work')
    );

    // Update existing items and add new ones if needed
    // projects.forEach((project, index) => {
    //   if (existingItems[index]) {
    //     // Update existing item - preserves event handlers
    //     updateProjectItem(existingItems[index], project);
    //   } else {
    //     // Add new item if we have more projects than existing items
    //     const newItem = createProjectItem(project);
    //     projectsList.appendChild(newItem);
    //   }
    // });

    // // Remove extra items if we have fewer projects
    // if (existingItems.length > projects.length) {
    //   for (let i = projects.length; i < existingItems.length; i++) {
    //     existingItems[i].remove();
    //   }
    // }

    // console.log(`✓ Updated ${projects.length} projects for site: ${siteMode}`);

    // // Trigger lazy loading update for updated images
    // setTimeout(() => {
    //   if (typeof LazyLoad !== 'undefined' && window.lazyLoadInstance) {
    //     window.lazyLoadInstance.update();
    //     console.log('✓ Lazy loading updated for content changes');
    //   }
    // }, 100);
  }

  // Inject CSS for disabled links
  function injectDisabledLinkStyles() {
    const styleId = 'site-config-disabled-styles';
    if (document.getElementById(styleId)) return; // Already injected

    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      .disabled-link,
      .disabled-link *,
      .disabled-project,
      .disabled-project * {
        pointer-events: none !important;
        cursor: default !important;
        -webkit-user-select: none !important;
        user-select: none !important;
        -webkit-touch-callout: none !important;
      }
      
      .disabled-link,
      .disabled-project {
        opacity: 0.7 !important;
      }
      
      /* Specifically target cursor text animations */
      .disabled-link .js-cursor-text-animated,
      .disabled-project .js-cursor-text-animated,
      .disabled-link .cursor-text-animated,
      .disabled-project .cursor-text-animated {
        display: none !important;
      }
      
      /* Block all interactive classes */
      .disabled-project .js-has-cursor-text,
      .disabled-link.js-has-cursor-text {
        pointer-events: none !important;
        cursor: default !important;
      }
    `;
    document.head.appendChild(style);
  }

  // Apply configuration to the page
  function applyConfig() {
    if (!config) return;

    const features = config.features;

    // Inject CSS styles for disabled links
    injectDisabledLinkStyles();

    // 1. INTRO ANIMATION
    handleIntroAnimation(features.introAnimation.enabled);

    // 2. NAVIGATION LINKS
    handleNavigationLinks(features.navigation);

    // 3. PROJECTS NAVIGATION (Category filters)
    handleProjectsNav(features.projectsNav.enabled);

    // 4. HOME BOX LINKS (Main video section)
    handleHomeBoxLinks(features.homeBoxLinks);

    // 0. LOAD SITE CONTENT (if projects data is available)
    // Do this before disabling links so new content is loaded first
    if (config.site && projectsData) {
      // Small delay to ensure DOM is fully ready
      setTimeout(() => {
        loadSiteContent(config.site.mode);

        // Apply link disabling AFTER content is loaded
        setTimeout(() => {
          handleProjectsListing(features.projectsListing.clickable);
        }, 50);
      }, 100);
    } else {
      // If no content to load, just disable existing links
      handleProjectsListing(features.projectsListing.clickable);
    }

    // Log current mode
    if (config.demo.mode) {
      console.log('🎨 DEMO MODE: Most interactive features disabled');
    } else {
      console.log('✓ FULL MODE: All features enabled');
    }
  }

  // Handle intro animation visibility
  function handleIntroAnimation(enabled) {
    const introBloc = document.querySelector('.bloc-intro');
    if (introBloc) {
      if (!enabled) {
        introBloc.style.display = 'none';
        console.log('✓ Intro animation hidden');
      } else {
        introBloc.style.display = '';
        console.log('✓ Intro animation enabled');
      }
    }
  }

  // Handle navigation links (Works, About, Contact)
  function handleNavigationLinks(navConfig) {
    const navItems = {
      works: {
        enabled: navConfig.worksPage.enabled,
        selector: 'a[data-slug="works"]'
      },
      about: {
        enabled: navConfig.aboutPage.enabled,
        selector: 'a[data-slug="about"]'
      },
      contact: {
        enabled: navConfig.contactPage.enabled,
        selector: 'a[data-slug="contact"]'
      }
    };

    Object.entries(navItems).forEach(([page, settings]) => {
      const link = document.querySelector(settings.selector);
      if (link) {
        if (!settings.enabled) {
          disableLink(link);
          console.log(`✓ ${page} link disabled`);
        } else {
          enableLink(link);
        }
      }
    });
  }

  // Handle projects navigation (category filters)
  function handleProjectsNav(enabled) {
    const projectsNav = document.querySelector('.projects-nav');
    if (projectsNav) {
      if (!enabled) {
        projectsNav.style.display = 'none';
        // Also disable all filter links
        const filterLinks = projectsNav.querySelectorAll('.js-filter-cat');
        filterLinks.forEach(link => disableLink(link));
        console.log('✓ Projects navigation hidden and disabled');
      } else {
        projectsNav.style.display = '';
        const filterLinks = projectsNav.querySelectorAll('.js-filter-cat');
        filterLinks.forEach(link => enableLink(link));
      }
    }
  }

  // Handle home box links (main video section)
  function handleHomeBoxLinks(homeBoxConfig) {
    // Disable main video link (desktop)
    const mainVideoLink = document.querySelector('.box--home__link');
    if (mainVideoLink) {
      if (!homeBoxConfig.videoClickable.enabled) {
        disableLink(mainVideoLink);
        console.log('✓ Home box video link disabled');
      } else {
        enableLink(mainVideoLink);
      }
    }

    // Disable video items in the list
    const videoListLinks = document.querySelectorAll(
      '.box--home .list--home a.js-change-video'
    );
    videoListLinks.forEach(link => {
      if (!homeBoxConfig.videoClickable.enabled) {
        disableLink(link);
      } else {
        enableLink(link);
      }
    });

    // Disable mobile "view project" button
    const mobileLink = document.querySelector(
      '.box--home__buttons-mobile .mobile-link'
    );
    if (mobileLink) {
      if (!homeBoxConfig.mobileViewProject.enabled) {
        disableLink(mobileLink);
        mobileLink.style.opacity = '0.5';
        mobileLink.style.cursor = 'not-allowed';
        console.log('✓ Mobile view project button disabled');
      } else {
        enableLink(mobileLink);
        mobileLink.style.opacity = '';
        mobileLink.style.cursor = '';
      }
    }
  }

  // Handle projects listing clickability
  function handleProjectsListing(enabled) {
    // Target all possible selectors
    const selectors = [
      '.bloc-projects-listing .box--work__link',
      '.bloc-projects-listing a[href*="works/"]',
      '.list--works .box--work a',
      'a.js-has-cursor-text'
    ];

    const allLinks = new Set();
    selectors.forEach(selector => {
      const links = document.querySelectorAll(selector);
      links.forEach(link => {
        // Only add if it's in the projects listing section
        if (link.closest('.bloc-projects-listing')) {
          allLinks.add(link);
        }
      });
    });

    allLinks.forEach(link => {
      if (!enabled) {
        disableLink(link);
        // Extra measure: wrap the whole list item
        const listItem = link.closest('li.box--work');
        if (listItem) {
          listItem.classList.add('disabled-project');
          listItem.style.pointerEvents = 'none';
          listItem.style.opacity = '0.7';
        }
      } else {
        enableLink(link);
        const listItem = link.closest('li.box--work');
        if (listItem) {
          listItem.classList.remove('disabled-project');
          listItem.style.pointerEvents = '';
          listItem.style.opacity = '';
        }
      }
    });

    if (!enabled) {
      console.log(
        `✓ ${allLinks.size} project listing links disabled (including js-has-cursor-text)`
      );
    }
  }

  // Utility: Disable a link
  function disableLink(element) {
    if (!element) return;

    // Store original href if not already stored
    if (!element.hasAttribute('data-original-href')) {
      element.setAttribute(
        'data-original-href',
        element.getAttribute('href') || ''
      );
    }

    // Store original classes that might have event handlers
    if (element.classList.contains('js-has-cursor-text')) {
      element.setAttribute('data-had-cursor-text', 'true');
      element.classList.remove('js-has-cursor-text');
    }
    if (element.classList.contains('js-change-video')) {
      element.setAttribute('data-had-change-video', 'true');
      element.classList.remove('js-change-video');
    }

    // Change href to # instead of removing (more explicit)
    element.setAttribute('href', '#');
    element.classList.add('disabled-link');
    element.style.cursor = 'default';
    element.style.pointerEvents = 'none';
    element.style.opacity = '0.7';

    // Prevent all types of events (click, touch, etc.)
    element.addEventListener('click', preventClick, {
      capture: true,
      passive: false
    });
    element.addEventListener('touchstart', preventClick, {
      capture: true,
      passive: false
    });
    element.addEventListener('touchend', preventClick, {
      capture: true,
      passive: false
    });
    element.addEventListener('mousedown', preventClick, {
      capture: true,
      passive: false
    });
    element.addEventListener('mouseup', preventClick, {
      capture: true,
      passive: false
    });

    // Also disable data-navigo attribute if present
    if (element.hasAttribute('data-navigo')) {
      element.setAttribute('data-navigo-disabled', 'true');
      element.removeAttribute('data-navigo');
    }
  }

  // Utility: Enable a link
  function enableLink(element) {
    if (!element) return;

    // Restore original href
    const originalHref = element.getAttribute('data-original-href');
    if (originalHref) {
      element.setAttribute('href', originalHref);
    }

    // Restore original JS classes
    if (element.hasAttribute('data-had-cursor-text')) {
      element.classList.add('js-has-cursor-text');
      element.removeAttribute('data-had-cursor-text');
    }
    if (element.hasAttribute('data-had-change-video')) {
      element.classList.add('js-change-video');
      element.removeAttribute('data-had-change-video');
    }

    // Remove disabled class
    element.classList.remove('disabled-link');
    element.style.cursor = '';
    element.style.pointerEvents = '';
    element.style.opacity = '';

    // Remove all event prevention (with same options used when adding)
    element.removeEventListener('click', preventClick, { capture: true });
    element.removeEventListener('touchstart', preventClick, { capture: true });
    element.removeEventListener('touchend', preventClick, { capture: true });
    element.removeEventListener('mousedown', preventClick, { capture: true });
    element.removeEventListener('mouseup', preventClick, { capture: true });

    // Restore data-navigo if it was disabled
    if (element.hasAttribute('data-navigo-disabled')) {
      element.setAttribute('data-navigo', '');
      element.removeAttribute('data-navigo-disabled');
    }
  }

  // Prevent click handler
  function preventClick(e) {
    e.preventDefault();
    e.stopPropagation();
    return false;
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadConfig);
  } else {
    loadConfig();
  }

  // Expose reload function for debugging
  window.reloadSiteConfig = loadConfig;
})();
