// Variables
const root = document.getElementById('root');
let errors = 0;
const AnswerOfErrors = [
    {
        image: '/src/images/Errors-1.png',
        phrase: 'Oh no, we have here a Jerry.',
    },
    {
        image: '/src/images/Errors-2.png',
        phrase:
            'Please Jerry, just make a correct search, We the Mr. Meeseeks are created to serve a singular purpose for which we will go to any lengths to fufill.',
    },
    {
        image: '/src/images/Errors-3.png',
        phrase:
            'Existence is pain to a Meeseeks, Jerry! And we will do anything to alleviate that pain!',
    },
];
let Content = '';

// TODO Seria bueno colocar una funcion de sugerencias al hacer la busqueda

// TODO falta hacer el footer

const SearchPrincipal = `
<main class="main search-main">
<section class="section hero-section search-p-section">
    <div
        class="hero-section__background search-p-section__background"
    ></div>
    <form class="search-p__form">
        <input
            class="search-p__input"
            type="text"
            placeholder="Search by Name"
            id="name-search"
        />
        <button class="search-p__button" id="search-p__button">
            <img
                class="search-p__img"
                src="/src/images/Search Icon.svg"
                alt="Search Icon"
            />
        </button>
    </form>
</section>
</main>

<footer class="footer"></footer>`;

const Home = `
<main class="main">
    <section class="section hero-section">
        <img
            src="/src/images/Rick&Morty-Name.svg"
            alt="Rick & Morty"
            class="hero-section__img"
        />
        <div class="hero-section__background"></div>
    </section>

    <section class="section about-section">
        <img
            src="/src/images/Rick&Morty - About Section.png"
            alt="About Rick & Morty"
            class="section__img"
        />
        <div class="about-section__container">
            <h1 class="section__title about-section__title">
                Rick & Morty
            </h1>
            <p class="section__text about-section__text">
                Is an American adult animated science fiction sitcom
                created by Justin Roiland and Dan Harmon. The series
                follows the misadventures of cynical mad scientist
                Rick Sanchez and his good-hearted but fretful
                grandson Morty Smith, who split their time between
                domestic life and interdimensional adventures.
            </p>
        </div>
    </section>

    <section class="section cta-section">
        <div class="cta-section__container">
            <h2 class="section__title cta-section__title">
                Search about Rick & Morty
            </h2>
            <p class="section__text cta-section__text">
                Search more about Rick & Morty here, where you can
                find info about every character of this tv show.
            </p>
            <button class="search-button search-button--large" id="cta-section-button">
                <img
                    src="/src/images/Search Icon.svg"
                    alt="Search Icon"
                    class="cta-search--icon"
                />
                <span>Search</span>
            </button>
        </div>
        <img
            src="/src/images/Rick&Morty - CTA Section.png"
            alt="Characters presentation"
            class="section__img cta-section__img"
        />
    </section>
</main>

<footer class="footer"></footer>`;
// Funciones

const ShowPage = (page) => {
    root.innerHTML = page;
};

if (location.pathname === '/' || location.pathname === '/rick-morty/') {
    ShowPage(Home);
    const header = document.getElementById('header');
    const headerText = document.querySelector('.header__text');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 200) {
            header.classList.add('header--scroll');
            headerText.classList.add('header__text--scroll');
        } else if (window.scrollY <= 200) {
            header.classList.remove('header--scroll');
            headerText.classList.remove('header__text--scroll');
        }
    });
}

const HomeLink = document.getElementById('home-link');
const headerSearchButton = document.getElementById('header-search-button');
let ctaSearchButton = document.getElementById('cta-section-button');

const ChangeHeader = (element, action) => {
    if (!element && action == 'add') {
        headerSearchButton.classList.add('search-button--active');

        const header = document.getElementById('header');
        const headerText = document.querySelector('.header__text');

        header.classList.add('header--scroll--active');
        headerText.classList.add('header__text--active');
    } else if (element && action == 'add') {
        element.addEventListener('click', () => {
            history.pushState({}, {}, '/search/');
            ShowPage(SearchPrincipal);

            headerSearchButton.classList.add('search-button--active');

            const header = document.getElementById('header');
            const headerText = document.querySelector('.header__text');

            header.classList.add('header--scroll--active');
            headerText.classList.add('header__text--active');

            CreateForm();
        });
    } else if (!element && action == 'remove') {
        headerSearchButton.classList.remove('search-button--active');

        const header = document.getElementById('header');
        const headerText = document.querySelector('.header__text');

        header.classList.remove('header--scroll--active');
        headerText.classList.remove('header__text--active');
    } else if (element && action === 'remove') {
        if (location.pathname === '/rick-morty/') {
            element.addEventListener('click', () => {
                history.pushState({}, {}, '/rick-morty/');
                ShowPage(Home);

                headerSearchButton.classList.remove('search-button--active');

                const header = document.getElementById('header');
                const headerText = document.querySelector('.header__text');

                header.classList.remove('header--scroll--active');
                headerText.classList.remove('header__text--active');

                ctaSearchButton = document.getElementById('cta-section-button');
                ChangeHeader(ctaSearchButton, 'add');
            });
        }
    }
};

ChangeHeader(HomeLink, 'remove');
ChangeHeader(headerSearchButton, 'add');
ChangeHeader(ctaSearchButton, 'add');

window.onpopstate = () => {
    if (location.pathname === '/rick-morty/') {
        ShowPage(Home);
        ctaSearchButton = document.getElementById('cta-section-button');
        ChangeHeader(ctaSearchButton, 'add');
        ChangeHeader(false, 'remove');
    } else if (location.search) {
        const interrogationRemoved = location.search.substring(1);
        ChangeHeader(false, 'add');
        ShowContent(interrogationRemoved);
    } else if (location.pathname === '/search/') {
        ShowPage(SearchPrincipal);
        ChangeHeader(false, 'add');
        CreateForm();
    }
};

const CreateForm = () => {
    const Name = document.getElementById('name-search');
    const SearchPrincipalButton = document.getElementById('search-p__button');

    SearchPrincipalButton.addEventListener('click', () => {
        ShowContent(Name.value);
        history.pushState({}, {}, `/search/?${Name.value}`);
    });
};

const ShowContent = (name) => {
    if (name) {
        Content = `
        <main class="main main-results">
            <form class="filter-form" id="filter-form">
                <div class="input-name__container">
                    <input class="name-input" type="text" name="name" id="name" placeholder="Search" value=${name} />
                    <img class="input-name__img" id="filter-drop-down" src="/src/images/Drop-Down-Icon.svg"
                        alt="Drop Down Icon">
                </div>

                <h3 class="filter-form__title">Status</h3>
                <div class="input-container">
                    <input class="status-input filter__input" type="checkbox" name="status" id="alive" value="alive" />
                    <span class="checkbox"></span>
                    <span class="grow-checkbox"></span>
                    <label for="alive">Alive</label>
                </div>
                <div class="input-container">
                    <input class="status-input filter__input" type="checkbox" name="status" id="dead" value="dead" />
                    <span class="checkbox"></span>
                    <span class="grow-checkbox"></span>
                    <label for="dead">Dead</label>
                </div>

                <div class="input-container">
                    <input class="status-input filter__input" type="checkbox" name="status" id="unknown"
                        value="unknown" />
                    <span class="checkbox"></span>
                    <span class="grow-checkbox"></span>
                    <label for="unknown">Unknown</label>
                </div>

                <h3 class="filter-form__title">Gender</h3>
                <div class="input-container">
                    <input class="gender-input filter__input" type="checkbox" name="gender" id="male" value="male" />
                    <span class="checkbox"></span>
                    <span class="grow-checkbox"></span>
                    <label for="male">Male</label>
                </div>
                <div class="input-container">
                    <input class="gender-input filter__input" type="checkbox" name="gender" id="female"
                        value="female" />
                    <span class="checkbox"></span>
                    <span class="grow-checkbox"></span>
                    <label for="female">Female</label>
                </div>

                <div class="input-container">
                    <input class="gender-input filter__input" type="checkbox" name="gender" id="genderless"
                        value="genderless" />
                    <span class="checkbox"></span>
                    <span class="grow-checkbox"></span>
                    <label for="genderless">Genderless</label>
                </div>
                <div class="input-container">
                    <input class="gender-input filter__input" type="checkbox" name="gender" id="unknown-gender"
                        value="unknown" />
                    <span class="checkbox"></span>
                    <span class="grow-checkbox"></span>
                    <label for="unknown-gender">Unknown</label>
                </div>

                <button class="search-button search-data-button" type="submit" id="search-data-button">
                    <img src="/src/images/Search Icon.svg" alt="Search Icon" class="filter-search__icon" />
                    <span>Filter</span>
                </button>
            </form>

            <div id="results-container" class="results-container">
                <div id="container" class="container"></div>
                <div id="pagination" class="end"></div>
            </div>
        </main>
    `;
    } else if (!name) {
        Content = `
        <main class="main main-results">
            <form class="filter-form" id="filter-form">
                <div class="input-name__container">
                    <input class="name-input" type="text" name="name" id="name" placeholder="Search"/>
                    <img class="input-name__img" id="filter-drop-down" src="/src/images/Drop-Down-Icon.svg"
                        alt="Drop Down Icon">
                </div>

                <h3 class="filter-form__title">Status</h3>
                <div class="input-container">
                    <input class="status-input filter__input" type="checkbox" name="status" id="alive" value="alive" />
                    <span class="checkbox"></span>
                    <span class="grow-checkbox"></span>
                    <label for="alive">Alive</label>
                </div>
                <div class="input-container">
                    <input class="status-input filter__input" type="checkbox" name="status" id="dead" value="dead" />
                    <span class="checkbox"></span>
                    <span class="grow-checkbox"></span>
                    <label for="dead">Dead</label>
                </div>

                <div class="input-container">
                    <input class="status-input filter__input" type="checkbox" name="status" id="unknown"
                        value="unknown" />
                    <span class="checkbox"></span>
                    <span class="grow-checkbox"></span>
                    <label for="unknown">Unknown</label>
                </div>

                <h3 class="filter-form__title">Gender</h3>
                <div class="input-container">
                    <input class="gender-input filter__input" type="checkbox" name="gender" id="male" value="male" />
                    <span class="checkbox"></span>
                    <span class="grow-checkbox"></span>
                    <label for="male">Male</label>
                </div>
                <div class="input-container">
                    <input class="gender-input filter__input" type="checkbox" name="gender" id="female"
                        value="female" />
                    <span class="checkbox"></span>
                    <span class="grow-checkbox"></span>
                    <label for="female">Female</label>
                </div>

                <div class="input-container">
                    <input class="gender-input filter__input" type="checkbox" name="gender" id="genderless"
                        value="genderless" />
                    <span class="checkbox"></span>
                    <span class="grow-checkbox"></span>
                    <label for="genderless">Genderless</label>
                </div>
                <div class="input-container">
                    <input class="gender-input filter__input" type="checkbox" name="gender" id="unknown-gender"
                        value="unknown" />
                    <span class="checkbox"></span>
                    <span class="grow-checkbox"></span>
                    <label for="unknown-gender">Unknown</label>
                </div>

                <button class="search-button search-data-button" type="submit" id="search-data-button">
                    <img src="/src/images/Search Icon.svg" alt="Search Icon" class="filter-search__icon" />
                    <span>Filter</span>
                </button>
            </form>

            <div id="results-container" class="results-container">
                <div id="container" class="container"></div>
                <div id="pagination" class="end"></div>
            </div>
        </main>
    `;
    }

    root.innerHTML = Content;

    const SearchDataButton = document.getElementById('search-data-button');
    const FilterDropDown = document.getElementById('filter-drop-down');

    FilterDropDown.addEventListener('click', () => {
        ShowDropDown();
    });

    SearchDataButton.addEventListener('click', (event) => {
        searchData(event);
    });

    searchData(null);
};

const ShowDropDown = () => {
    let filterForm = document.getElementById('filter-form');

    if (filterForm.classList.contains('filter-form--open')) {
        filterForm.classList.remove('filter-form--open');
    } else if (filterForm.classList.contains('filter-form--open') === false) {
        filterForm.classList.add('filter-form--open');
    }
};

const searchData = (event) => {
    if (event) {
        event.preventDefault();
    }

    let searchName = document.getElementById('name');
    let statusInputs = document.querySelectorAll('.status-input');
    let genderInputs = document.querySelectorAll('.gender-input');
    const ResultsContainer = document.getElementById('results-container');
    const Pagination = document.getElementById('pagination');
    const filterForm = document.getElementById('filter-form');

    filterForm.classList.remove('filter-form--open');

    const Inputs = {
        Name: searchName,
        Status: statusInputs,
        Gender: genderInputs,
    };

    let statusCheck = [];
    let genderCheck = [];
    if (Inputs.Status.length > 0) {
        IsChecked(Inputs.Status, statusCheck);
    }

    if (Inputs.Gender.length > 0) {
        IsChecked(Inputs.Gender, genderCheck);
    }

    statusCheck = statusCheck.join('&status=');
    genderCheck = genderCheck.join('&gender=');

    Inputs.Status = statusCheck;
    Inputs.Gender = genderCheck;

    AskData(
        Inputs.Name.value,
        Inputs.Status,
        Inputs.Gender,
        1,
        ResultsContainer,
        Pagination
    );
};

const IsChecked = (check, array) => {
    check.forEach((status) => {
        if (status.checked) {
            array.push(status.value);
        }
    });
};

const AskData = async (
    name,
    status,
    gender,
    index,
    ResultsContainer,
    Pagination
) => {
    let Response = await fetch(
        `https://rickandmortyapi.com/api/character/?page=${index}&name=${name}&status=${status}&gender=${gender}`
    );
    ConfirmStatus(Response, name, status, gender, ResultsContainer, Pagination);
};

const ShowData = async (data, ResultsContainer) => {
    const Container = document.getElementById('container');
    if (Container.hasChildNodes() === false) {
        Container.classList.add('container');
        Container.classList.remove('container__error');
        data.forEach((content) => {
            const Character = CreateCharacter(content);
            Container.insertAdjacentHTML('beforeend', Character);

            ResultsContainer.append(Container);
        });
    } else if (Container.hasChildNodes() === true) {
        Container.innerHTML = '';
        Container.classList.remove('container__error');
        data.forEach((content) => {
            const Character = CreateCharacter(content);
            Container.insertAdjacentHTML('beforeend', Character);
        });
    }
};

const CreateCharacter = (content) => {
    const statusImage = checkImageStatus(content.status);
    const Character = `
    <div class="character">
                        <img class="character__img" src=${content.image} alt=${
        content.name
    } title=${content.name} />
                        <div class="character-text">
                            <h3 class="character__name">${capitalizeFirstLetter(
                                content.name
                            )}</h3>
                            <p class="character__status">
                                <img src=${statusImage} alt="${capitalizeFirstLetter(
        content.status
    )}" />
                                ${capitalizeFirstLetter(
                                    content.status
                                )} - ${capitalizeFirstLetter(content.species)}
                            </p>
                            <p class="character__first">First seen in:</p>
                            <p class="character__location">${capitalizeFirstLetter(
                                content.origin.name
                            )}</p>
                            <p class="character__last">
                                Last know location:
                            </p>
                            <p class="character__location">
                                ${capitalizeFirstLetter(content.location.name)}
                            </p>
                        </div>
                    </div>`;

    return Character;
};

const checkImageStatus = (status) => {
    if (status == 'Alive') {
        return `/src/images/Alive-Icon.svg`;
    } else if (status == 'Dead') {
        return '/src/images/Dead-Icon.svg';
    } else if (status == 'unknown') {
        return '/src/images/Unknow-Icon.svg';
    }
};

const capitalizeFirstLetter = (string) => {
    if (string === 'unknown') {
        return string[0].toUpperCase() + string.slice(1);
    } else {
        return string;
    }
};

const ConfirmStatus = async (
    Response,
    name,
    status,
    gender,
    ResultsContainer,
    Pagination
) => {
    switch (Response.status) {
        case 200: {
            errors = 0;
            const Data = await Response.json();
            ResultsContainer.classList.remove('results-container__error');
            GetPaginationInfo(
                Data.info,
                name,
                status,
                gender,
                ResultsContainer,
                Pagination
            );
            ShowData(Data.results, ResultsContainer);
            break;
        }
        case 404:
            errors = errors + 1;
            ErrorShow(errors);
            break;
        default:
            console.log(Response.error);
            break;
    }
};

const ErrorShow = (numOfErrors) => {
    const ResultsContainer = document.getElementById('results-container');
    const Container = document.getElementById('container');
    const ErrorContainer = SelectErrorMessage(numOfErrors);
    let Pagination = document.getElementById('pagination');

    if (Pagination) {
        Pagination.innerHTML = '';
    }

    ResultsContainer.classList.add('results-container__error');
    Container.classList.add('container__error');

    Container.innerHTML = ErrorContainer;
};

const SelectErrorMessage = (error) => {
    if (error <= 3) {
        let index = error - 1;
        return `<img src=${AnswerOfErrors[index].image} />
     <p>${AnswerOfErrors[index].phrase}</p>`;
    } else if (error > 3) {
        return `<img src=${AnswerOfErrors[-1].image} />
    <p>${AnswerOfErrors[-1].phrase}</p>`;
    }
};

const GetPaginationInfo = (
    info,
    name,
    status,
    gender,
    ResultsContainer,
    Pagination
) => {
    let lastPage = info.pages;

    let nextPage = info.next;
    let number = /[0-9]+/;
    let firstPage = 1;

    if (nextPage != null) {
        let pageNumber = nextPage.match(number);
        let result = pageNumber[0];
        nextPage = parseInt(result);
        const Pages = {
            firstPage: firstPage,
            prevPage: nextPage - 2,
            actualPage: nextPage - 1,
            nextPage: nextPage,
            lastPage: lastPage,
        };
        CreatePagination(
            Pages,
            name,
            status,
            gender,
            ResultsContainer,
            Pagination
        );
    } else if (nextPage == null) {
        let actualPage = lastPage;
        const Pages = {
            firstPage: firstPage,
            prevPage: actualPage - 1,
            actualPage: lastPage,
            nextPage: lastPage,
            lastPage: lastPage,
        };
        CreatePagination(
            Pages,
            name,
            status,
            gender,
            ResultsContainer,
            Pagination
        );
    }
};

const CreatePagination = (
    Pages,
    name,
    status,
    gender,
    ResultsContainer,
    Pagination
) => {
    let paginationContainer = document.createElement('div');
    paginationContainer.classList.add('pagination');
    Pagination.innerHTML = '';

    const PaginationItem = `
    <div id="button-first-page" class="button-change button-first-page">
                        <img src="/src/images/First-Page.svg" alt="First Page">
                    </div>
                    <div id="button-prev-page" class="button-change button-prev-page">
                        <span>${Pages.prevPage}</span>
                    </div>
                    <div id="button-actual-page" class="button-actual-page">
                        <span>${Pages.actualPage}</span>
                    </div>
                    <div id="button-next-page" class="button-change button-next-page">
                        <span>${Pages.nextPage}</span>
                    </div>
                    <div id="button-last-page" class="button-change button-last-page">
                        <img src="/src/images/Last-Page.svg" alt="Last Page">
                    </div>
    `;
    paginationContainer.insertAdjacentHTML('beforeend', PaginationItem);
    Pagination.appendChild(paginationContainer);

    CreateChangeButtons(
        name,
        status,
        gender,
        ResultsContainer,
        Pagination,
        Pages
    );
};

const CreateChangeButtons = (
    name,
    status,
    gender,
    ResultsContainer,
    Pagination,
    Pages
) => {
    let ButtonFirstPage = document.getElementById('button-first-page');
    let ButtonPrevPage = document.getElementById('button-prev-page');
    let ButtonNextPage = document.getElementById('button-next-page');
    let ButtonLastPage = document.getElementById('button-last-page');
    let ButtonActualPage = document.getElementById('button-actual-page');

    RemoveButtonsConditional(
        ButtonFirstPage,
        ButtonPrevPage,
        ButtonNextPage,
        ButtonLastPage,
        ButtonActualPage,
        Pages
    );

    ButtonFirstPage.addEventListener('click', () => {
        const index = Pages.firstPage;
        AskData(name, status, gender, index, ResultsContainer, Pagination);
        const Timer = setInterval(() => {
            GoUp(Timer);
        }, 1);
    });
    ButtonPrevPage.addEventListener('click', (e) => {
        const index = parseInt(e.target.textContent);
        AskData(name, status, gender, index, ResultsContainer, Pagination);
        const Timer = setInterval(() => {
            GoUp(Timer);
        }, 1);
    });
    ButtonNextPage.addEventListener('click', (e) => {
        const index = parseInt(e.target.textContent);
        AskData(name, status, gender, index, ResultsContainer, Pagination);
        const Timer = setInterval(() => {
            GoUp(Timer);
        }, 1);
    });
    ButtonLastPage.addEventListener('click', () => {
        const index = Pages.lastPage;
        AskData(name, status, gender, index, ResultsContainer, Pagination);
        const Timer = setInterval(() => {
            GoUp(Timer);
        }, 1);
    });
};

const GoUp = (Timer) => {
    if (window.scrollY != 0) {
        const position = window.scrollY;
        let change = window.innerWidth > 640 ? position - 30 : position - 80;
        window.scrollTo(change, change);
    } else if (window.scrollY == 0) {
        clearInterval(Timer);
    }
};

const RemoveButtonsConditional = (
    ButtonFirstPage,
    ButtonPrevPage,
    ButtonNextPage,
    ButtonLastPage,
    ButtonActualPage,
    Pages
) => {
    let ButtonFirstPageNumber = Pages.firstPage;
    let ButtonPrevPageNumber = parseInt(ButtonPrevPage.textContent);
    let ButtonNextPageNumber = parseInt(ButtonNextPage.textContent);
    let ButtonLastPageNumber = Pages.lastPage;
    let ButtonActualPageNumber = parseInt(ButtonActualPage.textContent);

    if (ButtonPrevPageNumber <= 0) {
        ButtonPrevPage.style.display = 'none';
    }

    if (ButtonNextPageNumber >= ButtonLastPageNumber) {
        ButtonLastPage.style.display = 'none';
    }

    if (ButtonNextPageNumber == ButtonActualPageNumber) {
        ButtonNextPage.style.display = 'none';
    }

    if (
        ButtonFirstPageNumber == ButtonActualPageNumber ||
        ButtonFirstPageNumber == ButtonPrevPageNumber
    ) {
        ButtonFirstPage.style.display = 'none';
    }
};
