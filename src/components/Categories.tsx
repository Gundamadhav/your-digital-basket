import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Apple, Milk, Cookie, Egg, Carrot, Coffee } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  color: string;
  count: number;
}

const categories: Category[] = [
  { id: 'fruits', name: 'Fruits & Vegetables', icon: Apple, color: 'bg-green-100 text-green-600', count: 120 },
  { id: 'dairy', name: 'Dairy & Eggs', icon: Milk, color: 'bg-blue-100 text-blue-600', count: 45 },
  { id: 'bakery', name: 'Bakery & Bread', icon: Cookie, color: 'bg-yellow-100 text-yellow-600', count: 78 },
  { id: 'meat', name: 'Meat & Seafood', icon: Egg, color: 'bg-red-100 text-red-600', count: 89 },
  { id: 'snacks', name: 'Snacks & Treats', icon: Carrot, color: 'bg-orange-100 text-orange-600', count: 156 },
  { id: 'beverages', name: 'Beverages', icon: Coffee, color: 'bg-purple-100 text-purple-600', count: 92 },
];

interface CategoriesProps {
  onCategorySelect: (category: string) => void;
  selectedCategory: string;
}

export const Categories: React.FC<CategoriesProps> = ({ onCategorySelect, selectedCategory }) => {
  return (
    <section className="py-12 bg-light-sage/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Shop by Category</h2>
          <p className="text-muted-foreground">Explore our wide range of fresh products</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => {
            const Icon = category.icon;
            const isSelected = selectedCategory === category.id;
            
            return (
              <Card
                key={category.id}
                className={`cursor-pointer transition-all hover:shadow-card hover:scale-105 ${
                  isSelected ? 'ring-2 ring-primary shadow-card' : ''
                }`}
                onClick={() => onCategorySelect(category.id)}
              >
                <CardContent className="p-4 text-center">
                  <div className={`w-12 h-12 rounded-full ${category.color} flex items-center justify-center mx-auto mb-3`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-sm text-foreground mb-1">{category.name}</h3>
                  <p className="text-xs text-muted-foreground">{category.count} items</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Show All Button */}
        <div className="text-center mt-8">
          <Button
            variant={selectedCategory === 'all' ? 'default' : 'category'}
            onClick={() => onCategorySelect('all')}
          >
            Show All Products
          </Button>
        </div>
      </div>
    </section>
  );
};