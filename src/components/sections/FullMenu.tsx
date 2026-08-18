import React from 'react';
import { Sparkles, Leaf } from 'lucide-react';

interface MenuItem {
  id: number;
  name: string;
  price: number;
  desc: string;
  isVeg?: boolean;
  isGlutenFree?: boolean;
  tag?: string;
}

interface MenuCategory {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  quote?: string;
  items: MenuItem[];
}

export const FullMenu: React.FC = () => {
  // Menu data grouped in categories of 4-5 items (or 6 for small items)
  const categories: MenuCategory[] = [
    {
      id: 'smoothies',
      title: 'Smoothies & Breakfast Bowls',
      subtitle: 'Morning Rituals',
      image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=600&q=80',
      quote: 'Start your morning with a wave of pure, blended energy.',
      items: [
        { id: 1, name: 'BERRY BERRY', price: 399, desc: 'Greek Yogurt, Fresh & Frozen Berries, Granola, Chia, Flax Seeds, Pumpkin Seeds, Honey', isGlutenFree: true },
        { id: 2, name: 'CHOCOLATE BLISS', price: 399, desc: 'Cocoa, Dates, Coconut, Blueberry, Granola, Honey, Chocolate Flakes', isGlutenFree: true },
        { id: 3, name: 'GREEN WAVE', price: 399, desc: 'Kiwi, Spinach, Banana, Greek Yogurt, Honey, Pomegranate, Chia, Granola, Pineapple', isGlutenFree: true },
        { id: 4, name: 'RED DRAGON', price: 399, desc: 'Dragon Fruit, Cranberry, Greek Yogurt, Honey, Granola, Pomegranate', isGlutenFree: true }
      ]
    },
    {
      id: 'frenchtoast',
      title: 'Custard French Toast',
      subtitle: 'Sweet Griddle',
      image: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=600&q=80',
      quote: 'Thick brioche slices slow-soaked in fresh vanilla custard.',
      items: [
        { id: 5, name: 'ORIGINAL FRENCH TOAST', price: 449, desc: 'Whipped Cream, Berry Compote, Fresh Fruits, Organic Maple Syrup, Icing Sugar' },
        { id: 6, name: 'CINNAMON FRENCH TOAST', price: 449, desc: 'Warm Cinnamon Infusion, Whipped Cream, Amber Honey' },
        { id: 7, name: 'CHOCOLATE FRENCH TOAST', price: 449, desc: 'Rich Ganache, Tart Cranberries, Granola, hint of Chilli', tag: 'Chef Special' },
        { id: 8, name: 'TIRAMISU FRENCH TOAST', price: 449, desc: 'Mascarpone whip, Cacao powder, Cocoa Soil crumbles' }
      ]
    },
    {
      id: 'tartines',
      title: 'Sourdough Tartines',
      subtitle: 'Artisanal Open Bread',
      image: 'https://images.unsplash.com/photo-1541532713592-79a0317b6b77?auto=format&fit=crop&w=600&q=80',
      quote: 'House-fermented sourdough toasted and loaded with fresh toppings.',
      items: [
        { id: 9, name: 'AVO SMASH', price: 499, desc: 'Freshly Smashed Avocado, Feta Cheese, Pickled Red Onion, Arugula, Sourdough Bread' },
        { id: 10, name: 'RED PEPPY', price: 499, desc: 'Charred Peppers, Toasted Walnut, Charred Onion, Red & Yellow Pepper Coulis, Sourdough' },
        { id: 11, name: 'SHIMJI MELT', price: 499, desc: 'Mushroom Fricassee, Truffle Oil, Crispy Enoki, Melted Cheese, Sourdough Bread' },
        { id: 12, name: 'GARDEN VEGGIE', price: 499, desc: 'Open sourdough toast topped with roasted garden vegetables, herbs, and cold-pressed oil.', isVeg: true },
        { id: 13, name: 'CONFIT POMODORO', price: 499, desc: 'Slow-cooked Pomodoro Tomatoes, Fresh Herbs, Melted Creamy Mozzarella' }
      ]
    },
    {
      id: 'omelettes',
      title: 'Eggless Omelettes',
      subtitle: 'Savoury Griddles',
      image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80',
      quote: 'Fluffy skillet bakes, served with side house salad & crispy golden fries.',
      items: [
        { id: 14, name: 'MASALA EGGLESS OMELETTE', price: 279, desc: 'Red Onion, Tomato, Green Chilli, Cilantro, Sourdough Toast, Crispy Fries', isGlutenFree: true },
        { id: 15, name: 'MUSHROOM & CHEESE OMELETTE', price: 299, desc: 'Chunky Forest Mushroom, Melted Cheddar Cheese, Sourdough Toast, Fries', isGlutenFree: true },
        { id: 16, name: 'SPINACH & CHEESE OMELETTE', price: 299, desc: 'Sautéed Spinach, Melted Cheddar & Mozzarella, Sourdough Toast, Fries', isGlutenFree: true }
      ]
    },
    {
      id: 'soups',
      title: 'Warm Soups & Broths',
      subtitle: 'Comfort Bowls',
      image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80',
      quote: 'Slow-simmered rich broths full of depth and fresh ingredients.',
      items: [
        { id: 17, name: 'MINESTRONE SOUP', price: 450, desc: 'A Hearty Italian Vegetable Soup Simmered with Beans, Pasta, and Herbs in a Rich, Tomato Broth', isVeg: true },
        { id: 18, name: 'ORTO IN TAZZA', price: 450, desc: 'Velvety Broccoli Soup Blended to Perfection with Subtle Herbs for a Warm Bite', isGlutenFree: true },
        { id: 19, name: 'EARTH & CREAM', price: 450, desc: 'A Rich, Creamy Mushroom Soup Bursting with Deep, Earthy Flavours and a Smooth Finish', isGlutenFree: true },
        { id: 20, name: 'SPOONFUL OF TUSCANY', price: 450, desc: 'Roasted Butternut Squash Blended with Fresh Herbs, Tomato Oil & Fried Rosemary', isGlutenFree: true }
      ]
    },
    {
      id: 'salads',
      title: 'Fresh & Vibrant Salads',
      subtitle: 'Garden Greens',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80',
      quote: 'Crisp hand-picked greens, organic cheeses, and zesty signature vinaigrettes.',
      items: [
        { id: 21, name: 'ITALIAN ROMAN', price: 499, desc: 'Crisp Romaine Lettuce Tossed in a Creamy Caesar Dressing, Crunchy Croutons, shaved Parmesan' },
        { id: 22, name: 'THE GARDEN PARTY', price: 499, desc: 'Charred Corn, Crispy Potatoes, Sun-dried Tomatoes, Olives, Roasted Peppers, Burrata, Citrus Dressing' },
        { id: 23, name: 'SUMMER IN MY PLATE', price: 499, desc: 'Pearl Barley, Homemade Pomegranate Molasses, Dried Cranberry, Mixed Seeds', isVeg: true },
        { id: 24, name: 'CAPRESE SALAD', price: 499, desc: 'Fresh Mozzarella, Ripe Tomatoes, Basil Drizzled with EVOO for a Simple Italian Classic' }
      ]
    },
    {
      id: 'toasties',
      title: 'Pressed Sandwiches & Toasties',
      subtitle: 'Warm & Melted',
      image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80',
      quote: 'Crisp pressed sourdough filled with premium melted cheeses. Served with fries.',
      items: [
        { id: 25, name: 'POMODORO MELT', price: 479, desc: 'Warm toasted sandwich filled with slow-roasted cherry tomatoes and melted cheese blend' },
        { id: 26, name: 'AFTER SHIFT CHEESY TOASTIE', price: 499, desc: 'Melted Cheddar & Mozzarella, spicy Kimchi, Hot Honey & Sriracha drizzle', tag: 'Bar Staff Choice' },
        { id: 27, name: 'MUSHROOM MELT', price: 499, desc: 'Savory sandwich with Caramelised Onions, Garlic Sauce, Crispy Enoki & Shimeji Mushrooms' },
        { id: 28, name: 'FORNO CAPRESE', price: 499, desc: 'Oven-baked sandwich with fresh Mozzarella, Tomato slices, Arugula, Olive Oil' }
      ]
    },
    {
      id: 'fries',
      title: 'Crispy Fries & Potato Bites',
      subtitle: 'Dusted & Loaded',
      image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80',
      quote: 'Hand-cut double cooked potato sides, spiced and tossed hot.',
      items: [
        { id: 29, name: 'CLASSIC FRIES', price: 350, desc: 'Perfectly salted thin-cut golden fries', isVeg: true, isGlutenFree: true },
        { id: 30, name: 'PERI PERI DUSTED', price: 350, desc: 'Fries tossed in zesty African bird eye pepper spice blend', isVeg: true, isGlutenFree: true },
        { id: 31, name: 'TRUFFLE PARMESAN FRIES', price: 399, desc: 'Double-cooked fries tossed in white truffle oil and grated pecorino', isGlutenFree: true },
        { id: 32, name: 'HERB & GARLIC FRIES', price: 399, desc: 'Fries coated in roasted garlic butter and fresh garden herbs', isGlutenFree: true },
        { id: 33, name: 'TEX-MEX POTATO BITE', price: 449, desc: 'Crispy potato bites tossed in bold Tex-Mex spices for a zesty crunch', isGlutenFree: true }
      ]
    },
    {
      id: 'tapas',
      title: 'Mexican Street Tapas',
      subtitle: 'Crunchy Antojitos',
      image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=600&q=80',
      quote: 'Crisp tortilla bases and spicy finger foods perfect for sharing.',
      items: [
        { id: 34, name: 'CORN RIBS', price: 449, desc: 'Charred Corn Ribs tossed in house spices, served smoky and smoky crema', isGlutenFree: true },
        { id: 35, name: 'JALAPENO POPPERS', price: 499, desc: 'Cheese stuffed jalapenos, fried crispy, served with house sauce, salsa, and sour cream' },
        { id: 36, name: 'NACHOS GRANDE', price: 499, desc: 'Homemade tortilla chips, fresh Guacamole, Salsa, Lime Crema & Queso cheese sauce' },
        { id: 37, name: 'BIRRIA NACHOS', price: 545, desc: 'House special Birria, spiced Soy Mince, Cheese Sauce, Jalapenos & Pico de Gallo', tag: 'House Special' }
      ]
    },
    {
      id: 'tostadas',
      title: 'Crisp Tostadas',
      subtitle: 'Tostada Platters',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
      quote: 'Crisp flat corn tortillas loaded with fresh cold toppings.',
      items: [
        { id: 38, name: 'GUACAMOLE TOSTADA', price: 545, desc: 'Crispy tostada topped with creamy guacamole, fresh chopped veggies, and zesty seasonings' },
        { id: 39, name: 'POMODORO TOSTADA', price: 545, desc: 'Confit Cherry Tomato, fresh herbs, and a light drizzle of cold pressed olive oil' },
        { id: 40, name: 'FUNGO MILANO TOSTADA', price: 545, desc: 'Crispy Enoki & Shimeji tossed with house spice, served with Salsa Roja' },
        { id: 41, name: 'AUBERGINE TOSTADA', price: 499, desc: 'Sauerkraut, roasted eggplant, lime crema, charred bell peppers' }
      ]
    },
    {
      id: 'pastries',
      title: 'Savoury Mexican Pastries',
      subtitle: 'Empanadas & Bakes',
      image: 'https://images.unsplash.com/photo-1608500218900-8afa13217855?auto=format&fit=crop&w=600&q=80',
      quote: 'Crisp golden pastries filled with savory fillings and spices.',
      items: [
        { id: 42, name: 'BEANS & CHEESE PASTRIES', price: 525, desc: 'Seasoned Pinto Beans, three-cheese blend inside a crisp pastry shell' },
        { id: 43, name: 'SOY CHORIZO PASTRIES', price: 525, desc: 'Spiced minced soy meat, al pastor seasoning' },
        { id: 44, name: 'FUNGO AL PASTOR PASTRIES', price: 525, desc: 'Crispy Enoki & Shimeji mushrooms, sweet & spicy Al Pastor sauce' }
      ]
    },
    {
      id: 'enchiladas',
      title: 'Rojo Enchiladas',
      subtitle: 'Oven Baked Tortillas',
      image: 'https://images.unsplash.com/photo-1534352956279-b4df330a4240?auto=format&fit=crop&w=600&q=80',
      quote: 'Rolled tortillas baked in homemade rojo sauce, cheese, served with Mexican rice.',
      items: [
        { id: 45, name: 'GARDEN FIESTA ENCHILADAS', price: 649, desc: 'Garden fresh veggies wrapped in tortillas, rojo red sauce, melted cheese, sour cream, beans & rice' },
        { id: 46, name: 'FLORENTINE ENCHILADAS', price: 649, desc: 'Creamy spinach and cheese wrapped in tortillas, baked with cheese and sour cream' },
        { id: 47, name: 'TINGA STYLE SHROOM ENCHILADAS', price: 649, desc: 'Shredded smoky mushrooms in tomato-chipotle tinga, baked in corn tortillas' }
      ]
    },
    {
      id: 'tacos',
      title: 'Masala Flour Tacos',
      subtitle: 'Street Style Tacos',
      image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=600&q=80',
      quote: 'House-made masala flour tortillas stuffed with fresh fillings and salsas.',
      items: [
        { id: 48, name: 'FUNGO AL PASTOR TACOS', price: 589, desc: 'Enoki & Shiitake mushrooms, house Al Pastor sauce, crema, Pico de Gallo' },
        { id: 49, name: 'ADOBO CHARRED SQUASH TACOS', price: 589, desc: 'Charred marinated butternut squash, queso, pineapple-jalapeno salsa' },
        { id: 50, name: 'TINGA DI SOY TACOS', price: 589, desc: 'Minced soy meat, house-blend dry seasoning, arbol chillies, melted cheese' },
        { id: 51, name: 'COTTAGE CHEESE TACOS', price: 589, desc: 'Spice-rubbed paneer, Pico de Gallo, chipotle mayo drizzle' }
      ]
    },
    {
      id: 'quesadillas',
      title: 'Gourmet Quesadillas',
      subtitle: 'Griddled Melts',
      image: 'https://images.unsplash.com/photo-1618040996337-56904b7850b9?auto=format&fit=crop&w=600&q=80',
      quote: 'Perfectly toasted flour tortillas packed with rich, gooey melted cheese.',
      items: [
        { id: 52, name: 'MELTED BLISS QUESADILLA', price: 585, desc: 'Golden grilled tortilla packed with rich, gooey melted cheese blend' },
        { id: 53, name: 'FIESTA BEAN MELT QUESADILLA', price: 585, desc: 'Savoury seasoned beans and cheese folded in a crispy golden tortilla' },
        { id: 54, name: 'FLORENTINE QUESADILLA', price: 585, desc: 'Creamy spinach and cheese wrapped in a golden grilled tortilla with Florentine seasoning' },
        { id: 55, name: 'COTTAGE DELIGHT QUESADILLA', price: 585, desc: 'Cottage cheese and melted mozzarella blend in a crispy golden tortilla' }
      ]
    },
    {
      id: 'burritos',
      title: 'Burritos & Bowls',
      subtitle: 'Mexican Mains',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
      quote: 'Hearty wraps and bowls loaded with rice, pinto beans, guacamole, and crema.',
      items: [
        { id: 56, name: 'SOY FIESTA BURRITO', price: 645, desc: 'Minced Soybean, spiced Mexican Rice, Salsa Rojo & Lime Cream' },
        { id: 57, name: 'COTTAGE FAJITA BURRITO', price: 645, desc: 'Grilled spiced cottage cheese, sautéed bellpeppers & onions, rice, crema' },
        { id: 58, name: 'MEXICAN STREET BURRITO', price: 645, desc: 'Mexican Pinto Beans, spicy rice, crema, guacamole' },
        { id: 59, name: 'MOLAJETE GUACAMOLE', price: 940, desc: 'Fresh Hass Avocados smashed in our seasoned Molcajete, served with Nachos & Crema', tag: 'Table Show' }
      ]
    },
    {
      id: 'italianstarters',
      title: 'Italian Small Plates',
      subtitle: 'Cicchetti',
      image: 'https://images.unsplash.com/photo-1541014741259-df5290db5785?auto=format&fit=crop&w=600&q=80',
      quote: 'Bite-sized sharing plates inspired by traditional Venetian bars.',
      items: [
        { id: 60, name: 'ITALIAN ONION RINGS', price: 399, desc: 'Spiced cheese blend batter, house special dipping sauce' },
        { id: 61, name: 'FIRE IN DISGUISE', price: 449, desc: 'Tempura veg, Naga chilli cauliflower, pickled onion, ranch, goat cheese aioli', tag: 'Spicy' },
        { id: 62, name: 'ARANCINI POP', price: 499, desc: 'Smoked marinara sauce, freshly grated parmesan, cheesy arborio rice ball' },
        { id: 63, name: 'HOUSE HUMMUS PLATE', price: 699, desc: 'Three types of Hummus, woodfired pita, falafel, garlic toum, Lebanese pickles' }
      ]
    },
    {
      id: 'risottos',
      title: 'Risottos & Crostinis',
      subtitle: 'Slow Simmered Rice',
      image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=600&q=80',
      quote: 'Rich arborio rice slow-cooked with stock and finished with butter & cheese.',
      items: [
        { id: 64, name: 'CROSTINI AL POMODORO CONFI', price: 599, desc: 'Crisp toasted crostini topped with slow-cooked confit cherry tomatoes, olive oil, fresh herbs' },
        { id: 65, name: 'NONNA\'S HUG RISOTTO', price: 599, desc: 'Arborio rice cooked in a creamy red & yellow pepper coulis, flavoured with fresh herbs' },
        { id: 66, name: 'THE FUN-GUY RISOTTO', price: 599, desc: 'Arborio cooked with exotic forest mushrooms, crema & freshly grated Pecorino Romano', tag: 'Signature' },
        { id: 67, name: 'SAFFRON MILANESE RISOTTO', price: 599, desc: 'Arborio cooked with Pecorino Romano, organic saffron threads, light cream' }
      ]
    },
    {
      id: 'stuffedpastas',
      title: 'Handmade Stuffed Pastas',
      subtitle: 'Artisanal Semola',
      image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=600&q=80',
      quote: 'Filled pastas rolled and shaped by hand in-house daily.',
      items: [
        { id: 68, name: 'CARAMELLE', price: 825, desc: 'Four-cheese stuffed candy-shaped pasta tossed in fresh basil pesto sauce' },
        { id: 69, name: 'SUNFLOWER RAVIOLI', price: 825, desc: 'Sundried tomato & cream cheese stuffed ravioli, sage butter emulsion' },
        { id: 70, name: 'CAPPELLETTI', price: 825, desc: 'Exotic wild mushroom stuffed pockets, creamy fungi mushroom sauce' },
        { id: 71, name: 'CAPPELACCI', price: 825, desc: 'Butternut squash & cheese stuffed, Italian lemon & cream emulsion' },
        { id: 72, name: 'ROSE PETAL RAVIOLI', price: 825, desc: 'Asparagus & edamame purée, stuffed with spinach & cheese mousse' }
      ]
    },
    {
      id: 'classicpastas',
      title: 'Classic Ribbon Pastas & Gnocchi',
      subtitle: 'In-House Extruded',
      image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80',
      quote: 'Bronze-die cut long pastas tossed in rich reduction sauces.',
      items: [
        { id: 73, name: 'GNOCCHI EMULSION', price: 825, desc: 'Roasted potato gnocchi, served with fresh herb & butter emulsion' },
        { id: 74, name: 'SPAGHETTI AGLIO E OLIO PEPPERONCINO', price: 749, desc: 'Pecorino Romano, sundried tomato, fresh paprika, EVOO, vegan caviar', tag: 'V Optional' },
        { id: 75, name: 'FETTUCCINE ARRABBIATA / ALFREDO', price: 749, desc: 'Freshly grated Parmesan, garlic flakes, garlic crisp, fried basil' },
        { id: 76, name: 'FARFELLE ROSE', price: 749, desc: 'Blend of red tomato and white cream sauce, herb oil emulsion, vegan caviar' },
        { id: 77, name: 'PAPPARDELLE RAGU', price: 749, desc: 'Pappardelle ribbons tossed in a slow-cooked vegetable ragout, rich with garden flavours', isVeg: true },
        { id: 78, name: 'RIGATONI IL FORNO', price: 749, desc: 'Oven baked rigatoni, smoked marinara, chevre goat cheese, aged cheddar, Gruyere' }
      ]
    },
    {
      id: 'pizzasclassics',
      title: 'Sourdough Pizza - The Classics',
      subtitle: 'Neapolitan Sourdough',
      image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=600&q=80',
      quote: '48-hour slow fermented sourdough, cooked in our woodfired oven.',
      items: [
        { id: 79, name: 'TABASCO', price: 770, desc: 'Spicy tomato sauce, jalapeno pepper, sundried tomatoes, Tabasco & mozzarella', tag: 'Spicy' },
        { id: 80, name: 'SICILIA', price: 825, desc: 'Pomodoro Pelati, mushroom, garlic, pickled onions, sun-dried tomato, chilli oil, fresh mozzarella & basil' },
        { id: 81, name: 'ITALIAN FORESTA', price: 825, desc: 'Wood-fired pizza topped with forest mushrooms, aromatic herbs, and rich basil pesto' },
        { id: 82, name: 'NAPOLI', price: 825, desc: 'Pomodoro, onion, bellpepper, sun dried tomatoes, jalapeno pepper, chilli oil, mozzarella & olives' },
        { id: 83, name: 'AFFUMICATA', price: 825, desc: 'Smoked tomato sauce, artichoke hearts, peppers, onion, mozzarella, arugula, chimichurri' },
        { id: 84, name: 'MARINARA', price: 725, desc: 'Pomodoro sauce, garlic flakes, extra virgin olive oil, wild oregano', isVeg: true }
      ]
    },
    {
      id: 'pizzasspecials',
      title: 'Sourdough Pizza - Specialty Pies',
      subtitle: 'Artisanal Sourdough',
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80',
      quote: 'Finished with gourmet cheeses, truffle oils, and fresh herbs.',
      items: [
        { id: 85, name: 'SUN MARGHERITA', price: 749, desc: 'Pomodoro sauce, sundried tomatoes, fresh mozzarella, fresh basil, Pecorino Romano, Parmesan' },
        { id: 86, name: 'ROCKET PIZZA', price: 815, desc: 'Pomodoro, sundried tomatoes, fried garlic, olives, fresh rocket leaves & fresh mozzarella' },
        { id: 87, name: 'TRUFFLE CACIO E PEPE', price: 899, desc: 'Mushroom veloute, arugula, truffle oil, crispy mushrooms, fresh black pepper, Pecorino', tag: 'Gourmet' },
        { id: 88, name: 'FIRE ALARM', price: 825, desc: 'Pomodoro, green chilli, onion, fried garlic shaving, bellpeppers, fresh paprika', tag: 'Spicy' },
        { id: 89, name: 'BURRATA PIZZA', price: 945, desc: 'Pomodoro sauce, pesto swirl, fresh basil, whole fresh Burrata ball, Parmesan' },
        { id: 90, name: 'VERDURE PIZZA', price: 799, desc: 'Zucchini ribbons, sweet corn, red onion, mozzarella, marinara, chimichurri' },
        { id: 91, name: 'SUNSHINE PIZZA', price: 799, desc: 'Creamy pumpkin purée base, sautéed spinach, fresh paprika, Fior di Latte mozzarella' },
        { id: 92, name: 'RATATOUILLE PIZZA', price: 799, desc: 'Slow-roasted vegetables in a rich tomato sauce, inspired by classic Italian ratatouille', isVeg: true }
      ]
    },
    {
      id: 'garlicbreads',
      title: 'Baked Garlic Breads & Add-ons',
      subtitle: 'Sides & Dips',
      image: 'https://images.unsplash.com/photo-1573145959539-79ad3c68f433?auto=format&fit=crop&w=600&q=80',
      quote: 'Freshly baked sourdough garlic slabs served hot with specialty house dips.',
      items: [
        { id: 93, name: 'FIRE & GARLIC BREAD', price: 449, desc: 'Rich garlic butter and a hint of chili heat for a bold kick' },
        { id: 94, name: 'CHEESY MUNCH BREAD', price: 449, desc: 'Warm herb butter topped with a loaded cheese blend' },
        { id: 95, name: 'ROSSO VERDRE BREAD', price: 495, desc: 'Sundried tomato jalapeño spread topped with fresh basil pesto' },
        { id: 96, name: 'INDO TRIO BREAD', price: 449, desc: 'Soya keema, hot Sriracha, Fior di Latte mozzarella, garlic slivers' }
      ]
    },
    {
      id: 'desserts',
      title: 'Sweet Endings',
      subtitle: 'Dolce',
      image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=600&q=80',
      quote: 'Indulgent, handcrafted desserts to complete your sensory journey.',
      items: [
        { id: 97, name: 'CLASSIC TIRAMISU', price: 495, desc: 'Chocolate soil crumbles, airy coffee cloud, creamy mascarpone layers' },
        { id: 98, name: 'MIDNIGHT LECHES', price: 445, desc: 'Coffee Espuma, espresso-soaked sponge cake, dusting of rich cacao' },
        { id: 99, name: 'BLUSH BERRY COTTA', price: 445, desc: 'Berry coulis, fresh berry salsa served on a silky, cold cream base' },
        { id: 100, name: 'BLOC NOIR', price: 495, desc: 'Terre de cacao, toasted nuts, vanilla cream, velvet chocolate crumbs' }
      ]
    }
  ];

  // Main high-level jump index categories
  const menuSections = [
    { number: '01', label: 'Rituals', targetId: 'smoothies' },
    { number: '02', label: 'Salads & Soups', targetId: 'soups' },
    { number: '03', label: 'Toasties & Fries', targetId: 'toasties' },
    { number: '04', label: 'Mexican', targetId: 'tacos' },
    { number: '05', label: 'Italian Tapas', targetId: 'italianstarters' },
    { number: '06', label: 'Pastas', targetId: 'stuffedpastas' },
    { number: '07', label: 'Pizzas', targetId: 'pizzasclassics' },
    { number: '08', label: 'Dolce & Sides', targetId: 'garlicbreads' },
  ];

  const handleScrollToSection = (targetId: string) => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="relative min-h-screen w-full bg-ciro-cream text-ciro-dark py-24 px-4 md:px-8 overflow-hidden">
      
      {/* Light dot grid paper style background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: `radial-gradient(var(--color-ciro-dark) 1.5px, transparent 1.5px)`,
        backgroundSize: '24px 24px',
        backgroundPosition: '0 0'
      }} />

      {/* Centered Journal Masthead Header */}
      <div className="w-full mb-12 flex flex-col items-center text-center relative z-30 px-4 md:px-12 max-w-4xl mx-auto">
        <span className="font-mono text-[9px] tracking-[0.35em] text-ciro-olive uppercase mb-2">
          EST. 2026 • JAIPUR, INDIA
        </span>
        <h1 className="font-serif font-medium text-4xl md:text-5xl lg:text-6xl text-ciro-olive uppercase tracking-tight leading-none mb-3">
          THE JOURNAL OF FLAVOR
        </h1>
        <div className="w-12 h-[1px] bg-ciro-olive/30 mt-1" />
      </div>

      {/* Sticky Jump Navigation Bar (Centered Editorial index) */}
      <div className="sticky top-16 z-30 w-full mb-16 bg-ciro-cream/95 backdrop-blur-md border-b border-ciro-dark/5 py-5 flex justify-start lg:justify-center gap-8 overflow-x-auto scrollbar-none snap-x px-4 md:px-12">
        {menuSections.map((sec, idx) => (
          <button
            key={idx}
            onClick={() => handleScrollToSection(sec.targetId)}
            className="flex-shrink-0 snap-center flex flex-col items-center gap-0.5 group cursor-pointer"
          >
            <span className="font-mono text-[8px] text-ciro-olive/45 font-bold tracking-wider group-hover:text-ciro-olive transition-colors duration-300">
              {sec.number}
            </span>
            <span className="font-serif font-medium text-xs md:text-sm text-ciro-dark group-hover:text-ciro-olive transition-colors duration-300 relative pb-1.5">
              {sec.label}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-ciro-olive rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" />
            </span>
          </button>
        ))}
      </div>

      {/* The Single Continuous Sourdough Binder Sheet */}
      <div className="w-full relative py-12 pl-12 pr-4 md:pl-24 md:pr-12">
        
        {/* Subtle grid lines background overlay (to look like paper page grids) */}
        <div className="absolute inset-0 bg-grid-dots opacity-[0.03] pointer-events-none" />

        {/* Paper texture overlay */}
        <div className="absolute inset-0 bg-noise pointer-events-none opacity-[0.02]" />

        {/* Continuous Binder Rings running down the left margin */}
        {/* We place silver rings at regular vertical intervals using relative positioning alongside sections */}
        <div className="absolute left-2 md:left-4 top-0 bottom-0 w-8 flex flex-col justify-between py-12 pointer-events-none border-r border-ciro-dark/5">
          <div className="absolute inset-y-0 right-3 w-0.5 bg-ciro-dark/15 shadow-inner" />
        </div>

        {/* Categories rendering with expanded spacing */}
        <div className="flex flex-col gap-40 relative z-10">
          {categories.map((cat, catIdx) => {
            const isImageLeft = catIdx % 2 === 0;

            return (
              <div 
                key={cat.id} 
                id={cat.id} 
                className="group relative pt-4 scroll-mt-36"
              >
                
                {/* Silver binder clip overlay anchored next to each category */}
                <div className="absolute left-[-32px] md:left-[-78px] top-6 w-[40px] h-[16px] bg-gradient-to-r from-gray-400 via-gray-100 to-gray-400 rounded-full shadow-[0_2px_4px_rgba(0,0,0,0.3)] z-20 border border-ciro-dark/30 hidden sm:block" />

                {/* Category Header */}
                <div className="border-b border-ciro-espresso/25 pb-4 mb-8 flex flex-col sm:flex-row justify-between items-baseline gap-4">
                  <div>
                    <span className="font-display font-black text-[10px] tracking-widest text-ciro-olive uppercase">
                      {cat.subtitle}
                    </span>
                    <h2 className="font-serif font-medium text-3xl md:text-4xl text-ciro-olive leading-tight mt-1">
                      {cat.title}
                    </h2>
                  </div>
                </div>

                {/* Content Grid: Photo + List (alternating order) */}
                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-start`}>
                  
                  {/* Image Column */}
                  <div className={`col-span-1 lg:col-span-5 flex justify-center ${
                    isImageLeft ? 'lg:order-1' : 'lg:order-2'
                  }`}>
                    <div className="relative group/img flex-shrink-0 w-full max-w-[280px]">
                      {/* Medium-sized Circular/Oval food photo with a thick borders & shadow */}
                      <div className="w-full aspect-square rounded-full overflow-hidden border-3 border-ciro-dark shadow-retro group-hover/img:shadow-retro-orange transition-all duration-300 transform group-hover/img:-rotate-2 scale-98 group-hover/img:scale-100">
                        <img 
                          src={cat.image} 
                          alt={cat.title}
                          className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-700" 
                        />
                      </div>
                      
                      {/* Sparkle decorative element */}
                      <div className="absolute top-2 right-2 bg-ciro-saffron p-1.5 rounded-full border border-ciro-dark shadow-sm">
                        <Sparkles className="w-4 h-4 text-ciro-espresso" />
                      </div>
                    </div>
                  </div>

                  {/* List Column */}
                  <div className={`col-span-1 lg:col-span-7 flex flex-col gap-5 ${
                    isImageLeft ? 'lg:order-2' : 'lg:order-1'
                  }`}>
                    {cat.items.map((item, itemIdx) => (
                      <div key={item.id} className="relative pt-2">
                        
                        {/* Dotted Separator Line */}
                        {itemIdx > 0 && (
                          <div className="absolute top-[-10px] left-0 right-0 flex items-center">
                            <div className="w-full border-t border-dotted border-ciro-olive/25" />
                            
                            {/* Item Number Badge directly on the dotted line */}
                            <div className="absolute left-[10%] transform -translate-x-1/2 bg-ciro-olive text-ciro-cream font-mono text-[9px] w-[18px] h-[18px] flex items-center justify-center rounded-full border border-ciro-cream/30 z-10 shadow-sm">
                              {item.id}
                            </div>
                          </div>
                        )}

                        {/* Item Details */}
                        <div>
                          <div className="flex justify-between items-start gap-4">
                            <div className="flex items-center gap-2">
                              <h3 className="font-serif font-medium text-base md:text-lg text-ciro-olive hover:text-ciro-espresso transition-colors duration-200">
                                {item.name}
                              </h3>
                              {item.isVeg && (
                                <span title="Vegetarian">
                                  <Leaf className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600/20" />
                                </span>
                              )}
                              {item.isGlutenFree && (
                                <span className="text-[9px] font-mono border border-ciro-olive/50 text-ciro-olive px-1 rounded-sm tracking-tighter" title="Gluten-Free">GF</span>
                              )}
                            </div>
                          </div>
                          <p className="font-sans font-medium text-[11px] md:text-xs text-ciro-dark/70 mt-1 leading-relaxed max-w-[95%]">
                            {item.desc}
                          </p>
                          
                          {item.tag && (
                            <span className="inline-block mt-2 font-mono text-[8px] tracking-wider bg-ciro-red/20 text-ciro-espresso px-2 py-0.5 rounded-full border border-ciro-red/20">
                              ★ {item.tag}
                            </span>
                          )}
                        </div>

                      </div>
                    ))}

                    {/* Cursive Handwriting Quote under the list */}
                    {cat.quote && (
                      <div className="mt-4 pt-4 border-t border-dashed border-ciro-espresso/15 text-right">
                        <p className="font-serif italic text-sm text-ciro-olive/90 leading-snug tracking-tight font-medium" style={{ fontFamily: 'Fraunces, cursive' }}>
                          "{cat.quote}"
                        </p>
                      </div>
                    )}
                  </div>

                </div>

              </div>
            );
          })}
        </div>

        {/* Footer of the paper sheet */}
        <div className="mt-24 pt-12 border-t-2 border-ciro-dark flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
          <div className="text-center md:text-left">
            <h4 className="font-serif font-medium text-lg text-ciro-olive">CIRO CO.</h4>
            <p className="font-sans text-xs text-ciro-dark/60 mt-1">Sourdough, Coffee & Cinematic Bites</p>
          </div>
          <span className="font-mono text-xs text-ciro-dark/40 tracking-widest">
            THE END OF THE JOURNAL
          </span>
        </div>

      </div>
    </section>
  );
};

export default FullMenu;
