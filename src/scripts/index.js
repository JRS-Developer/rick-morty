// Variables
const root = document.getElementById('root');
const showContentButton = document.getElementById('showContent');
// const Container = document.createElement('div');
let Content = '';

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

if (location.pathname === '/' || location.pathname === '/index.html') {
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
    if (action == 'add') {
        element.addEventListener('click', () => {
            history.pushState({}, {}, '/search/');
            ShowPage(SearchPrincipal);

            headerSearchButton.classList.add('search-button--active');

            const header = document.getElementById('header');
            const headerText = document.querySelector('.header__text');

            header.classList.add('header--scroll--active');
            headerText.classList.add('header__text--active');

            Form();
        });
    } else if (action === 'remove') {
        if (location.pathname === '/') {
            element.addEventListener('click', () => {
                history.pushState({}, {}, '/');
                ShowPage(Home);

                headerSearchButton.classList.remove('search-button--active');

                const header = document.getElementById('header');
                const headerText = document.querySelector('.header__text');

                header.classList.remove('header--scroll--active');
                headerText.classList.remove('header__text--active');
                // header.classList.remove('header--scroll');
                // headerText.classList.remove('header__text--scroll');

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
    if (location.pathname === '/') {
        ShowPage(Home);
        headerSearchButton.classList.remove('search-button--active');

        const header = document.getElementById('header');
        const headerText = document.querySelector('.header__text');

        header.classList.remove('header--scroll--active');
        headerText.classList.remove('header__text--active');
    } else if (location.search) {
        const interrogationRemoved = location.search.substring(1);
        headerSearchButton.classList.add('search-button--active');

        const header = document.getElementById('header');
        const headerText = document.querySelector('.header__text');

        header.classList.add('header--scroll--active');
        headerText.classList.add('header__text--active');
        ShowContent(interrogationRemoved);
    } else if (location.pathname === '/search/') {
        ShowPage(SearchPrincipal);
        headerSearchButton.classList.add('search-button--active');

        const header = document.getElementById('header');
        const headerText = document.querySelector('.header__text');

        header.classList.add('header--scroll--active');
        headerText.classList.add('header__text--active');
        Form();
    }
};

// * Esta es una funcion que al dar click a un boton la pagina se va hacia arriba lentamente. Solo la hice de pratica para tal vez sirva para alguna oportunidad futura.

// const searchButtons = document.querySelector('.search-button');
// searchButtons.addEventListener('click', () => {
//     const Timer = setInterval(() => {
//         GoUp(Timer);
//     }, 1);
// });

// const GoUp = (Timer) => {
//     if (window.scrollY != 0) {
//         const position = window.scrollY;
//         let change = position - 20;
//         window.scrollTo(change, change);
//     } else if (window.scrollY == 0) {
//         clearInterval(Timer);
//         console.log('listo');
//     }
// };

const Form = () => {
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
    <form>
        <input type="text" name="name" id="name" value=${name} placeholder="Search">

        <input class="status-input" type="checkbox" name="status" id="alive" value="alive">
        <label for="alive">Alive</label>
        <input class="status-input" type="checkbox" name="status" id="dead" value="dead">
        <label for="dead">Dead</label>
        <input class="status-input" type="checkbox" name="status" id="unknown" value="unknown">
        <label for="unknown">Unknown</label>

        <input class="gender-input" type="checkbox" name="gender" id="male" value="male">
        <label for="male">Male</label>
        <input class="gender-input" type="checkbox" name="gender" id="female" value="female">
        <label for="unknown">Female</label>
        <input class="gender-input" type="checkbox" name="gender" id="genderless" value="genderless">
        <label for="unknown">Genderless</label>
        <input class="gender-input" type="checkbox" name="gender" id="unknown-gender" value="unknown">
        <label for="unknown-gender">Unknown</label>

        <button type="submit" id="search-data-button">Search Data</button>
    </form>
    
    <div id="results-container">
        <div id="container"></div>
    </div>
    <div id="pagination"></div>
    `;
    } else if (!name) {
        Content = `
    <form>
        <input type="text" name="name" id="name" placeholder="Search">

        <input class="status-input" type="checkbox" name="status" id="alive" value="alive">
        <label for="alive">Alive</label>
        <input class="status-input" type="checkbox" name="status" id="dead" value="dead">
        <label for="dead">Dead</label>
        <input class="status-input" type="checkbox" name="status" id="unknown" value="unknown">
        <label for="unknown">Unknown</label>

        <input class="gender-input" type="checkbox" name="gender" id="male" value="male">
        <label for="male">Male</label>
        <input class="gender-input" type="checkbox" name="gender" id="female" value="female">
        <label for="unknown">Female</label>
        <input class="gender-input" type="checkbox" name="gender" id="genderless" value="genderless">
        <label for="unknown">Genderless</label>
        <input class="gender-input" type="checkbox" name="gender" id="unknown-gender" value="unknown">
        <label for="unknown-gender">Unknown</label>

        <button type="submit" id="search-data-button">Search Data</button>
    </form>
    
    <div id="results-container">
        <div id="container"></div>
    </div>
    <div id="pagination"></div>
    `;
    }

    root.innerHTML = Content;

    const SearchDataButton = document.getElementById('search-data-button');

    let searchName = document.getElementById('name');
    let statusInputs = document.querySelectorAll('.status-input');
    let genderInputs = document.querySelectorAll('.gender-input');
    const ResultsContainer = document.getElementById('results-container');
    const Pagination = document.getElementById('pagination');

    SearchDataButton.addEventListener('click', (event) => {
        searchData(
            event,
            statusInputs,
            genderInputs,
            searchName,
            ResultsContainer,
            Pagination
        );
    });

    searchData(
        null,
        statusInputs,
        genderInputs,
        searchName,
        ResultsContainer,
        Pagination
    );
};

const searchData = (
    event,
    statusInputs,
    genderInputs,
    searchName,
    ResultsContainer,
    Pagination
) => {
    if (event) {
        event.preventDefault();
    }
    let statusCheck = [];
    let genderCheck = [];
    if (statusInputs.length > 0) {
        IsChecked(statusInputs, statusCheck);
    }

    if (genderInputs.length > 0) {
        IsChecked(genderInputs, genderCheck);
    }

    statusCheck = statusCheck.join('&status=');
    genderCheck = genderCheck.join('&gender=');

    AskData(
        searchName.value,
        statusCheck,
        genderCheck,
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

const capitalizeFirstLetter = (string) => {
    if (string === 'unknown') {
        return string[0].toUpperCase() + string.slice(1);
    } else {
        return string;
    }
};

const ShowData = async (data, ResultsContainer) => {
    const Container = document.getElementById('container');
    console.log(Container);
    if (Container.hasChildNodes() === false) {
        Container.classList.add('container');
        data.forEach((element) => {
            const Character = CreateCharacter(element);
            Container.insertAdjacentHTML('beforeend', Character);

            ResultsContainer.append(Container);
        });
    } else if (Container.hasChildNodes() === true) {
        Container.innerHTML = '';
        data.forEach((element) => {
            const Character = CreateCharacter(element);
            Container.insertAdjacentHTML('beforeend', Character);
        });
    }
};

const CreateCharacter = (element) => {
    const Character = `
            <img src=${element.image} alt=${element.name}>
            <h3>${capitalizeFirstLetter(element.name)}</h3>
            <p>${capitalizeFirstLetter(element.status)}</p>
            <p>${capitalizeFirstLetter(element.origin.name)}</p>
            <p>${capitalizeFirstLetter(element.location.name)}</p>`;
    return Character;
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
        case 200:
            const Data = await Response.json();
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
        case 404:
            console.log('Error 404');
            break;
        default:
            console.log(Response.error);
            break;
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
        let prevPage = nextPage - 2;
        let actualPage = nextPage - 1;
        CreatePagination(
            firstPage,
            prevPage,
            actualPage,
            nextPage,
            lastPage,
            name,
            status,
            gender,
            ResultsContainer,
            Pagination
        );
    } else if (nextPage == null) {
        let actualPage = lastPage;
        let prevPage = actualPage - 1;
        nextPage = lastPage;
        CreatePagination(
            firstPage,
            prevPage,
            actualPage,
            nextPage,
            lastPage,
            name,
            status,
            gender,
            ResultsContainer,
            Pagination
        );
    }
};

const CreatePagination = (
    firstPage,
    prevPage,
    actualPage,
    nextPage,
    lastPage,
    name,
    status,
    gender,
    ResultsContainer,
    Pagination
) => {
    let paginationContainer = document.createElement('div');
    Pagination.innerHTML = '';

    const PaginationItem = `
    <div id="button-first-page">${firstPage}</div>
    <div id="button-prev-page">${prevPage}</div>
    <div id="button-actual-page">${actualPage}</div>
    <div id="button-next-page">${nextPage}</div>
    <div id="button-last-page">${lastPage}</div>
    `;
    paginationContainer.insertAdjacentHTML('beforeend', PaginationItem);
    Pagination.appendChild(paginationContainer);

    CreateChangeButtons(name, status, gender, ResultsContainer, Pagination);
};

const CreateChangeButtons = (
    name,
    status,
    gender,
    ResultsContainer,
    Pagination
) => {
    let ButtonFirstPage = document.getElementById('button-first-page');
    let ButtonPrevPage = document.getElementById('button-prev-page');
    let ButtonNextPage = document.getElementById('button-next-page');
    let ButtonLastPage = document.getElementById('button-last-page');
    let ButtonActualPage = document.getElementById('button-actual-page');

    ButtonActualPage.style.backgroundColor = 'lightblue';

    RemoveButtonsConditional(
        ButtonFirstPage,
        ButtonPrevPage,
        ButtonNextPage,
        ButtonLastPage,
        ButtonActualPage
    );

    ButtonFirstPage.addEventListener('click', (e) => {
        const index = parseInt(e.target.textContent);
        AskData(name, status, gender, index, ResultsContainer, Pagination);
    });
    ButtonPrevPage.addEventListener('click', (e) => {
        const index = parseInt(e.target.textContent);
        AskData(name, status, gender, index, ResultsContainer, Pagination);
    });
    ButtonNextPage.addEventListener('click', (e) => {
        const index = parseInt(e.target.textContent);
        AskData(name, status, gender, index, ResultsContainer, Pagination);
    });
    ButtonLastPage.addEventListener('click', (e) => {
        const index = parseInt(e.target.textContent);
        AskData(name, status, gender, index, ResultsContainer, Pagination);
    });
};

const RemoveButtonsConditional = (
    ButtonFirstPage,
    ButtonPrevPage,
    ButtonNextPage,
    ButtonLastPage,
    ButtonActualPage
) => {
    let ButtonFirstPageNumber = parseInt(ButtonFirstPage.textContent);
    let ButtonPrevPageNumber = parseInt(ButtonPrevPage.textContent);
    let ButtonNextPageNumber = parseInt(ButtonNextPage.textContent);
    let ButtonLastPageNumber = parseInt(ButtonLastPage.textContent);
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
