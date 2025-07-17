import React, { useState, useMemo } from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Categories } from '@/components/Categories';
import { ProductCard } from '@/components/ProductCard';
import { CartProvider } from '@/contexts/CartContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { products, getProductsByCategory, searchProducts } from '@/data/products';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredProducts = useMemo(() => {
    let result = products;
    
    // Apply search filter
    if (searchQuery.trim()) {
      result = searchProducts(searchQuery);
    }
    
    // Apply category filter
    if (selectedCategory !== 'all') {
      result = result.filter(product => product.category === selectedCategory);
    }
    
    return result;
  }, [searchQuery, selectedCategory]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Reset category when searching
    if (query.trim()) {
      setSelectedCategory('all');
    }
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    // Clear search when selecting category
    setSearchQuery('');
  };

  return (
    <AuthProvider>
      <CartProvider>
      <div className="min-h-screen bg-background">
        <Header onSearch={handleSearch} searchQuery={searchQuery} />
        
        <main>
          <Hero />
          
          <Categories 
            onCategorySelect={handleCategorySelect}
            selectedCategory={selectedCategory}
          />
          
          {/* Products Section */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-foreground mb-2">
                    {searchQuery ? `Search Results for "${searchQuery}"` : 
                     selectedCategory === 'all' ? 'All Products' : 
                     `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Products`}
                  </h2>
                  <p className="text-muted-foreground">
                    {filteredProducts.length} products found
                  </p>
                </div>
              </div>

              {filteredProducts.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold mb-2">No products found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search or browse our categories
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                    />
                  ))}
                </div>
              )}
            </div>
          </section>
        </main>
        
        {/* Footer */}
        <footer className="bg-deep-navy text-primary-foreground py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">ShopSmart</h3>
                <p className="text-sm opacity-80">
                  Your trusted partner for fresh, organic, and local groceries delivered right to your door.
                </p>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold">Quick Links</h4>
                <ul className="space-y-2 text-sm opacity-80">
                  <li><a href="#" className="hover:opacity-100">About Us</a></li>
                  <li><a href="#" className="hover:opacity-100">Contact</a></li>
                  <li><a href="#" className="hover:opacity-100">FAQs</a></li>
                  <li><a href="#" className="hover:opacity-100">Support</a></li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold">Categories</h4>
                <ul className="space-y-2 text-sm opacity-80">
                  <li><a href="#" className="hover:opacity-100">Fresh Produce</a></li>
                  <li><a href="#" className="hover:opacity-100">Dairy & Eggs</a></li>
                  <li><a href="#" className="hover:opacity-100">Bakery</a></li>
                  <li><a href="#" className="hover:opacity-100">Beverages</a></li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold">Customer Service</h4>
                <ul className="space-y-2 text-sm opacity-80">
                  <li>📞 +91 1800-SHOP-SMART</li>
                  <li>✉️ support@shopsmart.in</li>
                  <li>🕒 Mon-Fri: 8AM-8PM IST</li>
                  <li>🕒 Sat-Sun: 9AM-6PM IST</li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm opacity-80">
              <p>&copy; 2024 ShopSmart India. All rights reserved. | Privacy Policy | Terms of Service</p>
            </div>
          </div>
        </footer>
      </div>
      </CartProvider>
    </AuthProvider>
  );
};

export default Index;
