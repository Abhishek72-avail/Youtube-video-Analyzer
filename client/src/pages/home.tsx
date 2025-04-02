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
      <main className="flex-grow bg-gradient-to-b from-red-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-red-700 to-red-900 bg-clip-text text-transparent">
              Should You Watch This Video?
            </h1>
            <p className="text-lg text-gray-700">
              Our AI analyzes YouTube videos to help you decide if they're worth your time.
              We examine comments, engagement, and overall sentiment to provide 
              you with data-driven recommendations.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-xl border border-red-100 mb-12">
            <UrlInputForm
              onSubmit={handleAnalyze}
              onError={handleError}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-t-red-600 hover:shadow-lg transition-all">
              <div className="flex items-center justify-center w-14 h-14 bg-red-100 rounded-full mb-4 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Sentiment Analysis</h3>
              <p className="text-gray-600">
                We analyze comments to determine the general sentiment towards the video,
                categorizing them as positive, neutral, or negative.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-t-red-600 hover:shadow-lg transition-all">
              <div className="flex items-center justify-center w-14 h-14 bg-red-100 rounded-full mb-4 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="20" x2="18" y2="10"></line>
                  <line x1="12" y1="20" x2="12" y2="4"></line>
                  <line x1="6" y1="20" x2="6" y2="14"></line>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Engagement Metrics</h3>
              <p className="text-gray-600">
                Our algorithm examines likes, views, and other engagement metrics
                to provide insights into the video's reception.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-t-red-600 hover:shadow-lg transition-all">
              <div className="flex items-center justify-center w-14 h-14 bg-red-100 rounded-full mb-4 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Recommendation</h3>
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
