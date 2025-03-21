import { useState, useEffect } from "react";
import Card from "../../Components/Card";
import Layout from "../../Components/Layout";
import ProductDetail from "../../Components/ProductDetail";
import CheckoutSideMenu from "../../Components/CheckoutSideMenu";

const Home = () => {
  // UseState is a hook to add the info from the API to the state
  const [items, setItems] = useState(null);

  // UseEffect is a hook to fetch the data from the API
  useEffect(() => {
    // fetch("https://fakestoreapi.com/products") // Fake Store API
    fetch("https://api.escuelajs.co/api/v1/products") // Platzi API
      .then((response) => response.json())
      .then((json) => setItems(json));
  }, []);

  return (
    <Layout>
      Home
      <div className="grid gap-4 grid-cols-4 w-full max-w-screen-lg">
        {items?.map((item) => (
          <Card key={item.id} data={item} />
        ))}
      </div>
      <ProductDetail />
      <CheckoutSideMenu />
    </Layout>
  );
};

export default Home;