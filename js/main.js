const modal = document.querySelector('#orderModal');
const orderForm = document.querySelector('#orderForm');
const productInput = document.querySelector('#productInput');

const orderButtons = document.querySelectorAll('.product-card__button');
const closeButtons = document.querySelectorAll('[data-modal-close]');

const nameInput = document.querySelector('#nameInput');
const phoneInput = document.querySelector('#phoneInput');
const emailInput = document.querySelector('#emailInput');

const nameError = document.querySelector('#nameError');
const phoneError = document.querySelector('#phoneError');
const emailError = document.querySelector('#emailError');


// Открытие модального окна

orderButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const productName = button.dataset.product;

        productInput.value = productName;

        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');

        nameInput.focus();
    });
});


// Закрытие модального окна

function closeModal() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
}

closeButtons.forEach((button) => {
    button.addEventListener('click', closeModal);
});


// Закрытие по клавише Escape

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.classList.contains('is-open')) {
        closeModal();
    }
});


// Валидация формы

orderForm.addEventListener('submit', (event) => {
    event.preventDefault();

    nameError.textContent = '';
    phoneError.textContent = '';
    emailError.textContent = '';

    let isValid = true;

    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();
    const email = emailInput.value.trim();

    if (name.length < 2) {
        nameError.textContent = 'Введите имя не короче 2 символов.';
        isValid = false;
    }

    const phoneDigits = phone.replace(/\D/g, '');

    if (phoneDigits.length < 10) {
        phoneError.textContent = 'Введите корректный номер телефона.';
        isValid = false;
    }

    if (!email.includes('@') || !email.includes('.')) {
        emailError.textContent = 'Введите корректный email.';
        isValid = false;
    }

    if (!isValid) {
        return;
    }

    alert('Заявка успешно отправлена!');

    orderForm.reset();
    closeModal();
});