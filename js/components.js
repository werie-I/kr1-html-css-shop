function renderSiteComponents() {
  const headerHost = document.querySelector("[data-site-header]");

  if (headerHost) {
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const links = [
      ["index.html", "Главная"],
      ["catalog.html", "Каталог"],
      ["ceremony.html", "Церемонии"],
      ["booking.html", "Бронирование"],
      ["tea-guide.html", "Подбор чая"],
      ["tea-history.html", "История чая"],
      ["reviews.html", "Отзывы"],
      ["favorites.html", "♡ Избранное"],
      ["cart.html", "Корзина"],
      ["contacts.html", "Контакты"]
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
            МЕНЮ +
          </button>
          <nav class="site-header__nav" id="site-navigation" aria-label="Основная навигация">
            ${links.map(([url, label]) => `
              <a class="site-header__link${currentPage === url ? " site-header__link--active" : ""}"
                 href="${url}"${currentPage === url ? ' aria-current="page"' : ""}>${label}</a>
            `).join("")}
          </nav>
        </div>
      </header>
    `;

    const menuButton = headerHost.querySelector(".site-header__menu-button");
    const navigation = headerHost.querySelector(".site-header__nav");

    menuButton.addEventListener("click", () => {
      const isOpen = navigation.classList.toggle("site-header__nav--open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.textContent = isOpen ? "ЗАКРЫТЬ −" : "МЕНЮ +";
    });

    if (currentPage !== "index.html") {
      const pageLabels = {
        "catalog.html": "Каталог",
        "product.html": "Товар",
        "cart.html": "Корзина",
        "order.html": "Оформление заказа",
        "ceremony.html": "Церемонии",
        "booking.html": "Бронирование",
        "tea-guide.html": "Подбор чая",
        "tea-history.html": "История чая",
        "favorites.html": "Избранное",
        "reviews.html": "Отзывы",
        "contacts.html": "Контакты"
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
}

document.addEventListener("DOMContentLoaded", renderSiteComponents);
