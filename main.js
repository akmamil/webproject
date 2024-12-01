const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const closeIcon = navLinks.querySelector("i.ri-close-line");
//переключение видимости мобильного меню
menuBtn.addEventListener("click", () => {
  navLinks.classList.add("open");
  menuBtn.setAttribute("aria-expanded", "true"); // доступность
});
//меню закрывается когда нажимаем на иконку закрытия
if (closeIcon) {
  closeIcon.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
  });
}
/*навигация и плавный скроллинг*/
function handleNavigationClick(event) {
  // предотвратит поведение привязочного тега по умолчанию
  event.preventDefault();
  // удалит класс "active" из всех навигационных ссылок
  const links = document.querySelectorAll("nav ul li");
  links.forEach((link) => link.classList.remove("active"));
  // добавит класс "active" к родительскому элементу li ссылки, на который был сделан щелчок
  event.target.parentNode.classList.add("active");
  // плавная прокрутка к целевому разделу
  const targetId = event.target.getAttribute("href").substring(1);
  const targetSection = document.getElementById(targetId);
  if (targetSection) {
    targetSection.scrollIntoView({ behavior: "smooth" });
  }
  //закрывает меню после нажатия на ссылку в телефонах
  navLinks.classList.remove("open");
  menuBtn.setAttribute("aria-expanded", "false");
}
const navLinksItems = document.querySelectorAll("nav ul li a");
navLinksItems.forEach((link) => {
  link.addEventListener("click", handleNavigationClick);
});
// логика электронных почт
function sendEmail() {
  Email.send({
    Host: "smtp.gmail.com",
    Username: "pallavi867709@gmail.com",
    Password: "Pallavi@2005??",
    To: "pallavi867709@gmail.com",
    From: document.getElementById("email").value,
    Subject: "This is the subject",
    Body: "And this is the body",
  }).then((message) => alert(message));
}




// BMI Calculator
document.getElementById("btn").addEventListener("click", function() {
  // Получение значений из полей ввода
  const height = parseFloat(document.getElementById("height").value); // В высоту вводится в см
  const weight = parseFloat(document.getElementById("weight").value); // В весе вводится в кг

  // Проверка валидности введенных данных
  if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
    // Показать ошибку, если данные некорректны
    if (isNaN(height) || height <= 0) {
      document.getElementById("height_error").textContent = "Please enter a valid height.";
    } else {
      document.getElementById("height_error").textContent = "";
    }

    if (isNaN(weight) || weight <= 0) {
      document.getElementById("weight_error").textContent = "Please enter a valid weight.";
    } else {
      document.getElementById("weight_error").textContent = "";
    }

    document.getElementById("output").textContent = "";
    return;
  }

  // Преобразование высоты из см в метры
  const heightInMeters = height / 100;

  // Расчет BMI
  const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(2);

  // Определение категории BMI
  let category = "";
  if (bmi < 18.5) {
    category = "Underweight";
  } else if (bmi < 24.9) {
    category = "Normal weight";
  } else if (bmi < 29.9) {
    category = "Overweight";
  } else {
    category = "Obesity";
  }

  document.getElementById("output").textContent = `Your BMI is ${bmi} (${category}).`;
  document.getElementById("height_error").textContent = "";
  document.getElementById("weight_error").textContent = "";
});



// Protein Intake Calculator
document.getElementById("protein-btn").addEventListener("click", function () {
  // Получаем значения из полей
  const weight = parseFloat(document.getElementById("protein-weight").value);
  const goal = document.getElementById("protein-goal").value;

  if (isNaN(weight) || weight <= 0) {
    document.getElementById("protein-output").textContent = "Please enter a valid weight.";
    return;
  }

  let proteinIntake;

  // В зависимости от цели фитнеса рассчитываем потребление белка
  switch (goal) {
    case "maintenance":
      proteinIntake = (weight * 1.0).toFixed(2); // 1.0 г/кг для поддержания
      break;
    case "muscle-gain":
      proteinIntake = (weight * 1.2).toFixed(2); // 1.2 г/кг для набора массы
      break;
    case "fat-loss":
      proteinIntake = (weight * 1.5).toFixed(2); // 1.5 г/кг для снижения жира
      break;
    default:
      proteinIntake = 0;
  }

  document.getElementById("protein-output").textContent = `Your recommended protein intake is ${proteinIntake} grams per day.`;
});




// Макронутриентный калькулятор
document.getElementById("macro-btn").addEventListener("click", function () {
  const weight = parseFloat(document.getElementById("macro-weight").value);
  const goal = document.getElementById("macro-goal").value;
  const calories = parseFloat(document.getElementById("macro-calories").value);

  if (isNaN(weight) || weight <= 0 || isNaN(calories) || calories <= 0) {
    document.getElementById("macro-output").textContent = "Please enter valid weight and calorie values.";
    return;
  }

  let protein, fat, carbs;

  // В зависимости от цели фитнеса рассчитываем макронутриенты
  switch (goal) {
    case "maintenance":
      protein = (weight * 1.0).toFixed(2); // 1 г/кг для поддержания
      fat = (weight * 0.9).toFixed(2); // 0.9 г/кг жиров для поддержания
      break;
    case "bulking":
      protein = (weight * 1.2).toFixed(2); // 1.2-1.5 г/кг для набора массы
      fat = (weight * 1.0).toFixed(2); // 1 г/кг для набора массы
      break;
    case "cutting":
      protein = (weight * 1.5).toFixed(2); // 1.5-2 г/кг для снижения веса
      fat = (weight * 0.8).toFixed(2); // 0.8 г/кг жиров для сжигания жира
      break;
    default:
      protein = fat = carbs = 0;
  }

  // Расчет углеводов на основе калорий
  // Белки и жиры дают калории: 1 г белка = 4 калории, 1 г жира = 9 калорий
  const proteinCalories = protein * 4;
  const fatCalories = fat * 9;
  const remainingCalories = calories - (proteinCalories + fatCalories);
  carbs = (remainingCalories / 4).toFixed(2); // 1 г углеводов = 4 калории

  // Проверка на отрицательные значения углеводов
  if (carbs < 0) {
    carbs = 0;
  }

  document.getElementById("macro-output").textContent = `
    Your daily macronutrient breakdown is:
    - Protein: ${protein}g
    - Fat: ${fat}g
    - Carbs: ${carbs}g
  `;
});
