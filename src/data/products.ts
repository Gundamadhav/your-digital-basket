import { Product } from '@/components/ProductCard';
import applesImg from '@/assets/products/apples.jpg';
import bananasImg from '@/assets/products/bananas.jpg';
import breadImg from '@/assets/products/bread.jpg';
import milkImg from '@/assets/products/milk.jpg';
import eggsImg from '@/assets/products/eggs.jpg';
import tomatoesImg from '@/assets/products/tomatoes.jpg';

export const products: Product[] = [
  {
    id: '1',
    name: 'Organic Red Apples',
    price: 299,
    originalPrice: 399,
    image: applesImg,
    category: 'fruits',
    rating: 4.5,
    inStock: true,
    isOrganic: true,
    description: 'Fresh, crisp organic red apples from local farms'
  },
  {
    id: '2',
    name: 'Fresh Bananas',
    price: 149,
    image: bananasImg,
    category: 'fruits',
    rating: 4.2,
    inStock: true,
    isOrganic: false,
    description: 'Ripe, sweet bananas perfect for snacking'
  },
  {
    id: '3',
    name: 'Artisan Whole Wheat Bread',
    price: 299,
    originalPrice: 349,
    image: breadImg,
    category: 'bakery',
    rating: 4.8,
    inStock: true,
    isOrganic: true,
    description: 'Fresh baked whole wheat bread, made daily'
  },
  {
    id: '4',
    name: 'Organic Whole Milk',
    price: 89,
    image: milkImg,
    category: 'dairy',
    rating: 4.6,
    inStock: true,
    isOrganic: true,
    description: 'Fresh organic milk from grass-fed cows'
  },
  {
    id: '5',
    name: 'Free-Range Eggs',
    price: 199,
    image: eggsImg,
    category: 'dairy',
    rating: 4.7,
    inStock: true,
    isOrganic: false,
    description: 'Farm-fresh eggs from free-range chickens'
  },
  {
    id: '6',
    name: 'Organic Tomatoes',
    price: 249,
    image: tomatoesImg,
    category: 'fruits',
    rating: 4.4,
    inStock: true,
    isOrganic: true,
    description: 'Juicy, vine-ripened organic tomatoes'
  },
  {
    id: '7',
    name: 'Premium Coffee Beans',
    price: 899,
    originalPrice: 999,
    image: breadImg, // placeholder
    category: 'beverages',
    rating: 4.9,
    inStock: false,
    isOrganic: true,
    description: 'Ethically sourced premium coffee beans'
  },
  {
    id: '8',
    name: 'Greek Yogurt',
    price: 179,
    image: milkImg, // placeholder
    category: 'dairy',
    rating: 4.3,
    inStock: true,
    isOrganic: false,
    description: 'Creamy, protein-rich Greek yogurt'
  },
  {
    id: '9',
    name: 'Organic Spinach',
    price: 119,
    image: tomatoesImg, // placeholder
    category: 'fruits',
    rating: 4.1,
    inStock: true,
    isOrganic: true,
    description: 'Fresh organic baby spinach leaves'
  },
  {
    id: '10',
    name: 'Sourdough Bread',
    price: 329,
    image: breadImg,
    category: 'bakery',
    rating: 4.6,
    inStock: true,
    isOrganic: false,
    description: 'Traditional sourdough bread with crispy crust'
  },
  {
    id: '11',
    name: 'Organic Carrots',
    price: 129,
    image: applesImg, // placeholder
    category: 'fruits',
    rating: 4.0,
    inStock: true,
    isOrganic: true,
    description: 'Fresh organic carrots, perfect for cooking'
  },
  {
    id: '12',
    name: 'Almond Milk',
    price: 249,
    image: milkImg,
    category: 'dairy',
    rating: 4.2,
    inStock: true,
    isOrganic: true,
    description: 'Smooth, creamy almond milk'
  }
];

export const getProductsByCategory = (category: string): Product[] => {
  if (category === 'all') return products;
  return products.filter(product => product.category === category);
};

export const searchProducts = (query: string): Product[] => {
  if (!query.trim()) return products;
  
  const searchTerm = query.toLowerCase().trim();
  return products.filter(product => 
    product.name.toLowerCase().includes(searchTerm) ||
    product.description?.toLowerCase().includes(searchTerm) ||
    product.category.toLowerCase().includes(searchTerm)
  );
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};
