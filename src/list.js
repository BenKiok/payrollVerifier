const list = (() => {
    const list = document.createElement('div'),
          h2 = document.createElement('h2'),
          ul = document.createElement('ul'),
          button = document.createElement('button');
    
    list.id = 'list';
    h2.innerText = 'Shifts';
    button.id = 'submit';
    button.innerText = 'Calculate Pay';

    list.append(h2, ul, button);

    return list;
})();

export default list;