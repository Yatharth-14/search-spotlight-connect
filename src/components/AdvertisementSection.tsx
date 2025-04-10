
import { Card, CardContent } from "@/components/ui/card";

export const AdvertisementSection = () => {
  return (
    <section className="bg-white py-8 container mx-auto px-4">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Advertisements</h2>
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="aspect-video bg-gray-200 flex items-center justify-center text-gray-500">
              <p className="text-lg">Advertisement Banner</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
