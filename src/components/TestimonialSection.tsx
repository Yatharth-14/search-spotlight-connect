
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { testimonials } from "@/data/mockData";

export const TestimonialSection = () => {
  return (
    <section className="py-8 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8 text-center dark:text-white">Testimonials</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item) => (
            <Card key={item.id} className="dark:bg-gray-700">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="w-16 h-16 mb-4">
                    <AvatarImage src={item.image} />
                    <AvatarFallback>{item.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-4">"{item.content}"</p>
                  
                  <div>
                    <h4 className="font-semibold dark:text-white">{item.name}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{item.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
