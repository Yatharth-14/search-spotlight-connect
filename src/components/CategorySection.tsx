import { Input } from "@/components/ui/input";
import { featuredProducts } from "@/data/mockData"; // categories,
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/browserCategories";

export const CategorySection = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(API_URL, { timeout: 5000 });
        console.log("Browser Categories:", response);
        setCategories(response.data || []);
        setLoading(false);
      } catch (err) {
        setError(err.message || "Failed to fetch categories");
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const filteredCategories = categories.filter((category) =>
    category.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCategoryClick = (categoryTitle: string) => {
    // Convert category name to URL-friendly format (lowercase, spaces to hyphens)
    const formattedCategoryName = categoryTitle
      .toLowerCase()
      .replace(/\s+/g, "-");
    navigate(`/category/${formattedCategoryName}`);
  };

  if (loading) {
    return (
      <section className="py-8  container mx-auto px-4 dark:bg-gray-900">
        <div className="text-center dark:text-white">Loading...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-8  container mx-auto px-4 dark:bg-gray-900">
        <div className="text-center text-red-500">Failed to Load Browse Categories</div>
      </section>
    );
  }

  return (
    <section className="py-8 container mx-auto px-4 dark:bg-gray-900">
      <div className="w-full mb-6">
        <h2 className="text-2xl font-bold mb-4 dark:text-white">
          Browse Categories
        </h2>

        <div className="mb-8">
          <div className="flex overflow-x-auto py-2 space-x-2 no-scrollbar">
            {/* Category Pills */}
            {categories.map((category) => (
              <div key={category._id} className="flex-shrink-0">
                <div
                  className={`px-4 py-2 rounded-full text-white ${category.color} hover:scale-105 transition-transform cursor-pointer`}
                  onClick={() => handleCategoryClick(category.title)}
                >
                  {category.title}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <Input
            type="text"
            placeholder="Search Categories"
            className="w-full max-w-md dark:bg-gray-800 dark:text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {searchTerm && filteredCategories.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
            {filteredCategories.map((category) => (
              <div
                key={category._id}
                className={`p-4 rounded-lg text-white ${category.color} text-center cursor-pointer hover:opacity-90 transition-opacity`}
                onClick={() => handleCategoryClick(category.title)}
              >
                {category.title}
              </div>
            ))}
          </div>
        ) : null}

        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4 dark:text-white">
            Featured Products
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white dark:bg-gray-700 p-4 rounded-md shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleCategoryClick(product.category)}
              >
                <div className="w-full h-40 bg-gray-200 dark:bg-gray-600 rounded-md mb-4"></div>
                <h4 className="font-medium dark:text-white">{product.title}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  {product.description}
                </p>
                <div className="mt-2">
                  <span className="text-xs bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-2 py-1 rounded">
                    {product.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
