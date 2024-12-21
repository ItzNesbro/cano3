import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import axios from 'axios'

const Checkout = ({ cartItems }: { cartItems: any[] }) => {
  const [email, setEmail] = useState('');
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const webhookUrl = import.meta.env.VITE_WEBHOOK

  const handleScreenshotChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setScreenshot(file);
    }
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async () => {
    if (!email || !screenshot) {
      alert('Please provide both your email and a screenshot of the payment.');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        content: "New Order Received!",
        embeds: [
          {
            title: "Order Details",
            fields: [
              { name: "Email", value: email, inline: true },
              { name: "Address", value: address, inline: true },
              { name: "Cart Items", value: cartItems.map(item => `${item.name}: ${item.price}, Sets: ${item.sets}, Colors: ${item.colors}, Total: ${item.total}`).join("\n") }
            ],
            image: {
              url: screenshot
            }
          }
        ]
      };
      await axios.post(webhookUrl, payload);
      console.log('Order submitted successfully!', cartItems[0]);
      alert('Order submitted successfully! Check your email for updates.');
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 py-8">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-4 text-gray-800">
          Checkout
        </h1>
        <p className="text-gray-600 text-center mb-6">
          <strong>{cartItems[0].name}</strong> - ₹{cartItems[0].total}
        </p>
        <p className="text-gray-600 text-center mb-6">
          <strong>UPI: {import.meta.env.VITE_UPI}</strong>
        </p>

        <div className="mb-6">
          <Label htmlFor="email" className="block text-gray-700 mb-2">
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter your email"
            className="w-full"
          />
        </div>

        <div className="mb-6">
          <Label htmlFor="screenshot" className="block text-gray-700 mb-2">
            Payment Screenshot
          </Label>
          <Input
            id="screenshot"
            type="file"
            accept="image/*"
            onChange={handleScreenshotChange}
            className="w-full"
          />
        </div>

        <div className='mb-6'>
          <Label htmlFor="address" className="block text-gray-700 mb-2">
            Address
          </Label>
          <Input
            id="address"
            type="text"
            placeholder="Enter your address, make sure it is correct"
            className="w-full"
            value={address}
            onChange={handleAddressChange}
          />
        </div>

        <Button
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600'
            }`}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-gray-900"></div>
              Submitting...
            </div>
          ) : (
            'Submit Order'
          )}
        </Button>

        <p className="text-sm text-gray-500 mt-4 text-center">
          Ensure you have made the payment before submitting your order.
        </p>
      </div>
    </div>
  );
};

export default Checkout;

