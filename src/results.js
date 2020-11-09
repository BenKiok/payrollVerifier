const results = (() => {
    const results = document.createElement('div'),
          title = document.createElement('h1'),
          hoursWorked = document.createElement('h2'),
          totalPay = document.createElement('h2'),
          taxesTitle = document.createElement('h2'),
          taxesDetails = document.createElement('h3'),
          taxesUl = document.createElement('ul'),
          netPay = document.createElement('h2'),
          button = document.createElement('button');
    let taxText = [
        'Federal Withholding:',
        'Medicare:',
        'Social Security:',
        'MA State Withholding:',
        'Medical Leave:',
        'Family Leave:'
    ]
    results.id = 'results';

    title.innerText = 'Payroll Summary';
    hoursWorked.innerText = 'Total hours worked:';
    totalPay.innerText = 'Total pay:';
    taxesTitle.innerText = 'Taxes';
    
    for (let i = 0; i < 6; i++) {
        const li = document.createElement('li');
        li.innerText = taxText[i];
        taxesUl.appendChild(li);
    }

    taxesDetails.innerText = 'Total taxes paid:';

    netPay.innerText = 'Net pay:';

    button.id = 'startOver';
    button.innerText = 'Start Over';

    results.append(title, hoursWorked, totalPay, taxesTitle, taxesUl, taxesDetails, netPay, button);

    return results;
})();

export default results;