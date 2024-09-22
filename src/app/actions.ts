'use server';

export async function getItems() {
  return [
    {
      id: '1',
      name: 'Apple',
      type: 'Fruit',
      quantity: 5,
    },
    {
      id: '2',
      name: 'Apple',
      type: 'Fruit',
      quantity: 5,
    },
    {
      id: '3',
      name: 'Apple',
      type: 'Fruit',
      quantity: 5,
    },
    {
      id: '4',
      name: 'Apple',
      type: 'Fruit',
      quantity: 5,
    },
  ];
}

export async function addItem(formData: FormData) {
  const name = formData.get('name');
  const expirationDate = formData.get('expirationDate');
  const type = formData.get('type');

  console.log('Adding item', { name, expirationDate, type });
}
