import { useState } from 'react';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

const Checkout = ({ cartItems }: { cartItems: any[] }) => {
  const [email, setEmail] = useState('');
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleScreenshotChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setScreenshot(file);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async () => {
    if (!email || !screenshot) {
      alert('Please provide all required details.');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('email', email);
    formData.append('screenshot', screenshot);
    formData.append('cartItems', JSON.stringify(cartItems));

    try {
      // await axios.post('/api/submit-order', formData);
      // alert('Order submitted successfully! Check your email for updates.');
      console.log('Order submitted successfully! Check your email for updates.');
      console.log(cartItems[0]);
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Checkouting - {cartItems[0].name} | {cartItems[0].total}rs</h1>
      <div className="mb-4">
        <Label className="block mb-2">Email:</Label>
        <Input
          type="email"
          value={email}
          onChange={handleEmailChange}
          className="border border-gray-300 rounded-md p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <Label className="block mb-2">Screenshot:</Label>
        <Input
          type="file"
          accept="image/*"
          onChange={handleScreenshotChange}
          className="border border-gray-300 rounded-md p-2 w-full"
        />
      </div>
      <Button onClick={handleSubmit} disabled={loading}>
        Submit Order
      </Button>
    </div>
  );
};

export default Checkout;

