import calculate from './calculate.js';
import form from './form.js';
import list from './list.js';
import loading from './loading.js';
import results from './results.js';

const app = document.querySelector('#app'),
      payroll = {
          shifts: [],
          totalHrs: 0,
          payrate: 18.00,
          totalPay: 0,
          netPay: 0,
          taxes: {
              federal: 0,
              medicare: 0,
              socialSecurity: 0,
              state: 0,
              medLeave: 0,
              famLeave: 0,
              total: 0
          }
      },
      eventListenerExists = { forSubmit: false, forStartOver: false };

app.append(form);

document.querySelectorAll('input')[1].addEventListener('input', function() {
    let newVal = '';

    if (!isNaN(this.value) && this.value.length <= 1) {
        this.value = '0' + this.value;
    } else {
        while (this.value[0] === '0') {
            for (let i = 1; i < this.value.length; i++) {
                newVal += this.value[i];
            }
            this.value = newVal;
            newVal = '';
        }
    }

    if (Number(this.value) > 59) {
        this.value = 59;
    }
});
document.querySelectorAll('input')[3].addEventListener('input', function() {
    let newVal = '';

    if (!isNaN(this.value) && this.value.length <= 1) {
        this.value = '0' + this.value;
    } else {
        while (this.value[0] === '0') {
            for (let i = 1; i < this.value.length; i++) {
                newVal += this.value[i];
            }
            this.value = newVal;
            newVal = '';
        }
    }

    if (Number(this.value) > 59) {
        this.value = 59;
    }
});

document.querySelector('#add').addEventListener('click', () => {
    const section = form.querySelector('section');
    let startTime = [],
        endTime = [],
        shift = 0,
        allInputsFilled = true;
    
    for (let i = 0; i < section.childNodes.length; i++) {
        if (i !== 3 && i !== 7)
        if (!section.childNodes[i].value) {
            allInputsFilled = false;
        }
    }
    
    if (!allInputsFilled) {
        alert('Please fill out all blank spaces.');
    } else {
        startTime[0] = section.childNodes[0].value;
        startTime[1] = section.childNodes[1].value;
        startTime[2] = section.childNodes[2].value;

        endTime[0] = section.childNodes[4].value;
        endTime[1] = section.childNodes[5].value;
        endTime[2] = section.childNodes[6].value;

        
        shift = calculate.shift(startTime, endTime);
        shift = (shift < 0 ? shift + 24 : shift);

        if (!document.querySelector('#list')) {
            app.appendChild(list);

            if (!eventListenerExists.forSubmit) {
                document.querySelector('#submit').addEventListener('click', () => {
                    let intervalID;
                
                    form.remove();
                    list.remove();
                    app.appendChild(loading);
                
                    intervalID = setInterval(() => {
                        if (loading.innerText.length < 10) {
                            loading.innerText += '.';
                        } else {
                            loading.innerText = 'Loading';
                        }
                    }, 600);
                
                    payroll.shifts.forEach((shift) => {
                        payroll.totalHrs += shift;
                    });
                    payroll.totalHrs = payroll.totalHrs.toFixed(2);
                
                    payroll.totalPay = calculate.wage(payroll.totalHrs, payroll.payrate).toFixed(2);
                    payroll.taxes.federal = calculate.tax.fed(payroll.totalPay).toFixed(2);
                    payroll.taxes.medicare = calculate.tax.medicare(payroll.totalPay).toFixed(2);
                    payroll.taxes.socialSecurity = calculate.tax.socialSecurity(payroll.totalPay).toFixed(2);
                    payroll.taxes.state = calculate.tax.state(payroll.totalPay).toFixed(2);
                    payroll.taxes.medLeave = calculate.tax.medLeave(payroll.totalPay).toFixed(2);
                    payroll.taxes.famLeave = calculate.tax.famLeave(payroll.totalPay).toFixed(2);
                
                    payroll.taxes.total = Number(payroll.taxes.federal) +
                                        Number(payroll.taxes.medicare) +
                                        Number(payroll.taxes.socialSecurity) +
                                        Number(payroll.taxes.state) +
                                        Number(payroll.taxes.medLeave) +
                                        Number(payroll.taxes.famLeave);
                    payroll.taxes.total = payroll.taxes.total.toFixed(2);
                
                    payroll.netPay = (payroll.totalPay - payroll.taxes.total).toFixed(2);
                
                    results.childNodes[1].innerText += ` ${payroll.totalHrs}`;
                    results.childNodes[2].innerText += ` $${payroll.totalPay}`;
                    results.childNodes[4].childNodes[0].innerText += ` $${payroll.taxes.federal}`;
                    results.childNodes[4].childNodes[1].innerText += ` $${payroll.taxes.medicare}`;
                    results.childNodes[4].childNodes[2].innerText += ` $${payroll.taxes.socialSecurity}`;
                    results.childNodes[4].childNodes[3].innerText += ` $${payroll.taxes.state}`;
                    results.childNodes[4].childNodes[4].innerText += ` $${payroll.taxes.medLeave}`;
                    results.childNodes[4].childNodes[5].innerText += ` $${payroll.taxes.famLeave}`;
                    results.childNodes[5].innerText += ` $${payroll.taxes.total}`;
                    results.childNodes[6].innerText += ` $${payroll.netPay}`;
                
                    setTimeout(() => {
                        clearInterval(intervalID);
                        loading.remove();
                        app.append(results);
                        
                        if (!eventListenerExists.forStartOver) {
                            document.querySelector('#startOver').addEventListener('click', () => {
                                payroll.shifts = [];
                                payroll.totalHrs = 0;
                                payroll.totalPay = 0;
                                payroll.netPay = 0;
                                payroll.taxes.federal = 0;
                                payroll.taxes.medicare = 0;
                                payroll.taxes.socialSecurity = 0;
                                payroll.taxes.state = 0;
                                payroll.taxes.medLeave = 0;
                                payroll.taxes.famLeave = 0;

                                results.childNodes[1].innerText = 'Total hours worked:';
                                results.childNodes[2].innerText = 'Total pay:';
                                results.childNodes[4].childNodes[0].innerText = 'Federal Withholding:';
                                results.childNodes[4].childNodes[1].innerText = 'Medicare:';
                                results.childNodes[4].childNodes[2].innerText = 'Social Security:';
                                results.childNodes[4].childNodes[3].innerText = 'MA State Withholding:';
                                results.childNodes[4].childNodes[4].innerText = 'Medical Leave:';
                                results.childNodes[4].childNodes[5].innerText = 'Family Leave:';
                                results.childNodes[5].innerText = 'Total taxes paid:';
                                results.childNodes[6].innerText = 'Net pay:';

                                results.remove();

                                Array.from(list.querySelector('ul').childNodes).forEach((li) => {
                                    li.remove();
                                });

                                app.appendChild(form);
                            });

                            eventListenerExists.forStartOver = true;
                        }
                    }, 3000);
                });

                eventListenerExists.forSubmit = true;
            }
        }

        const li = document.createElement('li');
        li.innerText = `${startTime[0]}:${startTime[1]} ${startTime[2]} to ${endTime[0]}:${endTime[1]} ${endTime[2]}`;

        li.addEventListener('click', () => {
            if (confirm('Do you want to remove this shift from the list?')) {
                payroll.shifts.splice(
                    Array.from(document.querySelector('#list ul').childNodes).indexOf(li),
                    1
                );

                li.remove();

                if (!document.querySelector('#list ul').childNodes.length) {
                    list.remove();
                }
            }
        });

        document.querySelector('#list ul').appendChild(li);
        payroll.shifts.push(shift);

        for (let i = 0; i < section.childNodes.length; i++) {
            if (i !== 3 && i !== 7) {
                section.childNodes[i].value = '';
            }
        }
    }
});