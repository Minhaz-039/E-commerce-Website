import { Link } from "react-router-dom";
import moment from "moment";
import { useAllProductsQuery } from "../../redux/api/productApiSlice";
import AdminMenu from "./AdminMenu";

const AllProducts = () => {
    const { data: products, isLoading, isError } = useAllProductsQuery();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error loading products</div>;
    }

    return (
        <>
            <div className="container max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row">
                    <div className="p-3">
                        <div className="ml-[2rem] text-xl font-bold text-black h-12">
                            All Products ({products.length})
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 justify-around items-center">
                            {products.map((product) => (
                                <div
                                    key={product._id}
                                    className="block overflow-hidden cursor-pointer"
                                    onClick={() => window.location.href = `/admin/product/update/${product._id}`} // Navigate when clicked
                                >
                                    <div className="flex h-full border-2 p-2 border-pink-800 rounded-md bg-pink-100 lg:h-56">
                                        <img
                                            src={`http://localhost:5000${product.image}`}
                                            alt={product.name}
                                            className="w-[10rem] rounded-md object-cover"
                                        />
                                        <div className="p-4 flex flex-col justify-around">
                                            <div className="flex justify-between">
                                                <h5 className="text-xl text-black font-semibold mb-2">
                                                    {product?.name}
                                                </h5>

                                                <p className="text-gray-400 text-xs">
                                                    {moment(product.createdAt).format("MMMM Do YYYY")}
                                                </p>
                                            </div>

                                            <p className="text-gray-700 flex flex-grow  text-sm mb-4">
                                                {product?.description?.substring(0, 160)}...
                                            </p>

                                            <div className="flex justify-between">
                                                <Link
                                                    to={`/admin/product/update/${product._id}`}
                                                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-pink-700 rounded-lg hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800"
                                                >
                                                    Update Product
                                                    <svg
                                                        className="w-3.5 h-3.5 ml-2"
                                                        aria-hidden="true"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 14 10"
                                                    >
                                                        <path
                                                            stroke="currentColor"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M1 5h12m0 0L9 1m4 4L9 9"
                                                        />
                                                    </svg>
                                                </Link>
                                                <p className="text-pink-800 font-bold">$ {product?.price}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div >
                        <AdminMenu />
                    </div>
                </div>
            </div>

        </>
    );
};

export default AllProducts;