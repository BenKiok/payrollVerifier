const calculate = (() => {
    const shift = (arr1, arr2) => {
        let time1 = Number(arr1[0]) * 60 + Number(arr1[1]),
            time2 = Number(arr2[0]) * 60 + Number(arr2[1]);

        time1 = (arr1[2] === 'PM' ? time1 + 720 : time1);
        time2 = (arr2[2] === 'PM' ? time2 + 720 : time2);

        return (time2 - time1) / 60;
    }

    const wage = (hrs, pay) => {
        return hrs * pay;
    }

    const tax = (() => {
        const fed = (wage) => {
            return wage * 0.03375;
        }
        const medicare = (wage) => {
            return wage * 0.0145;
        }
        const socialSecurity = (wage) => {
            return wage *0.062;
        }
        const state = (wage) => {
            return wage * 0.04616667;
        }
        const medLeave = (wage) => {
            return wage * 0.00248;
        }
        const famLeave = (wage) => {
            return wage * 0.0013;
        }

        return { fed, medicare, socialSecurity, state, medLeave, famLeave };
    })();

    const netPay = (wage) => {
        let net = wage;

        net -= tax.fed(wage);
        net -= tax.medicare(wage);
        net -= tax.socialSecurity(wage);
        net -= tax.state(wage);
        net -= tax.medLeave(wage);
        net -= tax.famLeave(wage);

        return net;
    }

    return { shift, wage, tax, netPay };
})();

export default calculate;