function renderSiteComponents() {
  const headerHost = document.querySelector("[data-site-header]");

  if (headerHost) {
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const clubPages = ["tea-guide.html", "tea-history.html", "reviews.html", "contacts.html"];
    const clubIsActive = clubPages.includes(currentPage);
    const links = [
      ["index.html", "Главная"],
      ["catalog.html", "Каталог"],
      ["ceremony.html", "Церемонии"]
    ];

    headerHost.innerHTML = `
      <header class="site-header">
        <div class="site-header__inner">
          <a class="site-header__brand" href="index.html" aria-label="Чайный клуб — главная">
            ЧАЙНЫЙ КЛУБ
            <span class="site-header__tagline">ИСКУССТВО ЧАЯ</span>
          </a>
          <button class="site-header__menu-button" type="button"
                  aria-expanded="false" aria-controls="site-navigation">
            <span class="site-header__menu-lines" aria-hidden="true"><i></i><i></i></span>
            <span class="site-header__menu-label">МЕНЮ</span>
          </button>
          <nav class="site-header__nav" id="site-navigation" aria-label="Основная навигация">
            ${links.map(([url, label]) => `
              <a class="site-header__link${currentPage === url ? " site-header__link--active" : ""}"
                 href="${url}"${currentPage === url ? ' aria-current="page"' : ""}>${label}</a>
            `).join("")}
            <details class="site-header__dropdown">
              <summary class="site-header__dropdown-toggle${clubIsActive ? " site-header__link--active" : ""}">
                О клубе <span aria-hidden="true">⌄</span>
              </summary>
              <div class="site-header__dropdown-panel">
                <a href="tea-guide.html"${currentPage === "tea-guide.html" ? ' aria-current="page"' : ""}>Подбор чая</a>
                <a href="tea-history.html"${currentPage === "tea-history.html" ? ' aria-current="page"' : ""}>История чая</a>
                <a href="reviews.html"${currentPage === "reviews.html" ? ' aria-current="page"' : ""}>Отзывы гостей</a>
                <a href="contacts.html"${currentPage === "contacts.html" ? ' aria-current="page"' : ""}>Контакты</a>
              </div>
            </details>
            <div class="site-header__utility-links">
              <a class="site-header__utility-link${currentPage === "favorites.html" ? " site-header__link--active" : ""}" href="favorites.html" aria-label="Избранное">♡</a>
              <a class="site-header__utility-link${currentPage === "cart.html" ? " site-header__link--active" : ""}" href="cart.html" aria-label="Корзина">▢</a>
            </div>
            <a class="site-header__booking" href="booking.html"${currentPage === "booking.html" ? ' aria-current="page"' : ""}>
              Записаться <span aria-hidden="true">↗</span>
            </a>
          </nav>
        </div>
      </header>
    `;

    const menuButton = headerHost.querySelector(".site-header__menu-button");
    const navigation = headerHost.querySelector(".site-header__nav");
    menuButton.addEventListener("click", () => {
      const isOpen = navigation.classList.toggle("site-header__nav--open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.querySelector(".site-header__menu-label").textContent = isOpen ? "ЗАКРЫТЬ" : "МЕНЮ";
    });

    // On small screens the dropdown behaves like an ordinary expandable menu.
    const dropdown = headerHost.querySelector(".site-header__dropdown");
    dropdown.addEventListener("toggle", () => {
      if (window.matchMedia("(min-width: 761px)").matches) return;
      dropdown.classList.toggle("site-header__dropdown--expanded", dropdown.open);
    });

    if (currentPage !== "index.html") {
      const pageLabels = {
        "catalog.html": "Каталог", "product.html": "Товар", "cart.html": "Корзина",
        "order.html": "Оформление заказа", "ceremony.html": "Церемонии",
        "booking.html": "Бронирование", "tea-guide.html": "Подбор чая",
        "tea-history.html": "История чая", "favorites.html": "Избранное",
        "reviews.html": "Отзывы", "contacts.html": "Контакты"
      };
      const breadcrumb = document.createElement("nav");
      breadcrumb.className = "site-breadcrumb";
      breadcrumb.setAttribute("aria-label", "Хлебные крошки");
      breadcrumb.innerHTML = `
        <a class="site-breadcrumb__link" href="index.html">Главная</a>
        <span class="site-breadcrumb__separator" aria-hidden="true">/</span>
        <span class="site-breadcrumb__current" aria-current="page">${pageLabels[currentPage] || "Раздел"}</span>
      `;
      headerHost.insertAdjacentElement("afterend", breadcrumb);
    }
  }

  const creditsHost = document.querySelector("[data-site-credits]");
  if (creditsHost) {
    creditsHost.innerHTML = `
      <aside class="site-credits" aria-label="Информация об авторских правах">
        <p class="site-credits__text">
          © 2026 «Чайный клуб». Учебный проект. Тексты и программный код проекта
          разработаны для учебных целей. Права на сторонние фотографии, шрифты,
          библиотеки и товарные знаки принадлежат их правообладателям.
          Источники и условия использования материалов указаны в README.md.
        </p>
      </aside>
    `;
  }

  initTeaPourInteraction();
  initTeaTimer();
}

function initTeaPourInteraction() {
  const pourButton = document.querySelector("[data-pour-button]");
  const pourScene = document.querySelector("[data-pour-scene]");
  const pourStatus = document.querySelector("[data-pour-status]");
  if (!pourButton || !pourScene) return;

  pourButton.addEventListener("click", () => {
    if (pourScene.classList.contains("tea-pour-scene--pouring")) return;
    pourScene.classList.remove("tea-pour-scene--ready");
    // Restart the CSS animation reliably on repeated clicks.
    void pourScene.offsetWidth;
    pourScene.classList.add("tea-pour-scene--pouring");
    pourButton.disabled = true;
    pourButton.textContent = "Наливаем чай…";
    if (pourStatus) pourStatus.textContent = "Чай наполняет чашку. Ещё мгновение…";

    window.setTimeout(() => {
      pourScene.classList.remove("tea-pour-scene--pouring");
      pourScene.classList.add("tea-pour-scene--ready");
      pourButton.disabled = false;
      pourButton.textContent = "Налить ещё раз";
      if (pourStatus) pourStatus.textContent = "Готово. Сделайте паузу и насладитесь ароматом.";
    }, 2500);
  });
}

function initTeaTimer() {
  const timer = document.querySelector("[data-tea-timer]");
  if (!timer) return;

  const teaSelect = timer.querySelector("[data-tea-choice]");
  const display = timer.querySelector("[data-timer-display]");
  const temperature = timer.querySelector("[data-tea-temperature]");
  const startButton = timer.querySelector("[data-timer-start]");
  const resetButton = timer.querySelector("[data-timer-reset]");
  const message = timer.querySelector("[data-timer-message]");
  const presets = {
    sencha: { seconds: 120, temperature: "80°C", label: "Сенча" },
    black: { seconds: 180, temperature: "95°C", label: "Чёрный чай" },
    white: { seconds: 180, temperature: "80°C", label: "Белый чай" },
    oolong: { seconds: 180, temperature: "90°C", label: "Улун" }
  };

  let remaining = presets[teaSelect.value].seconds;
  let intervalId = null;
  let running = false;

  const render = () => {
    const minutes = Math.floor(remaining / 60).toString().padStart(2, "0");
    const seconds = (remaining % 60).toString().padStart(2, "0");
    display.textContent = `${minutes}:${seconds}`;
    display.setAttribute("aria-label", `${minutes} минут ${seconds} секунд`);
  };

  const stop = () => {
    if (intervalId !== null) window.clearInterval(intervalId);
    intervalId = null;
    running = false;
    startButton.textContent = remaining === 0 ? "Готово" : "Продолжить";
    startButton.disabled = remaining === 0;
  };

  const reset = () => {
    stop();
    remaining = presets[teaSelect.value].seconds;
    startButton.disabled = false;
    startButton.textContent = "Начать заваривание";
    message.textContent = "Выберите сорт и нажмите «Начать заваривание».";
    render();
  };

  teaSelect.addEventListener("change", () => {
    const preset = presets[teaSelect.value];
    temperature.textContent = preset.temperature;
    reset();
  });

  startButton.addEventListener("click", () => {
    if (running) {
      stop();
      message.textContent = "Таймер приостановлен.";
      return;
    }
    if (remaining <= 0) return;
    running = true;
    startButton.textContent = "Пауза";
    message.textContent = `Заваривается ${presets[teaSelect.value].label}…`;
    intervalId = window.setInterval(() => {
      remaining -= 1;
      render();
      if (remaining <= 0) {
        stop();
        startButton.textContent = "Готово";
        message.textContent = "Ваш чай готов. Приятного чаепития!";
        if ("vibrate" in navigator) navigator.vibrate(120);
      }
    }, 1000);
  });

  resetButton.addEventListener("click", reset);
  render();
}

document.addEventListener("DOMContentLoaded", renderSiteComponents);
