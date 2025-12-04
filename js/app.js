const courses = [
  {
    id: 1,
    category: 'marketing',
    tagLabel: 'Marketing',
    title: 'The Ultimate Google Ads Training Course',
    price: 100,
    author: 'Jerome Bell',
    image: 'img/cards/marketing/1.jpg',
  },
  {
    id: 4,
    category: 'management',
    tagLabel: 'Management',
    title: 'Product Management Fundamentals',
    price: 480,
    author: 'Marvin McKinney',
    image: 'img/cards/management/1.jpg',
  },
  {
    id: 7,
    category: 'hr',
    tagLabel: 'HR & Recruiting',
    title: 'HR Management and Analytics',
    price: 200,
    author: 'Leslie Alexander Li',
    image: 'img/cards/hr/1.jpg',
  },
  {
    id: 2,
    category: 'marketing',
    tagLabel: 'Marketing',
    title: 'Brand Management & PR Communications',
    price: 530,
    author: 'Kristin Watson',
    image: 'img/cards/marketing/2.jpg',
  },
  {
    id: 10,
    category: 'design',
    tagLabel: 'Design',
    title: 'Graphic Design Basic',
    price: 500,
    author: 'Guy Hawkins',
    image: 'img/cards/design/1.jpg',
  },
  {
    id: 5,
    category: 'management',
    tagLabel: 'Management',
    title: 'Business Development Management',
    price: 400,
    author: 'Dianne Russell',
    image: 'img/cards/management/2.jpg',
  },
  {
    id: 13,
    category: 'development',
    tagLabel: 'Development',
    title: 'Highload Software Architecture',
    price: 600,
    author: 'Brooklyn Simmons',
    image: 'img/cards/development/1.jpg',
  },
  {
    id: 8,
    category: 'hr',
    tagLabel: 'HR & Recruiting',
    title: 'Human Resources – Selection and Recruitment',
    price: 150,
    author: 'Kathryn Murphy',
    image: 'img/cards/hr/2.jpg',
  },
  {
    id: 11,
    category: 'design',
    tagLabel: 'Design',
    title: 'User Experience. Human-centered Design',
    price: 240,
    author: 'Cody Fisher',
    image: 'img/cards/design/2.jpg',
  },
  {
    id: 3,
    category: 'marketing',
    tagLabel: 'Marketing',
    title: 'Digital Marketing Strategy Basics',
    price: 210,
    author: 'Jacob Jones',
    image: 'img/cards/marketing/3.jpg',
  },
  {
    id: 6,
    category: 'management',
    tagLabel: 'Management',
    title: 'Strategic Project Leadership',
    price: 350,
    author: 'Cameron Williamson',
    image: 'img/cards/management/3.jpg',
  },
  {
    id: 9,
    category: 'hr',
    tagLabel: 'HR & Recruiting',
    title: 'Effective Interview Techniques',
    price: 180,
    author: 'Guy Hawkins',
    image: 'img/cards/hr/3.jpg',
  },
  {
    id: 14,
    category: 'development',
    tagLabel: 'Development',
    title: 'JavaScript for Web Applications',
    price: 320,
    author: 'Devon Lane',
    image: 'img/cards/development/2.jpg',
  },
  {
    id: 15,
    category: 'development',
    tagLabel: 'Development',
    title: 'React: From Zero to Production',
    price: 450,
    author: 'Courtney Henry',
    image: 'img/cards/development/3.jpg',
  },
  {
    id: 16,
    category: 'marketing',
    tagLabel: 'Marketing',
    title: 'The test test',
    price: 700,
    author: 'Jerome Bell',
    image: 'img/cards/marketing/1.jpg',
  },
  {
    id: 16,
    category: 'hr',
    tagLabel: 'HR & Recruiting',
    title: 'test Hr',
    price: 99,
    author: 'Guy Hawkins',
    image: 'img/cards/hr/3.jpg',
  },
  {
    id: 17,
    category: 'hr',
    tagLabel: 'HR & Recruiting',
    title: 'test Hr 2',
    price: 555,
    author: 'Guy Hawkins',
    image: 'img/cards/hr/3.jpg',
  },
];

const coursesGridElement = document.querySelector('.courses__grid');
const tabsButtons = document.querySelectorAll('.tabs__item');
const searchInputElement = document.querySelector('.search__input');
const searchFormElement = document.querySelector('.search');
const loadMoreButtonElement = document.querySelector('.courses__load-more');

const COURSES_PAGE_SIZE = 9;

let currentCategory = 'all';
let currentQuery = '';
let visibleCount = COURSES_PAGE_SIZE;

const categoryCounts = courses.reduce(
  (acc, course) => {
    acc.all += 1;
    acc[course.category] = (acc[course.category] || 0) + 1;
    return acc;
  },
  { all: 0 }
);

const createCourseCardMarkup = (course) => {
  const tagModifier = `course-card__tag--${course.category}`;

  return `
    <a class="course-card__link" href="#">
      <img class="course-card__image" src="${course.image}" alt="${course.title}">
      <div class="course-card__body">
        <div class="course-card__meta">
          <span class="course-card__tag ${tagModifier}">${course.tagLabel}</span>
        </div>
        <h2 class="course-card__title">${course.title}</h2>
        <div class="course-card__footer">
          <span class="course-card__price">$${course.price}</span>
          <span class="course-card__author">by ${course.author}</span>
        </div>
      </div>
    </a>
  `;
};

const renderCourses = (items) => {
  if (!coursesGridElement) {
    return;
  }

  if (!items.length) {
    coursesGridElement.innerHTML = `
      <li class="courses__empty">
        Нет такого курса, попробуйте сделать другой запрос
      </li>
    `;
    return;
  }

  const fragments = items
    .map((course) => {
      return `
        <li class="course-card" data-category="${course.category}">
          ${createCourseCardMarkup(course)}
        </li>
      `;
    })
    .join('');

  coursesGridElement.innerHTML = fragments;
};

const filterCoursesByCategory = (category, list) => {
  if (category === 'all') {
    return list;
  }

  return list.filter((course) => course.category === category);
};

const filterCoursesByTitle = (query, list) => {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return list;
  }

  return list.filter((course) =>
    course.title.toLowerCase().includes(normalizedQuery)
  );
};

const updateLoadMoreVisibility = (totalItems) => {
  if (!loadMoreButtonElement) {
    return;
  }

  if (totalItems > visibleCount) {
    loadMoreButtonElement.classList.remove('courses__load-more--hidden');
  } else {
    loadMoreButtonElement.classList.add('courses__load-more--hidden');
  }
};

const applyFilters = () => {
  let filtered = [...courses];

  filtered = filterCoursesByCategory(currentCategory, filtered);
  filtered = filterCoursesByTitle(currentQuery, filtered);

  const totalItems = filtered.length;
  const itemsToRender = filtered.slice(0, visibleCount);

  renderCourses(itemsToRender);
  updateLoadMoreVisibility(totalItems);
};

const handleTabClick = (evt) => {
  const button = evt.currentTarget;
  const category = button.dataset.filter;

  currentCategory = category;
  visibleCount = COURSES_PAGE_SIZE;

  tabsButtons.forEach((tab) => {
    tab.classList.remove('tabs__item--active');
  });

  button.classList.add('tabs__item--active');

  applyFilters();
};

tabsButtons.forEach((button) => {
  const category = button.dataset.filter;
  const labelText = button.textContent.trim();
  const count = categoryCounts[category] ?? 0;

  button.innerHTML = `
    <span class="tabs__label">${labelText}</span>
    <span class="tabs__count">${count}</span>
  `;

  button.addEventListener('click', handleTabClick);
});

if (searchFormElement) {
  searchFormElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });
}

if (searchInputElement) {
  searchInputElement.addEventListener('input', (evt) => {
    currentQuery = evt.target.value;
    visibleCount = COURSES_PAGE_SIZE;
    applyFilters();
  });
}

if (loadMoreButtonElement) {
  loadMoreButtonElement.addEventListener('click', () => {
    visibleCount += COURSES_PAGE_SIZE;
    applyFilters();
  });
}

applyFilters();
