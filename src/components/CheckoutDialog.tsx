import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CheckCircle2, Loader2, CreditCard, Banknote, Smartphone } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';

interface CheckoutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CheckoutDialog: React.FC<CheckoutDialogProps> = ({ open, onOpenChange }) => {
  const { items, getTotalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const [step, setStep] = useState<'details' | 'processing' | 'confirmed'>('details');
  const [orderId, setOrderId] = useState('');

  const [form, setForm] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: user?.address || '',
    city: '',
    pincode: '',
    payment: 'upi',
  });

  const total = getTotalPrice();
  const deliveryFee = total > 500 ? 0 : 49;
  const grandTotal = total + deliveryFee;

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setStep('processing');
    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    setOrderId(`SS${Date.now().toString().slice(-8)}`);
    setStep('confirmed');
    clearCart();
  };

  const handleClose = () => {
    onOpenChange(false);
    if (step === 'confirmed') {
      setStep('details');
      setForm({ name: '', phone: '', address: '', city: '', pincode: '', payment: 'upi' });
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        {step === 'details' && (
          <>
            <DialogHeader>
              <DialogTitle>Checkout</DialogTitle>
              <DialogDescription>
                Enter your delivery details to place your order. Your payment is secure and encrypted.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handlePlaceOrder} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="co-name">Full Name</Label>
                <Input
                  id="co-name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="co-phone">Phone Number</Label>
                <Input
                  id="co-phone"
                  type="tel"
                  placeholder="+91 9876543210"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="co-address">Delivery Address</Label>
                <Textarea
                  id="co-address"
                  placeholder="House no, street, landmark"
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="co-city">City</Label>
                  <Input
                    id="co-city"
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="co-pincode">Pincode</Label>
                  <Input
                    id="co-pincode"
                    placeholder="400001"
                    value={form.pincode}
                    onChange={(e) => setForm({ ...form, pincode: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Payment Method</Label>
                <RadioGroup
                  value={form.payment}
                  onValueChange={(v) => setForm({ ...form, payment: v })}
                  className="space-y-2"
                >
                  <div className="flex items-center space-x-2 border rounded-md p-3">
                    <RadioGroupItem value="upi" id="pay-upi" />
                    <Label htmlFor="pay-upi" className="flex items-center gap-2 cursor-pointer">
                      <Smartphone className="h-4 w-4" /> UPI (GPay, PhonePe, Paytm)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 border rounded-md p-3">
                    <RadioGroupItem value="card" id="pay-card" />
                    <Label htmlFor="pay-card" className="flex items-center gap-2 cursor-pointer">
                      <CreditCard className="h-4 w-4" /> Credit / Debit Card
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 border rounded-md p-3">
                    <RadioGroupItem value="cod" id="pay-cod" />
                    <Label htmlFor="pay-cod" className="flex items-center gap-2 cursor-pointer">
                      <Banknote className="h-4 w-4" /> Cash on Delivery
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Order summary */}
              <div className="bg-light-sage/40 rounded-md p-4 space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal ({items.length} items)</span>
                  <span>₹{total.toFixed(0)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery fee</span>
                  <span>{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span>
                </div>
                <div className="flex justify-between font-bold text-base pt-1 border-t">
                  <span>Total</span>
                  <span className="text-primary">₹{grandTotal.toFixed(0)}</span>
                </div>
              </div>

              <Button type="submit" variant="hero" className="w-full">
                Place Order • ₹{grandTotal.toFixed(0)}
              </Button>
            </form>
          </>
        )}

        {step === 'processing' && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
            <h3 className="text-lg font-semibold">Processing your order...</h3>
            <p className="text-sm text-muted-foreground">Please don't close this window</p>
          </div>
        )}

        {step === 'confirmed' && (
          <div className="flex flex-col items-center justify-center py-8 text-center space-y-4">
            <CheckCircle2 className="h-16 w-16 text-fresh-green" />
            <div>
              <h3 className="text-xl font-bold">Order Confirmed!</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Order ID: <span className="font-mono font-semibold">{orderId}</span>
              </p>
            </div>
            <div className="bg-light-sage/40 rounded-md p-4 w-full text-sm space-y-1">
              <p>Delivering to: <span className="font-medium">{form.name}</span></p>
              <p className="text-muted-foreground">{form.address}, {form.city} - {form.pincode}</p>
              <p className="pt-1">Expected delivery: <span className="font-medium">Today, within 4 hours</span></p>
            </div>
            <Button variant="hero" className="w-full" onClick={handleClose}>
              Continue Shopping
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
