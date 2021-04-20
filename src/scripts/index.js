// Variables

const ResultsContainer = document.getElementById('results-container');
const Pagination = document.getElementById('pagination');
let searchName = document.getElementById('name');
let statusInputs = document.querySelectorAll('.status-input');
let genderInputs = document.querySelectorAll('.gender-input');
const Container = document.createElement('div');
// Funciones

const searchData = (event) => {
    event.preventDefault();
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

    AskData(searchName.value, statusCheck, genderCheck);
};

const IsChecked = (check, array) => {
    check.forEach((status) => {
        if (status.checked) {
            array.push(status.value);
        }
    });
};

const AskData = async (name, status, gender, index) => {
    let Response = await fetch(
        `https://rickandmortyapi.com/api/character/?page=${index}&name=${name}&status=${status}&gender=${gender}`
    );
    ConfirmStatus(Response, name, status, gender);
};

const capitalizeFirstLetter = (string) => {
    if (string === 'unknown') {
        return string[0].toUpperCase() + string.slice(1);
    } else {
        return string;
    }
};

const ShowData = async (data) => {
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

const ConfirmStatus = async (Response, name, status, gender) => {
    switch (Response.status) {
        case 200:
            const Data = await Response.json();
            GetPaginationInfo(Data.info, name, status, gender);
            ShowData(Data.results);
            break;
        case 404:
            console.log('Error 404');
            break;
        default:
            console.log(Response.error);
            break;
    }
};

const GetPaginationInfo = (info, name, status, gender) => {
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
            gender
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
            gender
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
    gender
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

    CreateChangeButtons(name, status, gender);
};

const CreateChangeButtons = (name, status, gender) => {
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
        ChangePagination(name, status, gender, index);
    });
    ButtonPrevPage.addEventListener('click', (e) => {
        const index = parseInt(e.target.textContent);
        ChangePagination(name, status, gender, index);
    });
    ButtonNextPage.addEventListener('click', (e) => {
        const index = parseInt(e.target.textContent);
        ChangePagination(name, status, gender, index);
    });
    ButtonLastPage.addEventListener('click', (e) => {
        const index = parseInt(e.target.textContent);
        ChangePagination(name, status, gender, index);
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

const ChangePagination = (name, status, gender, index) => {
    AskData(name, status, gender, index);
};
