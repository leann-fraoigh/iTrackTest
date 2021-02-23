/* 1. Factorial */
let getFactorial = (n) => (n === 1) ? 1 : (n * getFactorial(n - 1));

console.log (getFactorial(5));

/* 2. Initializers */

var arrayData = {}; // Создает объект
var arrayData = []; // Создает массив


/* 3. JQuery -> JS + XMLHttpRequest*/

const setElAction = () => {
  const element = document.querySelector('.popup_open');
  const inner = document.querySelector('.popup_inner');

  const updateEl = (data) => {
    element.classList.add('open');
    inner.classList.add('open');
    inner.textContent = data.text;
    const header = document.createElement('h1');
    header.textContent = data.title;
    inner.before(header);
  }

  const onElClick = () => {
    const data = 'url=' + document.getElementById('url').value;
    const form =  document.getElementById('url').closest('form');

    const xhr = new XMLHttpRequest();
    xhr.open('POST', form.action);
    xhr.responseType = 'json';
    xhr.send(data);
    xhr.onload = function() {
      if (xhr.status == 200) {
        updateEl(xhr.response);
      }
    };
  }

  element.addEventListener('click', onElClick);
};  

/* 4. Get page params */

let pageParams = {};

const updateParams =  (pageUrl) => {
  let pageHref  = pageUrl ? pageUrl : window.location.href;
  let pagePath = pageUrl ? pageHref.split('itrack.ru')[1] : window.location.pathname;

  pageParams.pageDirect = pageHref.indexOf('website')?'website':'crm';

  if ( pageHref.indexOf('filter') !== -1) {
    pageParams.pageType = 'filter';
    pageParams.pageFilterParam = pagePath.split("/filter/").pop().split('/apply/').shift();
  } else if (pageHref.indexOf('PAGEN_1') !== -1) {
    pageParams.pageType = 'nextPage';
  } else if (pagePath.split('/').length === 3) {
    pageParams.pageType = 'project';
    pageParams.pageProject = pagePath.split('/')[3];
  } else {
    pageParams.pageType = 'index';
  }

  return(pageParams);
}

window.addEventListener('load', () => {
  updateParams();
});


// Add custom events

history.pushState = ( f => function pushState() {
  var ret = f.apply(this, arguments);
  window.dispatchEvent(new Event('pushstate'));
  window.dispatchEvent(new Event('locationchange'));
  return ret;
})(history.pushState);

history.replaceState = ( f => function replaceState() {
  var ret = f.apply(this, arguments);
  window.dispatchEvent(new Event('replacestate'));
  window.dispatchEvent(new Event('locationchange'));
  return ret;
})(history.replaceState);

window.addEventListener('popstate',()=>{
  window.dispatchEvent(new Event('locationchange'))
});

window.addEventListener('locationchange', function () {
  updateParams();
});

console.log(updateParams());
console.log(updateParams('https://itrack.ru/portfolio/website/filter/project_type-is-korporativnyy_sayt/apply/'));


/* 5. Range */

const input = document.querySelector('#range');

const updateRangeOutput = () => {
  const output = document.querySelector('.range__output');
  output.textContent = input.value;
}

input.addEventListener('input', updateRangeOutput);


/* 6. Inheritance */

class Furniture {
  constructor (id, name, material) {
    this.id = id;
    this.name = name;
    this.material = material;
  }
}

class Table extends Furniture {
  constructor (id, name, material, numberOfLegs, type) {
    super(id, name, material);
    this.numberOfLegs = numberOfLegs;
    this.type = type;
  }

  getDescription() {
    return `Amazing ${this.type} "${this.name}" made of ${this.material}`
  }
}

let myTable = new Table('1', 'Nordviken', 'wood', 4, 'desk');

console.log(myTable.getDescription());
console.log(myTable.id);
