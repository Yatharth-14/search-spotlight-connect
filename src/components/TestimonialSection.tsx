
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  { 
    id: 1, 
    name: "John Doe", 
    role: "Business Owner",
    content: "This marketplace has transformed how I source materials for my business. The quality of suppliers is excellent!"
  },
  { 
    id: 2, 
    name: "Sarah Smith", 
    role: "Procurement Manager",
    content: "The platform is intuitive and has helped us connect with reliable suppliers across multiple categories."
  },
  { 
    id: 3, 
    name: "Michael Chen", 
    role: "Tech Entrepreneur",
    content: "Finding specialized IT parts was always a challenge until I discovered this marketplace. Highly recommended!"
  },
];

export const TestimonialSection = () => {
  return (
    <section className="py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8 text-center">Testimonial</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item) => (
            <Card key={item.id}>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="w-16 h-16 mb-4">
                    <AvatarImage src={`https://i.pravatar.cc/150?u=${item.id}`} />
                    <AvatarFallback>{item.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  
                  <p className="text-gray-600 mb-4">"{item.content}"</p>
                  
                  <div>
                    <h4 className="font-semibold">{item.name}</h4>
                    <p className="text-sm text-gray-500">{item.role}</p>
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
