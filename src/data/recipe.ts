import { Recipe } from '@/lib/types/misc/recipe.interface';

const recipes: Recipe[] = [
  {
    id: 1,
    name: 'Spaghetti Carbonara',
    description: 'A classic and delicious dish perfect for any occasion.',
    img_url: 'https://via.placeholder.com/300?text=Spaghetti+Carbonara',
    ingredients: [
      {
        id: 1,
        name: 'Spaghetti',
        quantity: 200,
        unit: 'g',
        img_url: 'https://via.placeholder.com/150?text=Spaghetti',
      },
      {
        id: 2,
        name: 'Eggs',
        quantity: 3,
        unit: 'piece',
        img_url: 'https://via.placeholder.com/150?text=Eggs',
      },
      {
        id: 3,
        name: 'Parmesan',
        quantity: 50,
        unit: 'g',
        img_url: 'https://via.placeholder.com/150?text=Parmesan',
      },
      {
        id: 4,
        name: 'Bacon',
        quantity: 100,
        unit: 'g',
        img_url: 'https://via.placeholder.com/150?text=Bacon',
      },
      {
        id: 5,
        name: 'Salt',
        quantity: 1,
        unit: 'tsp',
        img_url: 'https://via.placeholder.com/150?text=Salt',
      },
    ],
    steps: [
      'Boil spaghetti until al dente.',
      'Cook bacon in a pan until crispy.',
      'Mix eggs and Parmesan in a bowl.',
      'Combine everything with the cooked spaghetti.',
      'Serve immediately.',
    ],
    timeInMinutes: 30,
  },
  {
    id: 2,
    name: 'Tomato Basil Soup',
    description: 'Rich and hearty flavors to warm you up.',
    img_url: 'https://via.placeholder.com/300?text=Tomato+Basil+Soup',
    ingredients: [
      {
        id: 6,
        name: 'Tomatoes',
        quantity: 5,
        unit: 'piece',
        img_url: 'https://via.placeholder.com/150?text=Tomatoes',
      },
      {
        id: 7,
        name: 'Basil',
        quantity: 10,
        unit: 'leaves',
        img_url: 'https://via.placeholder.com/150?text=Basil',
      },
      {
        id: 8,
        name: 'Garlic',
        quantity: 3,
        unit: 'cloves',
        img_url: 'https://via.placeholder.com/150?text=Garlic',
      },
      {
        id: 9,
        name: 'Onion',
        quantity: 1,
        unit: 'piece',
        img_url: 'https://via.placeholder.com/150?text=Onion',
      },
      {
        id: 10,
        name: 'Olive Oil',
        quantity: 2,
        unit: 'tbsp',
        img_url: 'https://via.placeholder.com/150?text=Olive+Oil',
      },
    ],
    steps: [
      'Sauté garlic and onion in olive oil.',
      'Add chopped tomatoes and cook until soft.',
      'Blend the mixture until smooth.',
      'Add basil leaves and simmer for 10 minutes.',
      'Serve hot with bread.',
    ],
    timeInMinutes: 25,
  },
  {
    id: 3,
    name: 'Mushroom Risotto',
    description: 'A savory meal that will leave everyone satisfied.',
    img_url: 'https://via.placeholder.com/300?text=Mushroom+Risotto',
    ingredients: [
      {
        id: 11,
        name: 'Rice',
        quantity: 300,
        unit: 'g',
        img_url: 'https://via.placeholder.com/150?text=Rice',
      },
      {
        id: 12,
        name: 'Mushrooms',
        quantity: 200,
        unit: 'g',
        img_url: 'https://via.placeholder.com/150?text=Mushrooms',
      },
      {
        id: 13,
        name: 'Chicken Broth',
        quantity: 1,
        unit: 'L',
        img_url: 'https://via.placeholder.com/150?text=Chicken+Broth',
      },
      {
        id: 14,
        name: 'Parmesan',
        quantity: 50,
        unit: 'g',
        img_url: 'https://via.placeholder.com/150?text=Parmesan',
      },
      {
        id: 15,
        name: 'Butter',
        quantity: 2,
        unit: 'tbsp',
        img_url: 'https://via.placeholder.com/150?text=Butter',
      },
    ],
    steps: [
      'Sauté mushrooms in butter until golden brown.',
      'Add rice and stir until coated.',
      'Gradually add chicken broth, stirring frequently.',
      'Cook until rice is creamy and tender.',
      'Stir in Parmesan and serve.',
    ],
    timeInMinutes: 40,
  },
  {
    id: 4,
    name: 'Grilled Chicken Salad',
    description: 'A healthy and refreshing meal.',
    img_url: 'https://via.placeholder.com/300?text=Grilled+Chicken+Salad',
    ingredients: [
      {
        id: 16,
        name: 'Chicken Breast',
        quantity: 2,
        unit: 'pieces',
        img_url: 'https://via.placeholder.com/150?text=Chicken+Breast',
      },
      {
        id: 17,
        name: 'Lettuce',
        quantity: 1,
        unit: 'head',
        img_url: 'https://via.placeholder.com/150?text=Lettuce',
      },
      {
        id: 18,
        name: 'Tomatoes',
        quantity: 2,
        unit: 'pieces',
        img_url: 'https://via.placeholder.com/150?text=Tomatoes',
      },
      {
        id: 19,
        name: 'Cucumber',
        quantity: 1,
        unit: 'piece',
        img_url: 'https://via.placeholder.com/150?text=Cucumber',
      },
      {
        id: 20,
        name: 'Olive Oil',
        quantity: 2,
        unit: 'tbsp',
        img_url: 'https://via.placeholder.com/150?text=Olive+Oil',
      },
    ],
    steps: [
      'Grill chicken breast until fully cooked.',
      'Chop vegetables and combine in a bowl.',
      'Slice the grilled chicken and add to the salad.',
      'Drizzle olive oil and mix well.',
      'Serve immediately.',
    ],
    timeInMinutes: 20,
  },
  {
    id: 5,
    name: 'Beef Tacos',
    description: 'Spicy and juicy tacos perfect for taco night.',
    img_url: 'https://via.placeholder.com/300?text=Beef+Tacos',
    ingredients: [
      {
        id: 21,
        name: 'Ground Beef',
        quantity: 300,
        unit: 'g',
        img_url: 'https://via.placeholder.com/150?text=Ground+Beef',
      },
      {
        id: 22,
        name: 'Taco Shells',
        quantity: 8,
        unit: 'pieces',
        img_url: 'https://via.placeholder.com/150?text=Taco+Shells',
      },
      {
        id: 23,
        name: 'Lettuce',
        quantity: 1,
        unit: 'head',
        img_url: 'https://via.placeholder.com/150?text=Lettuce',
      },
      {
        id: 24,
        name: 'Cheddar Cheese',
        quantity: 50,
        unit: 'g',
        img_url: 'https://via.placeholder.com/150?text=Cheddar+Cheese',
      },
      {
        id: 25,
        name: 'Sour Cream',
        quantity: 3,
        unit: 'tbsp',
        img_url: 'https://via.placeholder.com/150?text=Sour+Cream',
      },
    ],
    steps: [
      'Brown ground beef in a skillet.',
      'Season beef with taco seasoning.',
      'Warm taco shells in the oven.',
      'Fill taco shells with beef, lettuce, and cheese.',
      'Top with sour cream and serve.',
    ],
    timeInMinutes: 25,
  },
  {
    id: 6,
    name: 'Chicken Alfredo',
    description: 'A rich, creamy pasta dish with grilled chicken.',
    img_url: 'https://via.placeholder.com/300?text=Chicken+Alfredo',
    ingredients: [
      {
        id: 26,
        name: 'Chicken Breast',
        quantity: 2,
        unit: 'pieces',
        img_url: 'https://via.placeholder.com/150?text=Chicken+Breast',
      },
      {
        id: 27,
        name: 'Fettuccine Pasta',
        quantity: 250,
        unit: 'g',
        img_url: 'https://via.placeholder.com/150?text=Fettuccine+Pasta',
      },
      {
        id: 28,
        name: 'Heavy Cream',
        quantity: 200,
        unit: 'ml',
        img_url: 'https://via.placeholder.com/150?text=Heavy+Cream',
      },
      {
        id: 29,
        name: 'Parmesan',
        quantity: 50,
        unit: 'g',
        img_url: 'https://via.placeholder.com/150?text=Parmesan',
      },
      {
        id: 30,
        name: 'Butter',
        quantity: 2,
        unit: 'tbsp',
        img_url: 'https://via.placeholder.com/150?text=Butter',
      },
    ],
    steps: [
      'Grill chicken breasts and slice them.',
      'Cook fettuccine pasta according to package instructions.',
      'In a pan, melt butter and add heavy cream.',
      'Stir in Parmesan and simmer until the sauce thickens.',
      'Combine the pasta, chicken, and sauce. Serve immediately.',
    ],
    timeInMinutes: 35,
  },
  {
    id: 7,
    name: 'Vegetable Stir Fry',
    description: 'A quick and healthy stir fry with fresh veggies.',
    img_url: 'https://via.placeholder.com/300?text=Vegetable+Stir+Fry',
    ingredients: [
      {
        id: 31,
        name: 'Broccoli',
        quantity: 200,
        unit: 'g',
        img_url: 'https://via.placeholder.com/150?text=Broccoli',
      },
      {
        id: 32,
        name: 'Carrots',
        quantity: 2,
        unit: 'pieces',
        img_url: 'https://via.placeholder.com/150?text=Carrots',
      },
      {
        id: 33,
        name: 'Bell Pepper',
        quantity: 1,
        unit: 'piece',
        img_url: 'https://via.placeholder.com/150?text=Bell+Pepper',
      },
      {
        id: 34,
        name: 'Soy Sauce',
        quantity: 3,
        unit: 'tbsp',
        img_url: 'https://via.placeholder.com/150?text=Soy+Sauce',
      },
      {
        id: 35,
        name: 'Garlic',
        quantity: 2,
        unit: 'cloves',
        img_url: 'https://via.placeholder.com/150?text=Garlic',
      },
    ],
    steps: [
      'Chop the vegetables into bite-sized pieces.',
      'Sauté garlic in a pan with some oil.',
      'Add vegetables and stir fry until tender.',
      'Add soy sauce and mix well.',
      'Serve with rice.',
    ],
    timeInMinutes: 20,
  },
  {
    id: 8,
    name: 'Chicken Caesar Salad',
    description: 'A fresh salad with grilled chicken and Caesar dressing.',
    img_url: 'https://via.placeholder.com/300?text=Chicken+Caesar+Salad',
    ingredients: [
      {
        id: 36,
        name: 'Chicken Breast',
        quantity: 2,
        unit: 'pieces',
        img_url: 'https://via.placeholder.com/150?text=Chicken+Breast',
      },
      {
        id: 37,
        name: 'Romaine Lettuce',
        quantity: 1,
        unit: 'head',
        img_url: 'https://via.placeholder.com/150?text=Romaine+Lettuce',
      },
      {
        id: 38,
        name: 'Parmesan',
        quantity: 50,
        unit: 'g',
        img_url: 'https://via.placeholder.com/150?text=Parmesan',
      },
      {
        id: 39,
        name: 'Croutons',
        quantity: 1,
        unit: 'cup',
        img_url: 'https://via.placeholder.com/150?text=Croutons',
      },
      {
        id: 40,
        name: 'Caesar Dressing',
        quantity: 4,
        unit: 'tbsp',
        img_url: 'https://via.placeholder.com/150?text=Caesar+Dressing',
      },
    ],
    steps: [
      'Grill the chicken breast and slice it.',
      'Chop lettuce and place it in a bowl.',
      'Add Parmesan, croutons, and dressing to the salad.',
      'Top with grilled chicken slices and serve.',
    ],
    timeInMinutes: 25,
  },
  {
    id: 9,
    name: 'Beef Stew',
    description: 'A hearty and comforting stew with tender beef.',
    img_url: 'https://via.placeholder.com/300?text=Beef+Stew',
    ingredients: [
      {
        id: 41,
        name: 'Beef',
        quantity: 500,
        unit: 'g',
        img_url: 'https://via.placeholder.com/150?text=Beef',
      },
      {
        id: 42,
        name: 'Carrots',
        quantity: 2,
        unit: 'pieces',
        img_url: 'https://via.placeholder.com/150?text=Carrots',
      },
      {
        id: 43,
        name: 'Potatoes',
        quantity: 3,
        unit: 'pieces',
        img_url: 'https://via.placeholder.com/150?text=Potatoes',
      },
      {
        id: 44,
        name: 'Onion',
        quantity: 1,
        unit: 'piece',
        img_url: 'https://via.placeholder.com/150?text=Onion',
      },
      {
        id: 45,
        name: 'Beef Broth',
        quantity: 1,
        unit: 'L',
        img_url: 'https://via.placeholder.com/150?text=Beef+Broth',
      },
    ],
    steps: [
      'Brown the beef in a pot.',
      'Add chopped vegetables and cook for a few minutes.',
      'Add beef broth and simmer for 1 hour.',
      'Serve hot with bread.',
    ],
    timeInMinutes: 90,
  },
];

export default recipes;
