export const paymentModeData = [
    // Payment data for Today
    {
        id: 1,
        mode: 'Cash',
        amount: 500,
        reference: 2323423423,
        date: new Date(), // Today's date
    },
    {
        id: 2,
        mode: 'Credit Card',
        amount: 1000,
        reference: 2323423423,
        date: new Date(), // Today's date
    },
    // Add more payment modes for Today as needed

    // Payment data for Yesterday
    {
        id: 3,
        mode: 'Debit Card',
        amount: 750,
        reference: 2323423423,
        date: new Date(Date.now() - 86400000), // Subtract 1 day from current date
    },
    // Add more payment modes for Yesterday as needed

    // Payment data for One Week
    {
        id: 4,
        mode: 'UPI',
        amount: 1200,
        reference: 2323423423,
        date: new Date(Date.now() - 7 * 86400000), // Subtract 7 days from current date
    },
    // Add more payment modes for One Week as needed

    // Payment data for 30 Days
    {
        id: 5,
        mode: 'Wallet',
        amount: 300,
        reference: 2323423423,
        date: new Date(Date.now() - 30 * 86400000), // Subtract 30 days from current date
    },
    // Add more payment modes for 30 Days as needed

    // Payment data for All Time (example)
    {
        id: 6,
        mode: 'Net Banking',
        amount: 2000,
        reference: 2323423423,
        date: new Date('2022-01-01'), // Example: Set a specific date for all-time data
    },
    // Add more payment modes for All Time as needed

    // Payment data for Select Date Range (example)
    {
        id: 7,
        mode: 'Gift Card',
        amount: 1500,
        reference: 2323423423,
        date: new Date('2023-05-15'), // Example: Set a specific date for select date range data
    },
    // Add more payment modes for Select Date Range as needed
];
