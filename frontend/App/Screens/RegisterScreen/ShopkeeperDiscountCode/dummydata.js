export const discountCodesData = [
    {
        id: 1,
        code: 'CODE1',
        description: '10% off on all products',
        active: true,
    },
    {
        id: 2,
        code: 'CODE2',
        description: 'Free shipping on orders above $50 Free shipping on orders above $50 Free shipping on orders above $50 Free shipping on orders above $50',
        active: true,
    },
    {
        id: 3,
        code: 'CODE3',
        description: '$20 off on orders over $100',
        active: false,
    },
    {
        id: 4,
        code: 'CODE4',
        description: 'Buy one get one free on selected items',
        active: true,
    },
    {
        id: 5,
        code: 'CODE5',
        description: '15% off on electronics',
        active: false,
    },
    // Add more discount codes as needed
];

export const activeDiscountCodes = discountCodesData.filter(code => code.active);

export const inactiveDiscountCodes = discountCodesData.filter(code => !code.active);
