import Header from "@/components/header";
import Footer from "@/components/footer";
import { useState } from "react";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, HelpCircle, Lightbulb, FileText, Info } from "lucide-react";

export default function Help() {
  const [searchQuery, setSearchQuery] = useState("");
  
  const faqs = [
    {
      category: "Getting Started",
      icon: <Lightbulb className="h-5 w-5 text-red-600" />,
      questions: [
        {
          question: "How do I analyze a YouTube video?",
          answer: "Simply paste the YouTube video URL into the search box on our homepage and click 'Analyze'. Our system will process the video and provide you with a detailed analysis of the video's sentiment, engagement metrics, and a recommendation on whether it's worth watching."
        },
        {
          question: "Can I analyze any YouTube video?",
          answer: "You can analyze any public YouTube video that has comments enabled. Videos with more comments will provide more accurate analysis results. Private videos or videos with comments disabled cannot be analyzed."
        },
        {
          question: "How long does the analysis take?",
          answer: "The analysis typically takes between 5-30 seconds depending on the number of comments and the length of the video. Videos with thousands of comments may take slightly longer to process."
        },
        {
          question: "Do I need an account to use the analyzer?",
          answer: "No, you can use our basic video analysis features without creating an account. However, creating a free account allows you to save your analysis history and access additional features."
        }
      ]
    },
    {
      category: "Understanding Results",
      icon: <Info className="h-5 w-5 text-red-600" />,
      questions: [
        {
          question: "What does the sentiment analysis show?",
          answer: "The sentiment analysis breaks down the overall tone of comments into positive, neutral, and negative percentages. It also provides key examples of each sentiment type to give you context for the numbers."
        },
        {
          question: "How are engagement metrics calculated?",
          answer: "Engagement metrics include like-to-view ratio, comment-to-view ratio, and audience retention metrics. These are calculated based on the video's statistics and compared to channel averages to show if the video performs better or worse than typical content from that creator."
        },
        {
          question: "What does the recommendation score mean?",
          answer: "The recommendation score ranges from 0-100 and helps you decide if a video is worth watching. Scores above 70 are considered 'Highly Recommended', between 40-70 are 'Neutral', and below 40 are 'Not Recommended'. The score is calculated based on a combination of sentiment analysis and engagement metrics."
        },
        {
          question: "How accurate is the analysis?",
          answer: "Our sentiment analysis algorithms have been trained on millions of YouTube comments and typically achieve over 85% accuracy. The accuracy increases with videos that have more comments for analysis. Keep in mind that sentiment analysis is subjective and may not always match your personal opinion."
        }
      ]
    },
    {
      category: "Technical Issues",
      icon: <HelpCircle className="h-5 w-5 text-red-600" />,
      questions: [
        {
          question: "Why can't I analyze certain videos?",
          answer: "There are several reasons why a video might not be analyzable: 1) The video is private or unlisted, 2) Comments are disabled for the video, 3) The video was recently uploaded and doesn't have enough comments yet, or 4) There might be temporary issues with the YouTube API."
        },
        {
          question: "The analysis seems incomplete or inaccurate",
          answer: "The accuracy of our analysis depends on the number and quality of comments available. Videos with few comments or many spam comments may result in less accurate analysis. Additionally, videos in languages other than English may not be analyzed as accurately."
        },
        {
          question: "The analyzer is stuck loading",
          answer: "If the analyzer seems stuck, try refreshing the page and analyzing the video again. If the problem persists, it could be due to high server load or issues with the YouTube API. Please try again later or contact our support team if the issue continues."
        },
        {
          question: "My browser is showing errors",
          answer: "Our service works best on modern browsers like Chrome, Firefox, Safari, or Edge. Make sure your browser is up to date. Also, disable any ad blockers or browser extensions that might interfere with our service. If you're still experiencing issues, try clearing your browser cache and cookies."
        }
      ]
    },
    {
      category: "Account & Billing",
      icon: <FileText className="h-5 w-5 text-red-600" />,
      questions: [
        {
          question: "How do I create an account?",
          answer: "Click on the 'Sign Up' button in the top right corner of the homepage. You can create an account using your email address or sign in with Google or Facebook. Follow the prompts to complete your account setup."
        },
        {
          question: "What are the benefits of a premium account?",
          answer: "Premium accounts offer several benefits: 1) Unlimited video analyses (free accounts are limited to 5 per day), 2) Advanced metrics and insights, 3) Ability to save and organize your analyses, 4) Batch analysis of multiple videos, and 5) Priority processing during high traffic periods."
        },
        {
          question: "How do I cancel my premium subscription?",
          answer: "To cancel your premium subscription, go to your Account Settings, select the 'Subscription' tab, and click on 'Cancel Subscription'. Your premium features will remain active until the end of your current billing period. You can continue to use the basic features after your subscription ends."
        },
        {
          question: "I forgot my password",
          answer: "Click on the 'Login' button, then select 'Forgot Password'. Enter the email address associated with your account, and we'll send you instructions to reset your password. If you don't receive the email, check your spam folder or contact our support team."
        }
      ]
    }
  ];
  
  // Filter FAQs based on search query
  const filteredFaqs = faqs.map(category => ({
    ...category,
    questions: category.questions.filter(
      item => 
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-gradient-to-b from-red-50 to-white">
        {/* Hero Section */}
        <section className="pt-16 pb-10 px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-extrabold mb-6 text-gray-900">
              Help
              <span className="bg-gradient-to-r from-red-700 to-red-900 bg-clip-text text-transparent"> Center</span>
            </h1>
            <p className="text-xl text-gray-600 mb-10">
              Find answers to your questions about YouTube Video Analyzer
            </p>
            
            {/* Search */}
            <div className="relative max-w-2xl mx-auto mb-12">
              <div className="flex">
                <Input
                  type="text"
                  placeholder="Search for help..."
                  className="pr-10 h-12 text-lg"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button 
                  className="ml-2 bg-gradient-to-r from-red-700 to-red-900 hover:from-red-800 hover:to-red-950"
                >
                  <Search className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="pb-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((category, index) => (
                <div key={index} className="mb-12">
                  <div className="flex items-center mb-6">
                    <div className="bg-red-100 p-2 rounded-full mr-3">
                      {category.icon}
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">{category.category}</h2>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-md">
                    <Accordion type="single" collapsible className="w-full">
                      {category.questions.map((item, idx) => (
                        <AccordionItem key={idx} value={`item-${index}-${idx}`}>
                          <AccordionTrigger className="text-left px-6 py-4 hover:bg-gray-50 text-gray-900 text-lg">
                            {item.question}
                          </AccordionTrigger>
                          <AccordionContent className="px-6 py-4 text-gray-600">
                            {item.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <HelpCircle className="mx-auto h-12 w-12 text-red-400 mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">No results found</h3>
                <p className="text-gray-600">
                  We couldn't find any help articles matching "{searchQuery}". Try a different search term or browse the categories below.
                </p>
              </div>
            )}
            
            {/* Contact Support */}
            <div className="mt-16 bg-gradient-to-r from-red-700 to-red-900 rounded-lg shadow-md p-8 text-white text-center">
              <h2 className="text-2xl font-bold mb-4">Still need help?</h2>
              <p className="mb-6">Our support team is ready to assist you with any questions or issues.</p>
              <Button 
                variant="secondary" 
                className="bg-white text-red-700 hover:bg-red-50 px-6 py-2 text-lg"
                asChild
              >
                <a href="/contact">Contact Support</a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}