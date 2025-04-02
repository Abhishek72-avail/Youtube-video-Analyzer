import { useState } from "react";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/header";
import Footer from "@/components/footer";
import UrlInputForm from "@/components/url-input-form";

export default function Home() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalyze = async (videoId: string) => {
    setIsLoading(false);
    setLocation(`/analysis/${videoId}`);
  };

  const handleError = (error: Error) => {
    setIsLoading(false);
    toast({
      title: "Error",
      description: error.message,
      variant: "destructive",
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              YouTube Video Analyzer
            </h1>
            <p className="text-lg text-gray-600">
              Analyze YouTube videos to determine if they're worth watching.
              Our tool examines comments, likes, and overall sentiment to 
              provide you with an informed recommendation.
            </p>
          </div>

          <UrlInputForm
            onSubmit={handleAnalyze}
            onError={handleError}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-4">
                <i className="fas fa-comments text-primary text-xl"></i>
              </div>
              <h3 className="text-lg font-semibold mb-2">Sentiment Analysis</h3>
              <p className="text-gray-600">
                We analyze comments to determine the general sentiment towards the video,
                categorizing them as positive, neutral, or negative.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-4">
                <i className="fas fa-chart-bar text-primary text-xl"></i>
              </div>
              <h3 className="text-lg font-semibold mb-2">Engagement Metrics</h3>
              <p className="text-gray-600">
                Our algorithm examines likes, views, and other engagement metrics
                to provide insights into the video's reception.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-4">
                <i className="fas fa-thumbs-up text-primary text-xl"></i>
              </div>
              <h3 className="text-lg font-semibold mb-2">Recommendation</h3>
              <p className="text-gray-600">
                Get a clear recommendation on whether the video is worth watching,
                based on comprehensive analysis of viewer feedback.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
