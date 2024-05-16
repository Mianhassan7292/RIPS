const departmentDataa = [
  {
    id: 1,
    departmentName: "Computer Science",
    issuedProducts: 16,
    price: 10600,
    products: [
      {
        id: 1,
        name: "Dictionary",
        type: "books",
        quantity: 6,
        totalPrice: 600,
      },
      {
        id: 2,
        name: "Laptop",
        type: "electronics",
        quantity: 10,
        totalPrice: 10000,
      },
    ],
  },
  {
    id: 2,
    departmentName: "Electrical Engineering",
    issuedProducts: 8,
    price: 800,
    products: [
      {
        id: 3,
        name: "Multimeter",
        type: "electronics",
        quantity: 3,
        totalPrice: 300,
      },
      {
        id: 4,
        name: "Soldering Iron",
        type: "electronics",
        quantity: 5,
        totalPrice: 500,
      },
    ],
  },
  {
    id: 3,
    departmentName: "Automotive Engineering",
    issuedProducts: 20,
    price: 800,
    products: [
      {
        id: 5,
        name: "Engine Oil",
        type: "maintenance",
        quantity: 20,
        totalPrice: 200,
      },
    ],
  },
  {
    id: 4,
    departmentName: "Mechanical Engineering",
    issuedProducts: 0,
    price: 0,
    products: [],
  },
];

export default departmentDataa;
