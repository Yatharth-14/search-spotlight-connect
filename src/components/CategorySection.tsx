
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const categories = [
  { id: 1, name: "IT parts", color: "bg-red-500" },
  { id: 2, name: "Electrical", color: "bg-blue-500" },
  { id: 3, name: "Everything", color: "bg-green-500" },
  { id: 4, name: "Electronics", color: "bg-yellow-500" },
  { id: 5, name: "Machinery", color: "bg-purple-500" },
  { id: 6, name: "Components", color: "bg-orange-500" },
];

export const CategorySection = () => {
  return (
    <section className="py-8 container mx-auto px-4">
      <div className="w-full mb-6">
        <h2 className="text-2xl font-bold mb-4">Categories Like IT parts, Electrical and Everything</h2>
        
        <div className="mb-8">
          <div className="flex overflow-x-auto py-2 space-x-2">
            {/* Category Pills */}
            {categories.map((category) => (
              <div key={category.id} className="flex-shrink-0">
                <div className={`px-4 py-2 rounded-full text-white ${category.color}`}>
                  {category.name}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mb-6">
          <Input type="text" placeholder="Search Categories" className="w-full max-w-md" />
        </div>
        
        <div className="bg-gray-100 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Advertisements About Products</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white p-4 rounded-md shadow-sm">
                <div className="w-full h-40 bg-gray-200 rounded-md mb-4"></div>
                <h4 className="font-medium">Product Title</h4>
                <p className="text-sm text-gray-500">Brief description of the product</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
