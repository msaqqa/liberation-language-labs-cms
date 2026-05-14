'use strict'

let scrollListener1 = null
let scrollListener2 = null
let scrollListener3 = null
let documentClickListener = null

function cleanupTheme() {
  if (scrollListener1) {
    window.removeEventListener('scroll', scrollListener1)
    scrollListener1 = null
  }
  if (scrollListener2) {
    window.removeEventListener('scroll', scrollListener2)
    scrollListener2 = null
  }
  if (scrollListener3) {
    window.removeEventListener('scroll', scrollListener3)
    scrollListener3 = null
  }
  if (documentClickListener) {
    document.removeEventListener('click', documentClickListener)
    documentClickListener = null
  }
}

function initTheme() {
  cleanupTheme()

  const isHomeRoute = window.location.pathname === '/'

  const mainMenuNavLinks = document.querySelectorAll('.main_menu_list .nav-link')

  const clearMainMenuActive = () => {
    mainMenuNavLinks.forEach((link) => {
      if (link.parentElement) {
        link.parentElement.classList.remove('active')
      }
    })
  }

  const setHomeMenuActive = () => {
    clearMainMenuActive()

    const homeLink = Array.from(mainMenuNavLinks).find((link) => {
      const href = link.getAttribute('href')
      return href === '/'
    })

    if (homeLink && homeLink.parentElement) {
      homeLink.parentElement.classList.add('active')
    }
  }

  if (isHomeRoute) {
    setHomeMenuActive()
  } else {
    clearMainMenuActive()
  }

  // 1. Back to Top button visibility
  const backToTop = document.querySelector('.backtotop')
  if (backToTop) {
    scrollListener1 = function () {
      backToTop.style.display = window.scrollY > 200 ? 'block' : 'none'
    }
    window.addEventListener('scroll', scrollListener1)
    scrollListener1()
  }

  // 2. Smooth scroll to top when clicking the scroll button
  document.querySelectorAll('.scroll').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    })
  })

  // 3. Sticky header effect on scroll
  const header = document.querySelector('.site_header')
  if (header) {
    scrollListener2 = function () {
      header.classList.toggle('sticky', window.scrollY > 0)
    }
    window.addEventListener('scroll', scrollListener2)
    scrollListener2()
  }

  // 4. Toggle active state for pricing items
  const pricingBtn = document.querySelector('.pricing_toggle_btn')
  if (pricingBtn) {
    pricingBtn.addEventListener('click', function () {
      this.classList.toggle('active')
      document.querySelectorAll('.pricing_item').forEach(function (item) {
        item.classList.toggle('active')
      })
    })
  }

  // 5. Navigation Logic (Scroll Spy & Cross-page Smooth Scroll)
  const navLinks = document.querySelectorAll('.main_menu_list .nav-link, .info_list a')
  const sections = document.querySelectorAll('section[id], div[id]')

  // A: Handle incoming hash from another page
  if (window.location.hash) {
    const target = document.querySelector(window.location.hash)
    if (target) {
      setTimeout(() => {
        window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' })
        history.replaceState(null, null, window.location.pathname)
      }, 300)
    }
  }

  // B: Scroll Spy - Update active class based on scroll position
  scrollListener3 = () => {
    if (!isHomeRoute) {
      clearMainMenuActive()
      return
    }

    let current = ''
    sections.forEach((section) => {
      if (window.scrollY >= section.offsetTop - 150) {
        current = section.getAttribute('id')
      }
    })

    if (!current) {
      setHomeMenuActive()
      return
    }

    navLinks.forEach((link) => {
      if (link.parentElement) {
        link.parentElement.classList.remove('active')
      }

      const href = link.getAttribute('href')
      if (href && href.includes('#' + current) && link.parentElement) {
        link.parentElement.classList.add('active')
      }
    })
  }
  window.addEventListener('scroll', scrollListener3)
  scrollListener3()

  // C: Click Event - Internal smooth scroll & UI active state synchronization
  navLinks.forEach((link) => {
    link.addEventListener('click', function (e) {
      const href = this.getAttribute('href')
      if (href && href.includes('#')) {
        const targetId = href.substring(href.indexOf('#'))
        const targetElement = document.querySelector(targetId)
        if (targetElement) {
          e.preventDefault()
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth',
          })
          navLinks.forEach((item) => item.parentElement.classList.remove('active'))
          navLinks.forEach((item) => {
            if (item.getAttribute('href') === href) {
              item.parentElement.classList.add('active')
            }
          })
        }
      }
    })
  })

  // 6. Mobile Menu Enhancements
  const mobileMenuDropdown = document.getElementById('main_menu_dropdown')
  const mobileMenuLinks = document.querySelectorAll('.main_menu_list .nav-link')
  const mobileMenuBtn = document.querySelector('.mobile_menu_btn')
  const menuIcon = document.querySelector('.mobile_menu_btn i')

  if (mobileMenuDropdown && mobileMenuBtn) {
    // A: Close the menu when clicking on any link inside it
    mobileMenuLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (mobileMenuDropdown.classList.contains('show')) {
          mobileMenuBtn.click()
        }
      })
    })

    // B: Close the menu when clicking anywhere outside of it
    documentClickListener = function (event) {
      const isClickInsideMenu = mobileMenuDropdown.contains(event.target)
      const isClickOnToggleBtn = mobileMenuBtn.contains(event.target)
      if (
        !isClickInsideMenu &&
        !isClickOnToggleBtn &&
        mobileMenuDropdown.classList.contains('show')
      ) {
        mobileMenuBtn.click()
      }
    }
    document.addEventListener('click', documentClickListener)

    // C: Toggle hamburger icon
    mobileMenuDropdown.addEventListener('show.bs.collapse', function () {
      menuIcon.classList.remove('fa-bars')
      menuIcon.classList.add('fa-xmark')
    })

    mobileMenuDropdown.addEventListener('hide.bs.collapse', function () {
      menuIcon.classList.remove('fa-xmark')
      menuIcon.classList.add('fa-bars')
    })
  }
}

window.initTheme = initTheme
window.cleanupTheme = cleanupTheme
initTheme()
