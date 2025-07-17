import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Leaf, Truck, Shield } from 'lucide-react';
import heroImage from '@/assets/hero-grocery.jpg';

export const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-hero">
      <div className="container mx-auto px-4 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                Fresh Groceries
                <span className="bg-gradient-primary bg-clip-text text-transparent block">
                  Delivered Daily
                </span>
              </h1>
              <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed">
                Shop the finest selection of organic, local, and fresh groceries. 
                From farm to your door in under 24 hours.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="hero" className="group">
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="category" size="hero">
                View Categories
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-8">
              <div className="text-center space-y-2">
                <div className="bg-primary-light p-3 rounded-full w-fit mx-auto">
                  <Leaf className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">100% Organic</h3>
                  <p className="text-xs text-muted-foreground">Certified fresh</p>
                </div>
              </div>
              
              <div className="text-center space-y-2">
                <div className="bg-primary-light p-3 rounded-full w-fit mx-auto">
                  <Truck className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Fast Delivery</h3>
                  <p className="text-xs text-muted-foreground">Same day</p>
                </div>
              </div>
              
              <div className="text-center space-y-2">
                <div className="bg-primary-light p-3 rounded-full w-fit mx-auto">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Quality Promise</h3>
                  <p className="text-xs text-muted-foreground">Guaranteed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-elevated">
              <img
                src={heroImage}
                alt="Fresh grocery store interior"
                className="w-full h-[400px] lg:h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
            </div>
            
            {/* Floating Card */}
            <div className="absolute -bottom-6 -left-6 bg-background p-6 rounded-xl shadow-elevated border">
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">2500+</p>
                <p className="text-sm text-muted-foreground">Happy Customers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};