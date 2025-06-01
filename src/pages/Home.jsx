import Products from "./Products";
import bgHome from "../assets/bgHome.png";
const Home = () => {
  return (
    <>
      <div>
        <img src={bgHome} alt="background-image" className="w-full h-[500px]" />

        <div className="absolute top-1/3 left-25 text-black max-w-md">
          <h3 className="text-4xl font-bold mb-2">Online Shopping</h3>
          <p className="text-lg">
            Welcome to the future of online shopping! Discover amazing products
            at unbeatable prices.
          </p>
        </div>
      </div>

      <Products />
    </>
  );
};

export default Home;
