export default function Checkout() {
  return (
    <main className="p-10">
      <h2 className="text-3xl font-semibold">Checkout</h2>
      <form className="mt-4 space-y-2">
        <input type="text" placeholder="Name" className="border px-3 py-2 rounded w-full" />
        <input type="email" placeholder="Email" className="border px-3 py-2 rounded w-full" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Place Order</button>
      </form>
    </main>
  );
}
