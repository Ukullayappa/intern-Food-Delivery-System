// Food menu data — plain static JS/JSON, per the brief's "students can use
// static data or JSON data" allowance.
// Images served live from the Foodish API (foodish-api.com).
// Prices are in Indian Rupees (₹), whole-rupee amounts as is standard for
// Indian food delivery menus.
export const categories = ['All', 'Pizza', 'Burgers', 'Biryani', 'Desserts', 'Pasta', 'Rice Bowls'];

export const foods = [
  { id: 1, restaurantId: 1, name: 'Margherita Pizza', category: 'Pizza', price: 249, description: 'Classic tomato, fresh mozzarella & basil.', image: 'https://foodish-api.com/images/pizza/pizza2.jpg' },
  { id: 2, restaurantId: 1, name: 'Pepperoni Pizza', category: 'Pizza', price: 329, description: 'Loaded with spicy pepperoni & mozzarella.', image: 'https://foodish-api.com/images/pizza/pizza3.jpg' },
  { id: 3, restaurantId: 1, name: 'Farmhouse Pizza', category: 'Pizza', price: 299, description: 'Bell peppers, onion, corn & mushroom.', image: 'https://foodish-api.com/images/pizza/pizza4.jpg' },
  { id: 4, restaurantId: 2, name: 'Classic Cheeseburger', category: 'Burgers', price: 179, description: 'Beef patty, cheddar, lettuce, house sauce.', image: 'https://foodish-api.com/images/burger/burger2.jpg' },
  { id: 5, restaurantId: 2, name: 'BBQ Bacon Burger', category: 'Burgers', price: 229, description: 'Smoky BBQ sauce, crispy bacon, onion rings.', image: 'https://foodish-api.com/images/burger/burger3.jpg' },
  { id: 6, restaurantId: 2, name: 'Veggie Deluxe Burger', category: 'Burgers', price: 199, description: 'Grilled veggie patty with avocado spread.', image: 'https://foodish-api.com/images/burger/burger4.jpg' },
  { id: 7, restaurantId: 3, name: 'Chicken Biryani', category: 'Biryani', price: 249, description: 'Fragrant basmati rice slow-cooked with spices.', image: 'https://foodish-api.com/images/biryani/biryani2.jpg' },
  { id: 8, restaurantId: 3, name: 'Mutton Biryani', category: 'Biryani', price: 349, description: 'Tender mutton layered with saffron rice.', image: 'https://foodish-api.com/images/biryani/biryani3.jpg' },
  { id: 9, restaurantId: 4, name: 'Chocolate Brownie', category: 'Desserts', price: 129, description: 'Warm fudge brownie with a gooey center.', image: 'https://foodish-api.com/images/dessert/dessert2.jpg' },
  { id: 10, restaurantId: 4, name: 'Red Velvet Cake', category: 'Desserts', price: 159, description: 'Soft layers with cream cheese frosting.', image: 'https://foodish-api.com/images/dessert/dessert3.jpg' },
  { id: 11, restaurantId: 5, name: 'Buddha Rice Bowl', category: 'Rice Bowls', price: 219, description: 'Brown rice, grilled veggies, tahini drizzle.', image: 'https://foodish-api.com/images/rice/rice2.jpg' },
  { id: 12, restaurantId: 6, name: 'Creamy Alfredo Pasta', category: 'Pasta', price: 229, description: 'Fettuccine tossed in a rich parmesan cream sauce.', image: 'https://foodish-api.com/images/pasta/pasta2.jpg' },
];
