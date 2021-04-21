// Variables
const root = document.getElementById('root');
const showContentButton = document.getElementById('showContent');
const Container = document.createElement('div');
// Funciones

showContentButton.addEventListener('click', () => {
    Form();
});

const Form = () => {
    const FormContent = `
    <form>
        <input type="text" name="name" id="name-search">
        <button type="submit" id="search-principal">Buscar de una vez</button>
    </form>
    `;
    root.innerHTML = FormContent;
    const SearchPrincipal = document.getElementById('search-principal');
    const Name = document.getElementById('name-search');
    SearchPrincipal.addEventListener('click', () => {
        ShowContent(Name.value);
    });
};

const ShowContent = (name) => {
    let Content = '';
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
    
    <div id="results-container"></div>
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
    
    <div id="results-container"></div>
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
