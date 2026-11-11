import React, { useState, useEffect } from 'react';
import { Sparkles, Leaf, Coffee, UtensilsCrossed, ArrowRight, ArrowLeft } from 'lucide-react';

interface MenuItem {
  id: number;
  name: string;
  desc: string;
  calVolume?: string;
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
  note?: string;
  items: MenuItem[];
}

interface FullMenuProps {
  initialMode?: 'food' | 'drinks';
}

export const FullMenu: React.FC<FullMenuProps> = ({ initialMode = 'food' }) => {
  const [menuMode, setMenuMode] = useState<'food' | 'drinks'>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      if (hash.includes('drink') || hash.includes('beverage')) {
        return 'drinks';
      }
    }
    return initialMode;
  });

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash.includes('drink') || hash.includes('beverage')) {
        setMenuMode('drinks');
      } else if (hash.includes('food') || hash === '#full-menu') {
        setMenuMode('food');
      }
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Food categories
  const foodCategories: MenuCategory[] = [
    {
      id: 'smoothies',
      title: 'Smoothies & Breakfast Bowls',
      subtitle: 'Morning Rituals',
      image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=600&q=80',
      quote: 'Start your morning with a wave of pure, blended energy.',
      items: [
        { id: 1, name: 'BERRY BERRY', desc: 'Greek Yogurt, Fresh & Frozen Berries, Granola, Chia, Flax Seeds, Pumpkin Seeds, Honey', isGlutenFree: true },
        { id: 2, name: 'CHOCOLATE BLISS', desc: 'Cocoa, Dates, Coconut, Blueberry, Granola, Honey, Chocolate Flakes', isGlutenFree: true },
        { id: 3, name: 'GREEN WAVE', desc: 'Kiwi, Spinach, Banana, Greek Yogurt, Honey, Pomegranate, Chia, Granola, Pineapple', isGlutenFree: true },
        { id: 4, name: 'RED DRAGON', desc: 'Dragon Fruit, Cranberry, Greek Yogurt, Honey, Granola, Pomegranate', isGlutenFree: true }
      ]
    },
    {
      id: 'frenchtoast',
      title: 'Custard French Toast',
      subtitle: 'Sweet Griddle',
      image: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=600&q=80',
      quote: 'Thick brioche slices slow-soaked in fresh vanilla custard.',
      items: [
        { id: 5, name: 'ORIGINAL FRENCH TOAST', desc: 'Whipped Cream, Berry Compote, Fresh Fruits, Organic Maple Syrup, Icing Sugar' },
        { id: 6, name: 'CINNAMON FRENCH TOAST', desc: 'Warm Cinnamon Infusion, Whipped Cream, Amber Honey' },
        { id: 7, name: 'CHOCOLATE FRENCH TOAST', desc: 'Rich Ganache, Tart Cranberries, Granola, hint of Chilli', tag: 'Chef Special' },
        { id: 8, name: 'TIRAMISU FRENCH TOAST', desc: 'Mascarpone whip, Cacao powder, Cocoa Soil crumbles' }
      ]
    },
    {
      id: 'tartines',
      title: 'Sourdough Tartines',
      subtitle: 'Artisanal Open Bread',
      image: 'https://images.unsplash.com/photo-1541532713592-79a0317b6b77?auto=format&fit=crop&w=600&q=80',
      quote: 'House-fermented sourdough toasted and loaded with fresh toppings.',
      items: [
        { id: 9, name: 'AVO SMASH', desc: 'Freshly Smashed Avocado, Feta Cheese, Pickled Red Onion, Arugula, Sourdough Bread' },
        { id: 10, name: 'RED PEPPY', desc: 'Charred Peppers, Toasted Walnut, Charred Onion, Red & Yellow Pepper Coulis, Sourdough' },
        { id: 11, name: 'SHIMJI MELT', desc: 'Mushroom Fricassee, Truffle Oil, Crispy Enoki, Melted Cheese, Sourdough Bread' },
        { id: 12, name: 'GARDEN VEGGIE', desc: 'Open sourdough toast topped with roasted garden vegetables, herbs, and cold-pressed oil.', isVeg: true },
        { id: 13, name: 'CONFIT POMODORO', desc: 'Slow-cooked Pomodoro Tomatoes, Fresh Herbs, Melted Creamy Mozzarella' }
      ]
    },
    {
      id: 'omelettes',
      title: 'Eggless Omelettes',
      subtitle: 'Savoury Griddles',
      image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80',
      quote: 'Fluffy skillet bakes, served with side house salad & crispy golden fries.',
      items: [
        { id: 14, name: 'MASALA EGGLESS OMELETTE', desc: 'Red Onion, Tomato, Green Chilli, Cilantro, Sourdough Toast, Crispy Fries', isGlutenFree: true },
        { id: 15, name: 'MUSHROOM & CHEESE OMELETTE', desc: 'Chunky Forest Mushroom, Melted Cheddar Cheese, Sourdough Toast, Fries', isGlutenFree: true },
        { id: 16, name: 'SPINACH & CHEESE OMELETTE', desc: 'Sautéed Spinach, Melted Cheddar & Mozzarella, Sourdough Toast, Fries', isGlutenFree: true }
      ]
    },
    {
      id: 'soups',
      title: 'Warm Soups & Broths',
      subtitle: 'Comfort Bowls',
      image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80',
      quote: 'Slow-simmered rich broths full of depth and fresh ingredients.',
      items: [
        { id: 17, name: 'MINESTRONE SOUP', desc: 'A Hearty Italian Vegetable Soup Simmered with Beans, Pasta, and Herbs in a Rich, Tomato Broth', isVeg: true },
        { id: 18, name: 'ORTO IN TAZZA', desc: 'Velvety Broccoli Soup Blended to Perfection with Subtle Herbs for a Warm Bite', isGlutenFree: true },
        { id: 19, name: 'EARTH & CREAM', desc: 'A Rich, Creamy Mushroom Soup Bursting with Deep, Earthy Flavours and a Smooth Finish', isGlutenFree: true },
        { id: 20, name: 'SPOONFUL OF TUSCANY', desc: 'Roasted Butternut Squash Blended with Fresh Herbs, Tomato Oil & Fried Rosemary', isGlutenFree: true }
      ]
    },
    {
      id: 'salads',
      title: 'Fresh & Vibrant Salads',
      subtitle: 'Garden Greens',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80',
      quote: 'Crisp hand-picked greens, organic cheeses, and zesty signature vinaigrettes.',
      items: [
        { id: 21, name: 'ITALIAN ROMAN', desc: 'Crisp Romaine Lettuce Tossed in a Creamy Caesar Dressing, Crunchy Croutons, shaved Parmesan' },
        { id: 22, name: 'THE GARDEN PARTY', desc: 'Charred Corn, Crispy Potatoes, Sun-dried Tomatoes, Olives, Roasted Peppers, Burrata, Citrus Dressing' },
        { id: 23, name: 'SUMMER IN MY PLATE', desc: 'Pearl Barley, Homemade Pomegranate Molasses, Dried Cranberry, Mixed Seeds', isVeg: true },
        { id: 24, name: 'CAPRESE SALAD', desc: 'Fresh Mozzarella, Ripe Tomatoes, Basil Drizzled with EVOO for a Simple Italian Classic' }
      ]
    },
    {
      id: 'toasties',
      title: 'Pressed Sandwiches & Toasties',
      subtitle: 'Warm & Melted',
      image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80',
      quote: 'Crisp pressed sourdough filled with premium melted cheeses. Served with fries.',
      items: [
        { id: 25, name: 'POMODORO MELT', desc: 'Warm toasted sandwich filled with slow-roasted cherry tomatoes and melted cheese blend' },
        { id: 26, name: 'AFTER SHIFT CHEESY TOASTIE', desc: 'Melted Cheddar & Mozzarella, spicy Kimchi, Hot Honey & Sriracha drizzle', tag: 'Bar Staff Choice' },
        { id: 27, name: 'MUSHROOM MELT', desc: 'Savory sandwich with Caramelised Onions, Garlic Sauce, Crispy Enoki & Shimeji Mushrooms' },
        { id: 28, name: 'FORNO CAPRESE', desc: 'Oven-baked sandwich with fresh Mozzarella, Tomato slices, Arugula, Olive Oil' }
      ]
    },
    {
      id: 'fries',
      title: 'Crispy Fries & Potato Bites',
      subtitle: 'Dusted & Loaded',
      image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80',
      quote: 'Hand-cut double cooked potato sides, spiced and tossed hot.',
      items: [
        { id: 29, name: 'CLASSIC FRIES', desc: 'Perfectly salted thin-cut golden fries', isVeg: true, isGlutenFree: true },
        { id: 30, name: 'PERI PERI DUSTED', desc: 'Fries tossed in zesty African bird eye pepper spice blend', isVeg: true, isGlutenFree: true },
        { id: 31, name: 'TRUFFLE PARMESAN FRIES', desc: 'Double-cooked fries tossed in white truffle oil and grated pecorino', isGlutenFree: true },
        { id: 32, name: 'HERB & GARLIC FRIES', desc: 'Fries coated in roasted garlic butter and fresh garden herbs', isGlutenFree: true },
        { id: 33, name: 'TEX-MEX POTATO BITE', desc: 'Crispy potato bites tossed in bold Tex-Mex spices for a zesty crunch', isGlutenFree: true }
      ]
    },
    {
      id: 'tapas',
      title: 'Mexican Street Tapas',
      subtitle: 'Crunchy Antojitos',
      image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=600&q=80',
      quote: 'Crisp tortilla bases and spicy finger foods perfect for sharing.',
      items: [
        { id: 34, name: 'CORN RIBS', desc: 'Charred Corn Ribs tossed in house spices, served smoky and smoky crema', isGlutenFree: true },
        { id: 35, name: 'JALAPENO POPPERS', desc: 'Cheese stuffed jalapenos, fried crispy, served with house sauce, salsa, and sour cream' },
        { id: 36, name: 'NACHOS GRANDE', desc: 'Homemade tortilla chips, fresh Guacamole, Salsa, Lime Crema & Queso cheese sauce' },
        { id: 37, name: 'BIRRIA NACHOS', desc: 'House special Birria, spiced Soy Mince, Cheese Sauce, Jalapenos & Pico de Gallo', tag: 'House Special' }
      ]
    },
    {
      id: 'tostadas',
      title: 'Crisp Tostadas',
      subtitle: 'Tostada Platters',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
      quote: 'Crisp flat corn tortillas loaded with fresh cold toppings.',
      items: [
        { id: 38, name: 'GUACAMOLE TOSTADA', desc: 'Crispy tostada topped with creamy guacamole, fresh chopped veggies, and zesty seasonings' },
        { id: 39, name: 'POMODORO TOSTADA', desc: 'Confit Cherry Tomato, fresh herbs, and a light drizzle of cold pressed olive oil' },
        { id: 40, name: 'FUNGO MILANO TOSTADA', desc: 'Crispy Enoki & Shimeji tossed with house spice, served with Salsa Roja' },
        { id: 41, name: 'AUBERGINE TOSTADA', desc: 'Sauerkraut, roasted eggplant, lime crema, charred bell peppers' }
      ]
    },
    {
      id: 'pastries',
      title: 'Savoury Mexican Pastries',
      subtitle: 'Empanadas & Bakes',
      image: 'https://images.unsplash.com/photo-1608500218900-8afa13217855?auto=format&fit=crop&w=600&q=80',
      quote: 'Crisp golden pastries filled with savory fillings and spices.',
      items: [
        { id: 42, name: 'BEANS & CHEESE PASTRIES', desc: 'Seasoned Pinto Beans, three-cheese blend inside a crisp pastry shell' },
        { id: 43, name: 'SOY CHORIZO PASTRIES', desc: 'Spiced minced soy meat, al pastor seasoning' },
        { id: 44, name: 'FUNGO AL PASTOR PASTRIES', desc: 'Crispy Enoki & Shimeji mushrooms, sweet & spicy Al Pastor sauce' }
      ]
    },
    {
      id: 'enchiladas',
      title: 'Rojo Enchiladas',
      subtitle: 'Oven Baked Tortillas',
      image: 'https://images.unsplash.com/photo-1534352956279-b4df330a4240?auto=format&fit=crop&w=600&q=80',
      quote: 'Rolled tortillas baked in homemade rojo sauce, cheese, served with Mexican rice.',
      items: [
        { id: 45, name: 'GARDEN FIESTA ENCHILADAS', desc: 'Garden fresh veggies wrapped in tortillas, rojo red sauce, melted cheese, sour cream, beans & rice' },
        { id: 46, name: 'FLORENTINE ENCHILADAS', desc: 'Creamy spinach and cheese wrapped in tortillas, baked with cheese and sour cream' },
        { id: 47, name: 'TINGA STYLE SHROOM ENCHILADAS', desc: 'Shredded smoky mushrooms in tomato-chipotle tinga, baked in corn tortillas' }
      ]
    },
    {
      id: 'tacos',
      title: 'Masala Flour Tacos',
      subtitle: 'Street Style Tacos',
      image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=600&q=80',
      quote: 'House-made masala flour tortillas stuffed with fresh fillings and salsas.',
      items: [
        { id: 48, name: 'FUNGO AL PASTOR TACOS', desc: 'Enoki & Shiitake mushrooms, house Al Pastor sauce, crema, Pico de Gallo' },
        { id: 49, name: 'ADOBO CHARRED SQUASH TACOS', desc: 'Charred marinated butternut squash, queso, pineapple-jalapeno salsa' },
        { id: 50, name: 'TINGA DI SOY TACOS', desc: 'Minced soy meat, house-blend dry seasoning, arbol chillies, melted cheese' },
        { id: 51, name: 'COTTAGE CHEESE TACOS', desc: 'Spice-rubbed paneer, Pico de Gallo, chipotle mayo drizzle' }
      ]
    },
    {
      id: 'quesadillas',
      title: 'Gourmet Quesadillas',
      subtitle: 'Griddled Melts',
      image: 'https://images.unsplash.com/photo-1618040996337-56904b7850b9?auto=format&fit=crop&w=600&q=80',
      quote: 'Perfectly toasted flour tortillas packed with rich, gooey melted cheese.',
      items: [
        { id: 52, name: 'MELTED BLISS QUESADILLA', desc: 'Golden grilled tortilla packed with rich, gooey melted cheese blend' },
        { id: 53, name: 'FIESTA BEAN MELT QUESADILLA', desc: 'Savoury seasoned beans and cheese folded in a crispy golden tortilla' },
        { id: 54, name: 'FLORENTINE QUESADILLA', desc: 'Creamy spinach and cheese wrapped in a golden grilled tortilla with Florentine seasoning' },
        { id: 55, name: 'COTTAGE DELIGHT QUESADILLA', desc: 'Cottage cheese and melted mozzarella blend in a crispy golden tortilla' }
      ]
    },
    {
      id: 'burritos',
      title: 'Burritos & Bowls',
      subtitle: 'Mexican Mains',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
      quote: 'Hearty wraps and bowls loaded with rice, pinto beans, guacamole, and crema.',
      items: [
        { id: 56, name: 'SOY FIESTA BURRITO', desc: 'Minced Soybean, spiced Mexican Rice, Salsa Rojo & Lime Cream' },
        { id: 57, name: 'COTTAGE FAJITA BURRITO', desc: 'Grilled spiced cottage cheese, sautéed bellpeppers & onions, rice, crema' },
        { id: 58, name: 'MEXICAN STREET BURRITO', desc: 'Mexican Pinto Beans, spicy rice, crema, guacamole' },
        { id: 59, name: 'MOLAJETE GUACAMOLE', desc: 'Fresh Hass Avocados smashed in our seasoned Molcajete, served with Nachos & Crema', tag: 'Table Show' }
      ]
    },
    {
      id: 'italianstarters',
      title: 'Italian Small Plates',
      subtitle: 'Cicchetti',
      image: 'https://images.unsplash.com/photo-1541014741259-df5290db5785?auto=format&fit=crop&w=600&q=80',
      quote: 'Bite-sized sharing plates inspired by traditional Venetian bars.',
      items: [
        { id: 60, name: 'ITALIAN ONION RINGS', desc: 'Spiced cheese blend batter, house special dipping sauce' },
        { id: 61, name: 'FIRE IN DISGUISE', desc: 'Tempura veg, Naga chilli cauliflower, pickled onion, ranch, goat cheese aioli', tag: 'Spicy' },
        { id: 62, name: 'ARANCINI POP', desc: 'Smoked marinara sauce, freshly grated parmesan, cheesy arborio rice ball' },
        { id: 63, name: 'HOUSE HUMMUS PLATE', desc: 'Three types of Hummus, woodfired pita, falafel, garlic toum, Lebanese pickles' }
      ]
    },
    {
      id: 'risottos',
      title: 'Risottos & Crostinis',
      subtitle: 'Slow Simmered Rice',
      image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=600&q=80',
      quote: 'Rich arborio rice slow-cooked with stock and finished with butter & cheese.',
      items: [
        { id: 64, name: 'CROSTINI AL POMODORO CONFI', desc: 'Crisp toasted crostini topped with slow-cooked confit cherry tomatoes, olive oil, fresh herbs' },
        { id: 65, name: 'NONNA\'S HUG RISOTTO', desc: 'Arborio rice cooked in a creamy red & yellow pepper coulis, flavoured with fresh herbs' },
        { id: 66, name: 'THE FUN-GUY RISOTTO', desc: 'Arborio cooked with exotic forest mushrooms, crema & freshly grated Pecorino Romano', tag: 'Signature' },
        { id: 67, name: 'SAFFRON MILANESE RISOTTO', desc: 'Arborio cooked with Pecorino Romano, organic saffron threads, light cream' }
      ]
    },
    {
      id: 'stuffedpastas',
      title: 'Handmade Stuffed Pastas',
      subtitle: 'Artisanal Semola',
      image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=600&q=80',
      quote: 'Filled pastas rolled and shaped by hand in-house daily.',
      items: [
        { id: 68, name: 'CARAMELLE', desc: 'Four-cheese stuffed candy-shaped pasta tossed in fresh basil pesto sauce' },
        { id: 69, name: 'SUNFLOWER RAVIOLI', desc: 'Sundried tomato & cream cheese stuffed ravioli, sage butter emulsion' },
        { id: 70, name: 'CAPPELLETTI', desc: 'Exotic wild mushroom stuffed pockets, creamy fungi mushroom sauce' },
        { id: 71, name: 'CAPPELACCI', desc: 'Butternut squash & cheese stuffed, Italian lemon & cream emulsion' },
        { id: 72, name: 'ROSE PETAL RAVIOLI', desc: 'Asparagus & edamame purée, stuffed with spinach & cheese mousse' }
      ]
    },
    {
      id: 'classicpastas',
      title: 'Classic Ribbon Pastas & Gnocchi',
      subtitle: 'In-House Extruded',
      image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80',
      quote: 'Bronze-die cut long pastas tossed in rich reduction sauces.',
      items: [
        { id: 73, name: 'GNOCCHI EMULSION', desc: 'Roasted potato gnocchi, served with fresh herb & butter emulsion' },
        { id: 74, name: 'SPAGHETTI AGLIO E OLIO PEPPERONCINO', desc: 'Pecorino Romano, sundried tomato, fresh paprika, EVOO, vegan caviar', tag: 'V Optional' },
        { id: 75, name: 'FETTUCCINE ARRABBIATA / ALFREDO', desc: 'Freshly grated Parmesan, garlic flakes, garlic crisp, fried basil' },
        { id: 76, name: 'FARFELLE ROSE', desc: 'Blend of red tomato and white cream sauce, herb oil emulsion, vegan caviar' },
        { id: 77, name: 'PAPPARDELLE RAGU', desc: 'Pappardelle ribbons tossed in a slow-cooked vegetable ragout, rich with garden flavours', isVeg: true },
        { id: 78, name: 'RIGATONI IL FORNO', desc: 'Oven baked rigatoni, smoked marinara, chevre goat cheese, aged cheddar, Gruyere' }
      ]
    },
    {
      id: 'pizzasclassics',
      title: 'Sourdough Pizza - The Classics',
      subtitle: 'Neapolitan Sourdough',
      image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=600&q=80',
      quote: '48-hour slow fermented sourdough, cooked in our woodfired oven.',
      items: [
        { id: 79, name: 'TABASCO', desc: 'Spicy tomato sauce, jalapeno pepper, sundried tomatoes, Tabasco & mozzarella', tag: 'Spicy' },
        { id: 80, name: 'SICILIA', desc: 'Pomodoro Pelati, mushroom, garlic, pickled onions, sun-dried tomato, chilli oil, fresh mozzarella & basil' },
        { id: 81, name: 'ITALIAN FORESTA', desc: 'Wood-fired pizza topped with forest mushrooms, aromatic herbs, and rich basil pesto' },
        { id: 82, name: 'NAPOLI', desc: 'Pomodoro, onion, bellpepper, sun dried tomatoes, jalapeno pepper, chilli oil, mozzarella & olives' },
        { id: 83, name: 'AFFUMICATA', desc: 'Smoked tomato sauce, artichoke hearts, peppers, onion, mozzarella, arugula, chimichurri' },
        { id: 84, name: 'MARINARA', desc: 'Pomodoro sauce, garlic flakes, extra virgin olive oil, wild oregano', isVeg: true }
      ]
    },
    {
      id: 'pizzasspecials',
      title: 'Sourdough Pizza - Specialty Pies',
      subtitle: 'Artisanal Sourdough',
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80',
      quote: 'Finished with gourmet cheeses, truffle oils, and fresh herbs.',
      items: [
        { id: 85, name: 'SUN MARGHERITA', desc: 'Pomodoro sauce, sundried tomatoes, fresh mozzarella, fresh basil, Pecorino Romano, Parmesan' },
        { id: 86, name: 'ROCKET PIZZA', desc: 'Pomodoro, sundried tomatoes, fried garlic, olives, fresh rocket leaves & fresh mozzarella' },
        { id: 87, name: 'TRUFFLE CACIO E PEPE', desc: 'Mushroom veloute, arugula, truffle oil, crispy mushrooms, fresh black pepper, Pecorino', tag: 'Gourmet' },
        { id: 88, name: 'FIRE ALARM', desc: 'Pomodoro, green chilli, onion, fried garlic shaving, bellpeppers, fresh paprika', tag: 'Spicy' },
        { id: 89, name: 'BURRATA PIZZA', desc: 'Pomodoro sauce, pesto swirl, fresh basil, whole fresh Burrata ball, Parmesan' },
        { id: 90, name: 'VERDURE PIZZA', desc: 'Zucchini ribbons, sweet corn, red onion, mozzarella, marinara, chimichurri' },
        { id: 91, name: 'SUNSHINE PIZZA', desc: 'Creamy pumpkin purée base, sautéed spinach, fresh paprika, Fior di Latte mozzarella' },
        { id: 92, name: 'RATATOUILLE PIZZA', desc: 'Slow-roasted vegetables in a rich tomato sauce, inspired by classic Italian ratatouille', isVeg: true }
      ]
    },
    {
      id: 'garlicbreads',
      title: 'Baked Garlic Breads & Add-ons',
      subtitle: 'Sides & Dips',
      image: 'https://images.unsplash.com/photo-1573145959539-79ad3c68f433?auto=format&fit=crop&w=600&q=80',
      quote: 'Freshly baked sourdough garlic slabs served hot with specialty house dips.',
      items: [
        { id: 93, name: 'FIRE & GARLIC BREAD', desc: 'Rich garlic butter and a hint of chili heat for a bold kick' },
        { id: 94, name: 'CHEESY MUNCH BREAD', desc: 'Warm herb butter topped with a loaded cheese blend' },
        { id: 95, name: 'ROSSO VERDRE BREAD', desc: 'Sundried tomato jalapeño spread topped with fresh basil pesto' },
        { id: 96, name: 'INDO TRIO BREAD', desc: 'Soya keema, hot Sriracha, Fior di Latte mozzarella, garlic slivers' }
      ]
    },
    {
      id: 'desserts',
      title: 'Sweet Endings',
      subtitle: 'Dolce',
      image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=600&q=80',
      quote: 'Indulgent, handcrafted desserts to complete your sensory journey.',
      items: [
        { id: 97, name: 'CLASSIC TIRAMISU', desc: 'Chocolate soil crumbles, airy coffee cloud, creamy mascarpone layers' },
        { id: 98, name: 'MIDNIGHT LECHES', desc: 'Coffee Espuma, espresso-soaked sponge cake, dusting of rich cacao' },
        { id: 99, name: 'BLUSH BERRY COTTA', desc: 'Berry coulis, fresh berry salsa served on a silky, cold cream base' },
        { id: 100, name: 'BLOC NOIR', desc: 'Terre de cacao, toasted nuts, vanilla cream, velvet chocolate crumbs' }
      ]
    }
  ];

  // Beverage & Drinks categories (from official Ciro Co. Beverage Menu)
  const drinksCategories: MenuCategory[] = [
    {
      id: 'drinks-signature',
      title: 'Signature Creations',
      subtitle: 'House Alchemy',
      image: '/assets/drinks/custard-matcha.jpg',
      quote: 'Crafted in small batches with cold brew, ceremonial matcha, and velvet foams.',
      items: [
        { id: 101, name: 'MONT BLANC', desc: 'Slow-steeped cold brew topped with decadent hand-whipped vanilla cream.', calVolume: '130 kcal · 240ml', tag: "Chef's Pick" },
        { id: 102, name: 'SNOW CAP', desc: 'Cold brew finished with a hand-whipped cream cap and fresh fragrant orange zest.', calVolume: '150 kcal · 260ml' },
        { id: 103, name: 'SALTED CARAMEL MOCHA', desc: 'Double espresso, melted dark chocolate, sea salt caramel, silky milk. Hot or iced.', calVolume: '330 kcal · 300ml' },
        { id: 104, name: 'NITRO ORANGE COLD BREW', desc: 'Velvety micro-foamed nitro cold brew infused with fresh sweet orange juice.', calVolume: '60 kcal · 290ml' },
        { id: 105, name: 'NUTELLA CHEESECAKE LATTE', desc: 'Espresso shot layered with warm Nutella, sweet mascarpone, and rich cream cheese.', calVolume: '1390 kcal · 300ml', tag: 'Decadent' },
        { id: 106, name: 'MOCHA TIRAMISU LATTE', desc: 'Espresso, dark chocolate, house tiramisu cream, crowned with a slice of tiramisu cake.', calVolume: '150 kcal · 260ml', tag: "Chef's Pick" },
        { id: 107, name: 'UBE COCONUT ICED LATTE', desc: 'Bold espresso layered over earthy purple ube cream, coconut milk, and ice.', calVolume: '330 kcal · 300ml' },
        { id: 108, name: 'BISCOFF AFFOGATO', desc: 'Hot espresso poured over Madagascar vanilla gelato, Lotus Biscoff spread, crumbs & Nutella drizzle.', calVolume: '360 kcal · 170ml' },
        { id: 109, name: 'CUSTARD MATCHA', desc: 'Vibrant ceremonial Uji matcha, luscious house custard cream, and sweetened condensed milk.', calVolume: '350 kcal · 260ml', tag: "Chef's Pick" },
        { id: 110, name: 'MATCHA AFFOGATO', desc: 'Stone-ground emerald matcha poured tableside over rich vanilla ice cream.', calVolume: '260 kcal · 140ml' }
      ]
    },
    {
      id: 'drinks-brews',
      title: 'Manual Brews & Hot Coffee',
      subtitle: 'Single Origin Roasts',
      image: '/assets/drinks/night-sky-mocha.jpg',
      quote: 'Every bean ground fresh, extracted with precision temperature and timeless craft.',
      items: [
        { id: 111, name: 'V60 POUR OVER', desc: 'Hand-poured single origin filter extraction, remarkably clean and aromatic. Hot or iced.', calVolume: '5 kcal · 250ml' },
        { id: 112, name: 'AEROPRESS', desc: 'Gentle air-pressure immersion brew extracting delicate floral and bright fruity notes.', calVolume: 'under 5 kcal · 200ml' },
        { id: 113, name: 'FRENCH PRESS', desc: 'Classic full-immersion steep for a rich, full-bodied coffee with natural essential oils.', calVolume: '5 kcal · 300ml' },
        { id: 114, name: 'ESPRESSO', desc: 'Double shot extracted at 9 bars of pressure with a thick, golden hazelnut crema.', calVolume: 'under 5 kcal · 30ml' },
        { id: 115, name: 'LONG BLACK', desc: 'Double espresso gently floated over steaming hot water to preserve the crema intact.', calVolume: '5 kcal · 60ml' },
        { id: 116, name: 'CORTADO', desc: 'Equal parts double espresso and silky steamed whole milk for perfect equilibrium.', calVolume: '45 kcal · 120ml' },
        { id: 117, name: 'CAPPUCCINO', desc: 'Balanced espresso, sweet steamed milk, and a dense, cushiony micro-foam dome.', calVolume: '100 kcal · 210ml' },
        { id: 118, name: 'CAFÉ LATTE', desc: 'Espresso enveloped in velvety steamed milk topped with delicate barista art.', calVolume: '130 kcal · 260ml' },
        { id: 119, name: 'NIGHT SKY MOCHA', desc: 'Espresso, Tenero 57% dark chocolate, steamed milk, and activated edible charcoal.', calVolume: '260 kcal · 260ml', tag: 'House Signature' },
        { id: 120, name: 'SPANISH LATTE', desc: 'Rich espresso combined with sweetened condensed milk and steamed whole milk.', calVolume: '200 kcal · 260ml' }
      ]
    },
    {
      id: 'drinks-iced-frappes',
      title: 'Iced Lattes & Frappes',
      subtitle: 'Over Ice & Blended',
      image: '/assets/drinks/mocha-tiramisu-latte.jpg',
      quote: 'Chilled espresso shaken with velvety cream, ice, and infused syrups.',
      note: 'Add flavour shot (+50 kcal) · Oat or Almond milk substitution (+100 kcal) available upon request.',
      items: [
        { id: 121, name: 'CLASSIC ICED LATTE', desc: 'Double shot espresso poured over chilled fresh milk and crystal ice blocks.', calVolume: '130 kcal · 260ml' },
        { id: 122, name: 'ROASTED HAZELNUT ICED LATTE', desc: 'Aromatic roasted hazelnut syrup, pulled espresso, cold milk, and ice.', calVolume: '200 kcal · 280ml' },
        { id: 123, name: 'SPANISH ICED LATTE', desc: 'Sweet condensed milk base, cold whole milk, ice, topped with freshly pulled espresso.', calVolume: '240 kcal · 280ml' },
        { id: 124, name: 'IRISH ICED LATTE', desc: 'Non-alcoholic Irish cream syrup infusion, espresso, and silky chilled milk.', calVolume: '200 kcal · 280ml' },
        { id: 125, name: 'STRAWBERRY ICED LATTE', desc: 'Layered fresh strawberry puree, velvety cold milk, espresso, and crushed ice.', calVolume: '230 kcal · 300ml' },
        { id: 126, name: 'BISCOFF ICED LATTE', desc: 'Lotus Biscoff cookie spread melted into espresso, condensed milk, cream, and ice.', calVolume: '320 kcal · 290ml' },
        { id: 127, name: 'DATES ICED LATTE', desc: 'Medjool date syrup, creamy coconut milk, espresso, and ice.', calVolume: '240 kcal · 290ml' },
        { id: 128, name: 'CLASSIC FRAPPE', desc: 'Espresso, vanilla bean ice cream, and cold milk blended smooth with crushed ice.', calVolume: '290 kcal · 280ml' },
        { id: 129, name: 'ROASTED HAZELNUT FRAPPE', desc: 'Rich hazelnut syrup blended with espresso, vanilla ice cream, and whipped cream.', calVolume: '330 kcal · 300ml' },
        { id: 130, name: 'IRISH FRAPPE', desc: 'Espresso blended with Irish notes, creamy milk gelato, and ice.', calVolume: '330 kcal · 300ml' },
        { id: 131, name: 'MOCHA FRAPPE', desc: 'Rich chocolate fudge, espresso, and ice cream blended to frosty perfection.', calVolume: '380 kcal · 300ml' },
        { id: 132, name: 'BISCOFF FRAPPE', desc: 'Lotus Biscoff cookie butter, crunchy biscuit crumbs, espresso, and ice cream.', calVolume: '390 kcal · 300ml', tag: 'Crowd Favorite' }
      ]
    },
    {
      id: 'drinks-coldbrew',
      title: 'Artisanal Cold Brews',
      subtitle: '16-Hour Slow Steep',
      image: '/assets/drinks/cranberry-espresso-tonic.jpg',
      quote: 'Steeped low and slow for sixteen hours to extract sweet cocoa notes without bitterness.',
      items: [
        { id: 133, name: 'CLASSIC COLD BREW', desc: 'Pure, crystal-clear 16-hour steeped cold brew served over a hand-carved ice sphere.', calVolume: '5 kcal · 250ml' },
        { id: 134, name: 'COLD BREW TONIC', desc: 'Crisp Indian tonic water topped with a floating crown of cold brew and citrus oil.', calVolume: '120 kcal · 290ml' },
        { id: 135, name: 'BERRY BREW', desc: 'House cold brew, wild berry compote, tart cranberry juice, and effervescent tonic.', calVolume: '240 kcal · 280ml' },
        { id: 136, name: 'CRANBERRY ESPRESSO TONIC', desc: 'Vibrant ruby cranberry juice, bubbly tonic, float of dark espresso, and fresh skewered berries.', calVolume: '110 kcal · 270ml', tag: "Chef's Pick" },
        { id: 137, name: 'YUZU ORANGE COLD BREW', desc: 'Cold brew layered with Japanese yuzu citrus, fresh orange juice, raw honey, and lemon.', calVolume: '90 kcal · 260ml' },
        { id: 138, name: 'BARREL-AGED COLD BREW', desc: 'Aged in charred oak barrels with complex smoky rum and single malt botanical notes (alcohol-free).', calVolume: '5 kcal · 250ml', tag: 'Specialty Batch' }
      ]
    },
    {
      id: 'drinks-matcha-viet',
      title: 'Vietnamese, Matcha & Cocoa',
      subtitle: 'East Asian Rituals',
      image: '/assets/drinks/matcha-latte.jpg',
      quote: 'From ceremonial grade Uji green tea to rich 57% Tenero single-origin dark chocolate.',
      items: [
        { id: 139, name: 'VIETNAMESE CLASSIC', desc: 'Traditional Vietnamese Phin drip dark roast coffee stirred over sweet condensed milk and ice.', calVolume: '120 kcal · 220ml' },
        { id: 140, name: 'VIETNAMESE COCONUT', desc: 'House-blend dark roast, silky coconut milk, condensed milk, and shaved ice.', calVolume: '190 kcal · 250ml' },
        { id: 141, name: 'CEREMONIAL MATCHA', desc: 'Shade-grown Japanese stone-ground matcha whisked with oat milk and vanilla. Hot or iced.', calVolume: '160 kcal · 240ml' },
        { id: 142, name: 'CLOUD MATCHA', desc: 'Emerald ceremonial matcha layered over tender coconut water, sweet cream, and condensed milk.', calVolume: '180 kcal · 230ml', tag: 'Signature' },
        { id: 143, name: 'BERRY MATCHA', desc: 'Ceremonial matcha whisked over wild berry compote, oat milk, coconut, and vanilla.', calVolume: '230 kcal · 250ml' },
        { id: 144, name: 'WHITE CHOCOLATE MATCHA', desc: 'Matcha whisked into melted Tenero white chocolate, whole milk, and cream.', calVolume: '310 kcal · 240ml' },
        { id: 145, name: 'CLASSIC HOT CHOCOLATE', desc: 'Melted Tenero 57% dark single-origin chocolate, steamed whole milk, and velvet cream.', calVolume: '310 kcal · 240ml' },
        { id: 146, name: 'ICED CHOCOLATE', desc: 'Tenero 57% dark chocolate ganache shaken with cold milk, cream, and poured over ice.', calVolume: '310 kcal · 240ml' }
      ]
    },
    {
      id: 'drinks-teas-shakes',
      title: 'Teas, Infusions & Shakes',
      subtitle: 'Botanical & Indulgent',
      image: '/assets/drinks/strawberry-nutella-shake.jpg',
      quote: 'Hand-plucked mountain leaves, spiced Indian chai, and artisanal ice-cream shakes.',
      items: [
        { id: 147, name: 'MASALA TEA', desc: 'Slow-simmered Assam whole leaf tea brewed with whole milk and house roasted spices.', calVolume: '90 kcal · 240ml' },
        { id: 148, name: 'HIMALAYAN GREEN TEA', desc: 'Delicate whole leaf green tea steeped gently for pure floral clarity.', calVolume: 'under 5 kcal · 200ml' },
        { id: 149, name: 'GINGER HONEY LEMON', desc: 'Crushed fresh ginger root, amber forest honey, and freshly squeezed lemon juice.', calVolume: '50 kcal · 220ml' },
        { id: 150, name: 'HONEY LEMONGRASS', desc: 'Fragrant fresh lemongrass stalk infusion sweetened with raw wildflower honey.', calVolume: '50 kcal · 220ml' },
        { id: 151, name: 'CHAMOMILE', desc: 'Whole Egyptian chamomile blossoms brewed hot. Soothing, floral, naturally caffeine-free.', calVolume: 'under 5 kcal · 200ml' },
        { id: 152, name: 'OREO SHAKE', desc: 'Whole Oreo cookies blended with Madagascar vanilla gelato and chilled whole milk.', calVolume: '510 kcal · 320ml' },
        { id: 153, name: 'BISCOFF SHAKE', desc: 'Spiced caramelized Biscoff spread, crushed biscuits, vanilla gelato, and milk.', calVolume: '540 kcal · 320ml' },
        { id: 154, name: 'STRAWBERRY NUTELLA SHAKE', desc: 'Fresh mountain strawberries blended with Italian Nutella and sweet vanilla cream.', calVolume: '490 kcal · 340ml', tag: 'House Special' },
        { id: 155, name: 'RICH CHOCOLATE & NUTTY', desc: 'Tenero dark chocolate, toasted almonds, walnuts, vanilla ice cream, and milk.', calVolume: '590 kcal · 320ml' },
        { id: 156, name: 'WHEY PROTEIN SHAKE', desc: '30g Optimum Nutrition whey protein, toasted seeds, raw nuts, and rolled oats. Vanilla or chocolate.', calVolume: '510 kcal · 320ml', tag: 'Fitness Fuel' }
      ]
    },
    {
      id: 'drinks-mocktails',
      title: 'Smoothies & Bar Mocktails',
      subtitle: 'Zero-Proof Mixology',
      image: '/assets/drinks/cranberry-mojito.jpg',
      quote: 'Fruit blended with curd and honey, alongside handcrafted zero-proof bar cocktails.',
      items: [
        { id: 157, name: 'BERRY SMOOTHIE', desc: 'Mixed forest berries, tart berry compote, artisanal curd, and mountain honey.', calVolume: '300 kcal · 320ml' },
        { id: 158, name: 'AVOCADO BANANA SMOOTHIE', desc: 'Ripe Hass avocado, Cavendish banana, fresh curd, Medjool dates, and amber honey.', calVolume: '375 kcal' },
        { id: 159, name: 'PALOMA', desc: 'Pink grapefruit juice, agave nectar, lime, sparkling soda, and Himalayan pink salt rim.', calVolume: '110 kcal · 300ml' },
        { id: 160, name: 'PIÑA COLADA', desc: 'Fresh roasted pineapple juice, pressed coconut cream, and Madagascar vanilla ice cream.', calVolume: '260 kcal · 250ml', tag: "Chef's Pick" },
        { id: 161, name: 'MIXED BERRY SPRITZ', desc: 'House berry compote, fresh spearmint, Sicilian lemon juice, and fizzy soda water.', calVolume: '170 kcal · 280ml' },
        { id: 162, name: 'CRANBERRY MOJITO', desc: 'Tart cranberry reduction, crushed spearmint, lime wheel, and sparkling soda.', calVolume: '170 kcal · 300ml', tag: 'Signature' },
        { id: 163, name: 'VIRGIN MOJITO', desc: 'Freshly muddled Persian lime wedges, garden spearmint leaves, cane sugar, and chilled soda.', calVolume: '140 kcal · 240ml' },
        { id: 164, name: 'MIDNIGHT SPARKLE', desc: 'Spiced Indian jamun fruit, fresh lemon, craft ginger ale, and torched rosemary sprig.', calVolume: '110 kcal · 280ml', tag: 'Craft Special' },
        { id: 165, name: 'SPICY GUAVA', desc: 'Pink guava nectar, pink grapefruit, lime juice, and a rim of bird\'s eye chilli salt.', calVolume: '170 kcal · 260ml', tag: 'Spicy & Tart' }
      ]
    },
    {
      id: 'drinks-juices',
      title: 'Iced Teas & Pressed Juices',
      subtitle: 'Pressed To Order',
      image: '/assets/drinks/peach-iced-tea.jpg',
      quote: 'Cold-pressed daily without added water or artificial syrups, served chilled.',
      items: [
        { id: 166, name: 'SIGNATURE ICED TEA', desc: 'Brewed black tea infused with lemon, fragrant kaffir lime, and Japanese yuzu.', calVolume: '90 kcal · 240ml' },
        { id: 167, name: 'PEACH ICED TEA', desc: 'Refreshing iced tea infused with natural white peach, kaffir lime, and lemon.', calVolume: 'under 5 kcal · 200ml', tag: 'Refreshing' },
        { id: 168, name: 'PASSION FRUIT ICED TEA', desc: 'Tart tropical passion fruit pulp, yuzu citrus, and chilled black tea.', calVolume: '50 kcal · 220ml' },
        { id: 169, name: 'FRESH LIME (SHIKANJI)', desc: 'Hand-pressed fresh lime, sparkling soda or still water, sweetened with organic jaggery or raw sugar.', calVolume: '90 kcal · 270ml' },
        { id: 170, name: 'MASALA LEMONADE', desc: 'Fresh lime juice, secret house chaat masala spice, and bubbly soda water.', calVolume: '90 kcal · 270ml' },
        { id: 171, name: 'PRETTY IN PINK JUICE', desc: 'Cold-pressed pineapple, tart green apple, earthy beetroot, and pink ginger salt.', calVolume: '120 kcal · 260ml', tag: 'Cold Pressed' },
        { id: 172, name: 'CITRUS AMALFI JUICE', desc: 'Pure cold-pressed Valencia oranges infused with fresh kaffir lime leaves.', calVolume: '110 kcal · 250ml' },
        { id: 173, name: 'ABC DETOX JUICE', desc: 'Pure extract of crisp apple, fresh beetroot, and sweet tender mountain carrots.', calVolume: '110 kcal · 280ml' },
        { id: 174, name: 'BLUSH WATERMELON PRESS', desc: 'Pure sweet ruby watermelon cold-pressed with muddled garden mint.', calVolume: '90 kcal · 300ml' },
        { id: 175, name: 'SOFT DRINKS & TONICS', desc: 'Red Bull (110 kcal · 250ml) · Diet Coke (0 kcal) · Coke (130 kcal) · Tonic Water (70 kcal).', calVolume: 'Chilled Cans' }
      ]
    }
  ];

  // Jump navigation sections
  const foodSections = [
    { number: '01', label: 'Rituals', targetId: 'smoothies' },
    { number: '02', label: 'Salads & Soups', targetId: 'soups' },
    { number: '03', label: 'Toasties & Fries', targetId: 'toasties' },
    { number: '04', label: 'Mexican', targetId: 'tacos' },
    { number: '05', label: 'Italian Tapas', targetId: 'italianstarters' },
    { number: '06', label: 'Pastas', targetId: 'stuffedpastas' },
    { number: '07', label: 'Pizzas', targetId: 'pizzasclassics' },
    { number: '08', label: 'Dolce & Sides', targetId: 'garlicbreads' },
  ];

  const drinksSections = [
    { number: '01', label: 'Signatures', targetId: 'drinks-signature' },
    { number: '02', label: 'Brews & Espresso', targetId: 'drinks-brews' },
    { number: '03', label: 'Iced & Frappes', targetId: 'drinks-iced-frappes' },
    { number: '04', label: 'Cold Brews', targetId: 'drinks-coldbrew' },
    { number: '05', label: 'Matcha & Cocoa', targetId: 'drinks-matcha-viet' },
    { number: '06', label: 'Teas & Shakes', targetId: 'drinks-teas-shakes' },
    { number: '07', label: 'Mocktails', targetId: 'drinks-mocktails' },
    { number: '08', label: 'Pressed Juices', targetId: 'drinks-juices' },
  ];

  const activeCategories = menuMode === 'food' ? foodCategories : drinksCategories;
  const activeSections = menuMode === 'food' ? foodSections : drinksSections;

  const handleModeChange = (mode: 'food' | 'drinks') => {
    setMenuMode(mode);
    window.history.replaceState(null, '', mode === 'food' ? '#full-menu' : '#drinks-menu');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollToSection = (targetId: string) => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="relative min-h-screen w-full bg-ciro-cream text-ciro-dark py-24 px-4 md:px-8 overflow-hidden">
      
      {/* Light dot grid paper style background */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(var(--color-ciro-dark) 1.5px, transparent 1.5px)`,
          backgroundSize: '24px 24px',
          backgroundPosition: '0 0'
        }}
      />

      {/* Centered Journal Masthead Header */}
      <div className="w-full mb-8 flex flex-col items-center text-center relative z-30 px-4 md:px-12 max-w-4xl mx-auto">
        <span className="font-mono text-[9px] tracking-[0.35em] text-ciro-olive uppercase mb-2">
          EST. 2026 • JAIPUR, INDIA
        </span>
        <h1 className="font-serif font-medium text-4xl md:text-5xl lg:text-6xl text-ciro-olive uppercase tracking-tight leading-none mb-3">
          {menuMode === 'food' ? 'THE JOURNAL OF FLAVOR' : 'THE BEVERAGE FOLIO'}
        </h1>
        <p className="font-sans font-medium text-xs md:text-sm text-ciro-dark/70 tracking-wide max-w-lg">
          {menuMode === 'food'
            ? 'Artisanal sourdough bakes, handcrafted bronze-die stuffed pastas, and vibrant Mexican street tapas.'
            : 'Ceremonial Japanese matcha, slow-steeped 16h cold brews, single-origin roasts & zero-proof mixology.'}
        </p>
        <div className="w-12 h-[1px] bg-ciro-olive/30 mt-3" />
      </div>

      {/* Luxury Segmented Menu Toggle */}
      <div className="w-full max-w-xl mx-auto mb-10 flex justify-center px-4 relative z-30">
        <div className="bg-[#EFE8DC] p-1.5 rounded-full border border-ciro-dark/15 shadow-inner flex items-center gap-1 w-full max-w-md">
          <button
            type="button"
            onClick={() => handleModeChange('food')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-full font-serif font-medium text-xs md:text-sm transition-all duration-300 cursor-pointer ${
              menuMode === 'food'
                ? 'bg-ciro-olive text-ciro-cream shadow-sm'
                : 'text-ciro-dark/70 hover:text-ciro-dark'
            }`}
          >
            <UtensilsCrossed className="w-3.5 h-3.5" />
            <span>CUCINA (FOOD)</span>
          </button>
          
          <button
            type="button"
            onClick={() => handleModeChange('drinks')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-full font-serif font-medium text-xs md:text-sm transition-all duration-300 cursor-pointer ${
              menuMode === 'drinks'
                ? 'bg-ciro-olive text-ciro-cream shadow-sm'
                : 'text-ciro-dark/70 hover:text-ciro-dark'
            }`}
          >
            <Coffee className="w-3.5 h-3.5" />
            <span>BEVERAGES (DRINKS)</span>
          </button>
        </div>
      </div>

      {/* Sticky Jump Navigation Bar (Centered Editorial index) */}
      <div className="sticky top-16 z-30 w-full mb-16 bg-ciro-cream/95 backdrop-blur-md border-b border-ciro-dark/5 py-4 flex justify-start lg:justify-center gap-8 overflow-x-auto scrollbar-none snap-x px-4 md:px-12">
        {activeSections.map((sec, idx) => (
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
      <div className="w-full relative py-8 pl-12 pr-4 md:pl-24 md:pr-12">
        
        {/* Paper texture overlay */}
        <div className="absolute inset-0 bg-noise pointer-events-none opacity-[0.02]" />

        {/* Continuous Binder Margin Line */}
        <div className="absolute left-2 md:left-4 top-0 bottom-0 w-8 flex flex-col justify-between py-12 pointer-events-none border-r border-ciro-dark/5">
          <div className="absolute inset-y-0 right-3 w-0.5 bg-ciro-dark/15 shadow-inner" />
        </div>

        {/* Categories rendering with expanded spacing */}
        <div className="flex flex-col gap-36 relative z-10">
          {activeCategories.map((cat, catIdx) => {
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

                {/* Optional special note (e.g., barista customizations) */}
                {cat.note && (
                  <div className="mb-8 p-3 rounded-xl bg-ciro-olive/10 border border-ciro-olive/20 text-xs font-mono text-ciro-dark/80 flex items-center gap-2">
                    <Coffee className="w-4 h-4 text-ciro-olive flex-shrink-0" />
                    <span>{cat.note}</span>
                  </div>
                )}

                {/* Content Grid: Photo + List (alternating order) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                  
                  {/* Image Column */}
                  <div className={`col-span-1 lg:col-span-5 flex justify-center ${
                    isImageLeft ? 'lg:order-1' : 'lg:order-2'
                  }`}>
                    <div className="relative group/img flex-shrink-0 w-full max-w-[280px]">
                      {/* Circular/Oval photo with thick borders & shadow */}
                      <div className="w-full aspect-square rounded-full overflow-hidden border-3 border-ciro-dark shadow-retro group-hover/img:shadow-retro-orange transition-all duration-300 transform group-hover/img:-rotate-2 scale-98 group-hover/img:scale-100 bg-[#E8E2D5]">
                        <img 
                          src={cat.image} 
                          alt={cat.title}
                          className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-700" 
                          loading="lazy"
                        />
                      </div>
                      
                      {/* Sparkle decorative element */}
                      <div className="absolute top-2 right-2 bg-ciro-saffron p-1.5 rounded-full border border-ciro-dark shadow-sm">
                        <Sparkles className="w-4 h-4 text-ciro-espresso" />
                      </div>
                    </div>
                  </div>

                  {/* List Column */}
                  <div className={`col-span-1 lg:col-span-7 flex flex-col gap-6 ${
                    isImageLeft ? 'lg:order-2' : 'lg:order-1'
                  }`}>
                    {cat.items.map((item, itemIdx) => (
                      <div key={item.id} className="relative pt-2">
                        
                        {/* Dotted Separator Line */}
                        {itemIdx > 0 && (
                          <div className="absolute top-[-12px] left-0 right-0 flex items-center">
                            <div className="w-full border-t border-dotted border-ciro-olive/25" />
                            
                            {/* Item Number Badge directly on the dotted line */}
                            <div className="absolute left-[8%] transform -translate-x-1/2 bg-ciro-olive text-ciro-cream font-mono text-[9px] w-[20px] h-[20px] flex items-center justify-center rounded-full border border-ciro-cream/30 z-10 shadow-sm">
                              {item.id}
                            </div>
                          </div>
                        )}

                        {/* Item Details */}
                        <div>
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <div className="flex items-center gap-2 flex-wrap">
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
                              {item.tag && (
                                <span className="font-mono text-[8px] uppercase tracking-wider bg-ciro-saffron/80 text-ciro-espresso px-2 py-0.5 rounded-full border border-ciro-dark/15 font-semibold">
                                  ★ {item.tag}
                                </span>
                              )}
                            </div>

                            {/* Calorie & Volume indicator (No price!) */}
                            {item.calVolume && (
                              <span className="font-mono text-[10px] text-ciro-olive/80 bg-ciro-olive/10 border border-ciro-olive/20 px-2.5 py-0.5 rounded-full">
                                {item.calVolume}
                              </span>
                            )}
                          </div>
                          
                          <p className="font-sans font-medium text-[11px] md:text-xs text-ciro-dark/70 mt-1.5 leading-relaxed max-w-[95%]">
                            {item.desc}
                          </p>
                        </div>

                      </div>
                    ))}

                    {/* Cursive Handwriting Quote under the list in Bristol Hand */}
                    {cat.quote && (
                      <div className="mt-4 pt-4 border-t border-dashed border-ciro-espresso/15 text-right">
                        <p className="font-bristol text-lg md:text-xl text-ciro-espresso leading-snug tracking-normal">
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

        {/* Switch Menu Section CTA banner */}
        <div className="mt-24 p-8 rounded-2xl bg-[#EFE8DC] border border-ciro-dark/15 flex flex-col md:flex-row justify-between items-center gap-6 relative z-10 shadow-sm">
          <div>
            <h4 className="font-serif font-medium text-xl text-ciro-olive">
              {menuMode === 'food' ? 'Thirsty? Explore Our Beverage Menu' : 'Hungry? Explore Our Cucina Food Menu'}
            </h4>
            <p className="font-sans text-xs text-ciro-dark/70 mt-1">
              {menuMode === 'food'
                ? 'Discover our ceremonial matcha, 16h cold brews, frappes, and zero-proof mocktails.'
                : 'Discover our 48h sourdough pizzas, handmade stuffed pastas, and Mexican tapas.'}
            </p>
          </div>
          <button
            type="button"
            onClick={() => handleModeChange(menuMode === 'food' ? 'drinks' : 'food')}
            className="flex-shrink-0 bg-ciro-olive text-ciro-cream hover:bg-ciro-dark border border-ciro-dark px-6 py-3 rounded-full font-serif font-medium text-xs tracking-wider uppercase transition-all duration-300 flex items-center gap-2 shadow-sm cursor-pointer"
          >
            <span>{menuMode === 'food' ? 'View Beverages & Drinks' : 'View Cucina Food Menu'}</span>
            {menuMode === 'food' ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Footer of the paper sheet */}
        <div className="mt-16 pt-10 border-t-2 border-ciro-dark flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
          <div className="text-center md:text-left">
            <h4 className="font-serif font-medium text-lg text-ciro-olive">CIRO CO.</h4>
            <p className="font-sans text-xs text-ciro-dark/60 mt-1">Cucina, Culture & Coffee • Jaipur, Rajasthan</p>
            <p className="font-sans text-[11px] text-ciro-dark/50 mt-0.5">All dishes & beverages are 100% vegetarian.</p>
          </div>
          <span className="font-mono text-xs text-ciro-dark/40 tracking-widest uppercase">
            END OF {menuMode === 'food' ? 'FOOD' : 'BEVERAGE'} FOLIO
          </span>
        </div>

      </div>
    </section>
  );
};

export default FullMenu;
