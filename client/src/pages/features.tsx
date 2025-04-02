import Header from "@/components/header";
import Footer from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { 
  BarChart2, 
  MessageSquare, 
  ThumbsUp, 
  Award, 
  TrendingUp, 
  Clock,
  Zap,
  Shield,
  Eye
} from "lucide-react";

export default function Features() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-gradient-to-b from-red-50 to-white">
        {/* Hero Section */}
        <section className="pt-16 pb-24 px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-extrabold mb-6 text-gray-900">
              Advanced Features for
              <span className="bg-gradient-to-r from-red-700 to-red-900 bg-clip-text text-transparent"> Smarter Decisions</span>
            </h1>
            <p className="text-xl text-gray-600 mb-10">
              Our YouTube Video Analyzer uses advanced algorithms to help you determine if videos 
              are worth your time, based on sentiment analysis and engagement metrics.
            </p>
          </div>
        </section>

        {/* Features Grid */}
        <section className="pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <Card className="border-t-4 border-t-red-600 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6 p-6">
                  <div className="bg-red-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                    <MessageSquare className="h-7 w-7 text-red-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">Sentiment Analysis</h3>
                  <p className="text-gray-600">
                    Our AI analyzes hundreds of comments to determine the general sentiment towards the video, 
                    categorizing them as positive, neutral, or negative.
                  </p>
                </CardContent>
              </Card>

              {/* Feature 2 */}
              <Card className="border-t-4 border-t-red-600 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6 p-6">
                  <div className="bg-red-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                    <BarChart2 className="h-7 w-7 text-red-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">Engagement Metrics</h3>
                  <p className="text-gray-600">
                    Get detailed engagement metrics including like-to-view ratio, comment-to-view ratio, 
                    and audience retention metrics compared to channel averages.
                  </p>
                </CardContent>
              </Card>

              {/* Feature 3 */}
              <Card className="border-t-4 border-t-red-600 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6 p-6">
                  <div className="bg-red-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                    <ThumbsUp className="h-7 w-7 text-red-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">Key Comment Highlights</h3>
                  <p className="text-gray-600">
                    We identify and highlight the most impactful comments, both positive and negative, 
                    to give you a quick overview of audience reaction.
                  </p>
                </CardContent>
              </Card>

              {/* Feature 4 */}
              <Card className="border-t-4 border-t-red-600 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6 p-6">
                  <div className="bg-red-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                    <Award className="h-7 w-7 text-red-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">Smart Recommendations</h3>
                  <p className="text-gray-600">
                    Get a clear recommendation on whether the video is worth watching 
                    based on comprehensive analysis of viewer feedback and engagement.
                  </p>
                </CardContent>
              </Card>

              {/* Feature 5 */}
              <Card className="border-t-4 border-t-red-600 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6 p-6">
                  <div className="bg-red-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                    <TrendingUp className="h-7 w-7 text-red-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">Performance Comparison</h3>
                  <p className="text-gray-600">
                    See how a video performs against channel averages to determine if 
                    it's better or worse than typical content from that creator.
                  </p>
                </CardContent>
              </Card>

              {/* Feature 6 */}
              <Card className="border-t-4 border-t-red-600 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6 p-6">
                  <div className="bg-red-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                    <Clock className="h-7 w-7 text-red-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">Save Your Time</h3>
                  <p className="text-gray-600">
                    Don't waste time on low-quality content. Our analyzer helps you make 
                    informed decisions about which videos are worth your valuable time.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Additional Features Section */}
        <section className="pb-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-red-50 to-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900">Why Choose Our Analyzer?</h2>
              <p className="mt-4 text-xl text-gray-600">More than just video analysis - a complete solution</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-red-600 text-white">
                    <Zap className="h-6 w-6" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Lightning Fast Analysis</h3>
                  <p className="mt-2 text-gray-600">
                    Our analyzer processes videos within seconds, allowing you to quickly decide 
                    whether a video is worth watching without waiting for lengthy analyses.
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-red-600 text-white">
                    <Shield className="h-6 w-6" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Privacy Focused</h3>
                  <p className="mt-2 text-gray-600">
                    We don't store your search history on our servers. All analysis is done in real-time 
                    and your data remains private and secure.
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-red-600 text-white">
                    <Eye className="h-6 w-6" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Comprehensive View</h3>
                  <p className="mt-2 text-gray-600">
                    Get a complete picture of video quality through multiple metrics including sentiment, 
                    engagement, and comparative performance data.
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-red-600 text-white">
                    <Award className="h-6 w-6" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Superior Accuracy</h3>
                  <p className="mt-2 text-gray-600">
                    Our sentiment analysis algorithms have been trained on millions of YouTube comments 
                    for accurate interpretation of viewer opinions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-red-700 to-red-900 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Save Time?</h2>
            <p className="text-xl mb-8">
              Start analyzing YouTube videos now and make informed decisions about what to watch.
            </p>
            <a href="/" className="inline-block bg-white text-red-700 px-8 py-3 rounded-lg font-medium text-lg hover:bg-red-50 transition-colors">
              Try It Now
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}