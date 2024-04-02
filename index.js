#! /usr/bin/env node
// this is inquirer for getting input from user
import inquirer from "inquirer";
// here we mention the name of targeted bank
console.log("----------------------------------------------------------------");
console.log("                 Welcome to Meezan Bank                         ");
console.log("----------------------------------------------------------------");
//User Data
const pinCode = 4564;
const currectBalance = 50000;
// This variable is for login witn pin code
const loginWithPin = await inquirer.prompt([
    {
        name: "pin",
        type: "number",
        message: "Please enter your 4 digits PIN code",
    },
]);
/* condition apply: if pin code is correct it will show you
wecome to meezan bank services */
if (loginWithPin.pin === pinCode) {
    console.log("----------------------------------------------------------------");
    console.log("               Welcome to Meezan Bank Services                  ");
    console.log("----------------------------------------------------------------");
    // prompt Start here to get data from user
    const Services = await inquirer.prompt([
        {
            name: "accountType",
            type: "list",
            message: "Please select your account",
            choices: ["Assan Account", "Currect Account"],
        },
        {
            name: "transactionsType",
            type: "list",
            message: "Please select a transaction",
            choices: [
                "Fast Cash",
                "Cash Withdrawal",
                "Funds Transfer",
                "Balance Inquiry",
            ],
            when(Services) {
                return Services.accountType;
            },
        },
        {
            name: "fastCash",
            type: "list",
            message: "Please select your amount",
            choices: [5000, 10000, 15000, 20000],
            when(Services) {
                return Services.transactionsType === "Fast Cash";
            },
        },
        {
            name: "cashWithdrawal",
            type: "input",
            message: "Please enter amount Rs.500 to Rs.50,000",
            when(Services) {
                return Services.transactionsType === "Cash Withdrawal";
            },
        },
        {
            name: "selectbank",
            type: "list",
            message: "Please select bank by name ",
            choices: [
                "1. Al Baraka Bank (Pakistan) Limited",
                "2. Allied Bank Limited (ABL)",
                "3. Askari Bank",
                "4. Bank Alfalah Limited (BAFL)",
                "5. Bank Al-Habib Limited (BAHL)",
                "6. BankIslami Pakistan Limited",
                "7. Bank Makramah Limited (BML)",
                "8. Bank of Punjab (BOP)",
                "9. Bank of Khyber",
                "10. Deutsche Bank A.G",
                "11. Dubai Islamic Bank Pakistan Limited (DIB Pakistan)",
                "12. Faysal Bank Limited (FBL)",
                "13. First Women Bank Limited",
                "14. Habib Bank Limited (HBL)",
                "15. Habib Metropolitan Bank Limited",
                "16. Industrial and Commercial Bank of China",
                "17. EasyPaisa mobile bank",
                "18. JS Bank Limited",
                "19. MCB Bank Limited",
                "20. MCB Islamic Bank Limited",
                "21. Meezan Bank Limited",
                "22. National Bank of Pakistan (NBP)",
                "23. Soneri Bank Limited",
                "24. Standard Chartered Bank (Pakistan) Limited (SC Pakistan)",
                "25. Sindh Bank",
            ],
            when(Services) {
                return Services.transactionsType === "Funds Transfer";
            },
        },
        {
            name: "fundsTransferType",
            type: "list",
            message: "Please select account or IBAN ",
            choices: ["Account", "IBAN"],
            when(Services) {
                return Services.transactionsType === "Funds Transfer";
            },
        },
        {
            name: "fundsTransferwithaccount",
            type: "input",
            message: "Please enter account",
            when(Services) {
                return Services.fundsTransferType === "Account";
            },
        },
        {
            name: "fundsTransferamount",
            type: "input",
            message: "Please enter transfer amount",
            when(Services) {
                return Services.fundsTransferType === "Account";
            },
        },
        {
            name: "fundsTransferwithIBAN",
            type: "input",
            message: "Please enter IBAN ",
            when(Services) {
                return Services.fundsTransferType === "IBAN";
            },
        },
        {
            name: "fundsTransferamountI",
            type: "input",
            message: "Please enter transfer amount",
            when(Services) {
                return Services.fundsTransferType === "IBAN";
            },
        },
    ]);
    // Fast Cash - Start Conditions
    if (Services.transactionsType === "Fast Cash") {
        if (currectBalance < Services.fastCash) {
            console.log("----------------------------------------------------------------");
            console.log("---------------X------ Insufficient Balance ------X--------------");
            console.log("----------------------------------------------------------------");
            console.log("Your current balance is ", currectBalance);
            console.log("Please try again");
        }
        else {
            console.log("----------------------------------------------------------------");
            console.log("Your selected amount is", Services.fastCash);
            console.log("----------------------------------------------------------------");
            console.log("Your remaining balance is ", currectBalance - Services.fastCash);
            console.log("----------------------------------------------------------------");
            console.log("Amount has been successfully withdrawn.");
            console.log("----------------------------------------------------------------");
            console.log("Thanks for using Meezan Bank ATM");
        }
        // Fast Cash - End Conditions
        // Cash Withdrawal - Start conditions
    }
    else if (Services.transactionsType === "Cash Withdrawal") {
        if (currectBalance < Services.cashWithdrawal) {
            console.log("----------------------------------------------------------------");
            console.log("---------------X------ Insufficient Balance ------X--------------");
            console.log("----------------------------------------------------------------");
            console.log("Your current balance is ", currectBalance);
            console.log("Please try again");
        }
        else {
            console.log("----------------------------------------------------------------");
            console.log("Your entered amount is", Services.cashWithdrawal);
            console.log("----------------------------------------------------------------");
            console.log("Your remaining balance is ", currectBalance - Services.cashWithdrawal);
            console.log("----------------------------------------------------------------");
            console.log("Amount has been successfully withdrawn.");
            console.log("----------------------------------------------------------------");
            console.log("Thanks for using Meezan Bank ATM");
        }
        // Cash Withdrawal - End conditions
        // Funds Transfer - Account - Start Conditions
    }
    else if (Services.fundsTransferType === "Account") {
        let accountNumber = Services.fundsTransferwithaccount;
        let requiredLength = 14; // required length
        let fundsTransferAmount = parseFloat(Services.fundsTransferamount); // Convert input to a number
        if (!accountNumber || accountNumber.length !== requiredLength) {
            console.log("----------------------------------------------------------------");
            console.log(`Account number must be ${requiredLength} digits long.`);
            console.log("----------------------------------------------------------------");
        }
        else if (fundsTransferAmount > currectBalance) {
            console.log("----------------------------------------------------------------");
            console.log("Insufficient balance. Please enter a valid amount");
            console.log("Your current balance is", currectBalance);
            console.log("----------------------------------------------------------------");
        }
        else {
            console.log("----------------------------------------------------------------");
            console.log("Your entered account number is", accountNumber);
            console.log("Processing account transfer...");
            console.log("----------------------------------------------------------------");
            console.log(`Successfully! You have transferred ${fundsTransferAmount} to ${accountNumber}.`);
            console.log("----------------------------------------------------------------");
            console.log("Thanks for using Meezan Bank ATM.");
        }
        // Funds Transfer - Account - End Conditions
        // Funds Transfer - IBAN - Start Conditions
    }
    else if (Services.fundsTransferType === "IBAN") {
        let ibanNumber = Services.fundsTransferwithIBAN;
        let requiredLength1 = 24; // required length
        let fundsTransferamountI = parseFloat(Services.fundsTransferamountI); // Convert input to a number
        if (!ibanNumber || ibanNumber.length !== requiredLength1) {
            console.log("----------------------------------------------------------------");
            console.log(`Account number must be ${requiredLength1} digits long.`);
            console.log("----------------------------------------------------------------");
        }
        else if (fundsTransferamountI > currectBalance) {
            console.log("----------------------------------------------------------------");
            console.log("Insufficient balance. Please enter a valid amount");
            console.log("Your current balance is", currectBalance);
            console.log("----------------------------------------------------------------");
        }
        else {
            console.log("----------------------------------------------------------------");
            console.log("Your entered IBAN number is", ibanNumber);
            console.log("Processing IBAN transfer...");
            console.log("----------------------------------------------------------------");
            console.log(`Successfully! You have transferred ${fundsTransferamountI} to ${ibanNumber}.`);
            console.log("----------------------------------------------------------------");
            console.log("Thanks for using Meezan Bank ATM.");
        }
        // Funds Transfer - IBAN - End Conditions
    }
    // Balance Inquiry - Start Conditions
    else if (Services.transactionsType === "Balance Inquiry") {
        console.log("----------------------------------------------------------------");
        console.log("Your current balance is", currectBalance);
        console.log("----------------------------------------------------------------");
        console.log("Thanks for using Meezan Bank ATM.");
    }
}
// Balance Inquiry - End Conditions
// if pin code is not correct it will show you the below consols
else {
    console.log("This is not correct pin");
    console.log("Please enter correct pin");
}
