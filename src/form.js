const form = (() => {
    const form = document.createElement('div'),
          h1 = document.createElement('h1'),
          h2 = document.createElement('h2'),
          h3 = document.createElement('h3'),
          section = document.createElement('section'),
          inputHr = document.createElement('input'),
          inputMin = document.createElement('input'),
          inputStartTime = document.createElement('select'),
          inputEndTime = document.createElement('select'),
          optionDefault = document.createElement('option'),
          optionAM = document.createElement('option'),
          optionPM = document.createElement('option'),
          button = document.createElement('button');
    
    form.id = 'form';
    h1.innerText = 'Check that paycheck...';
    h2.innerText = 'What time did you work?';
    h3.innerText = 'to';

    inputHr.type = 'number';
    inputHr.min = '1';
    inputHr.max = '12';
    inputMin.type = 'number';
    inputMin.min = '00';
    inputMin.max = '59';

    inputStartTime.id = 'start';
    inputEndTime.id = 'end';

    optionDefault.value = '';
    optionDefault.innerText = '--';
    optionAM.value = 'AM';
    optionAM.innerText = 'AM';
    optionPM.value = 'PM';
    optionPM.innerText = 'PM';

    button.id = 'add';
    button.innerText = 'Add Shift';

    inputStartTime.append(optionDefault, optionAM, optionPM);
    inputEndTime.append(optionDefault.cloneNode(true), optionAM.cloneNode(true), optionPM.cloneNode(true));
    section.append(inputHr, inputMin, inputStartTime, h3, inputHr.cloneNode(), inputMin.cloneNode(), inputEndTime, button);
    form.append(h1, h2, section);

    return form;
})();

export default form;