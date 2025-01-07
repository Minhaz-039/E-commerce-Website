import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Header from "../components/Header";
import Product from "./Products/Product";

const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({ keyword });

  return (
    <div className=' bg-[#f0ece2] flex flex-col justify-center '>



      <header
        className="relative bg-cover bg-center h-[400px] flex items-center justify-center"
        style={{
          backgroundImage: `url('http://localhost:5000/uploads/Header.jpg')`, // Replace with your image URL
          opacity: 0.9,
        }}
      >
        <div className="text-center text-white">
          <h4 className="text-sm font-medium text-pink-500 tracking-wide mb-2">
            YOUR ONE-STOP E-COMMERCE DESTINATION
          </h4>
          <h1 className="text-4xl sm:text-6xl font-bold mb-4">
            Shop the Latest <span className="text-pink-400">Trends</span> at Unbeatable Prices
          </h1>
          <p className="text-gray-300 text-sm sm:text-base max-w-xl mt-12 mx-auto mb-6">
            Discover a wide range of high-quality products tailored to your needs. From fashion to tech, we have it all at the best prices!
          </p>
          <div className="flex justify-center gap-4">
            <button className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-transform">
              <Link
                to="/shop"
              >
                Start Shopping
              </Link>
            </button>
            <button className="flex items-center gap-2 px-6 py-2 rounded-md bg-pink-800 text-white hover:bg-pink-950 transition-transform">
              <Link to='/favorite'>
                <span className="material-icons">Go to</span> Favorites
              </Link>
            </button>
          </div>
        </div>
      </header>




      <div className="pl-28">
        {!keyword && <Header />}
      </div>


      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          {isError?.data.message || isError.error}
        </Message>
      ) : (
        <div className="pl-20">
          {/* Section Header */}
          <div className="flex flex-col items-center sm:flex-row sm:justify-between sm:items-center py-10 px-6 sm:px-16">
            <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-800 sm:mb-0">
              Special Products
            </h1>

            <Link
              to="/shop"
              className="bg-pink-600 text-white font-bold rounded-full py-2 px-8 transition-transform hover:scale-105"
            >
              Shop
            </Link>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6 sm:px-16">
            {data.products.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
        </div>
      )}



      <footer className="bg-[#efe3c3] text-gray-800 w-full py-6 px-28 mt-10">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm mb-4 sm:mb-0">
            &copy; {new Date().getFullYear()} E-Shop. All rights reserved.
          </p>
          <nav className="space-x-4">
            <Link
              to="/privacy"
              className="hover:text-pink-800 transition-colors duration-300"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="hover:text-pink-800 transition-colors duration-300"
            >
              Terms of Service
            </Link>
            <Link
              to="/contact"
              className="hover:text-pink-800 transition-colors duration-300"
            >
              Contact
            </Link>
          </nav>
        </div>
      </footer>

    </div>
  );
};

export default Home;
