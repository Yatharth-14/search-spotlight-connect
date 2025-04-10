
import { Card, CardContent } from "@/components/ui/card";

export const AdvertisementSection = () => {
  return (
    <section className="bg-white dark:bg-gray-900 py-8 container mx-auto px-4">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 dark:text-white">Advertisements</h2>
        <Card className="overflow-hidden dark:bg-gray-800">
          <CardContent className="p-0">
            <div className="aspect-video bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400">
              <p className="text-lg">Advertisement Banner</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
