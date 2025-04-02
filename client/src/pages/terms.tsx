import Header from "@/components/header";
import Footer from "@/components/footer";

export default function Terms() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-gradient-to-b from-red-50 to-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h1 className="text-3xl font-bold mb-8 text-gray-900">Terms of Service</h1>
            
            <div className="prose max-w-none">
              <p className="text-lg mb-6">
                Welcome to YouTube Video Analyzer. By accessing or using our service, you agree to be bound by these Terms of Service.
                Please read them carefully.
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">1. Acceptance of Terms</h2>
              <p>
                By accessing or using the YouTube Video Analyzer service, you agree to be bound by these Terms of Service and all applicable laws and regulations. 
                If you do not agree with any of these terms, you are prohibited from using or accessing this site.
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">2. Description of Service</h2>
              <p>
                The YouTube Video Analyzer is a web application that analyzes YouTube video sentiment from comments and metrics to 
                determine if videos are worth watching. The service provides analysis based on available data from YouTube's API and 
                our proprietary algorithms.
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">3. YouTube API Services</h2>
              <p>
                Our service uses YouTube API Services to retrieve data about videos. By using our service, you also agree to be bound by 
                Google's Terms of Service which can be found at: 
                <a href="https://www.youtube.com/t/terms" className="text-red-600 hover:underline" target="_blank" rel="noopener noreferrer">
                  https://www.youtube.com/t/terms
                </a>
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">4. Privacy Policy</h2>
              <p>
                Our Privacy Policy explains how we collect, use, and protect your information. By using our service, you agree to our 
                Privacy Policy, which is incorporated into these Terms of Service.
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">5. User Accounts</h2>
              <p>
                Some features of the service may require you to create an account. You are responsible for maintaining the confidentiality 
                of your account information and for all activities that occur under your account. You agree to notify us immediately of any 
                unauthorized use of your account.
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">6. Intellectual Property</h2>
              <p>
                The YouTube Video Analyzer service, including all content, features, and functionality, is owned by us and is protected by 
                United States and international copyright, trademark, patent, trade secret, and other intellectual property or proprietary 
                rights laws.
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">7. Limitations of Use</h2>
              <p>
                You agree not to:
              </p>
              <ul className="list-disc pl-8 mb-6">
                <li>Use the service for any unlawful purpose or in violation of these Terms of Service</li>
                <li>Attempt to interfere with, harm, reverse engineer, steal from, or gain unauthorized access to the service</li>
                <li>Use automated means to access or use the service without our permission</li>
                <li>Impersonate another person or misrepresent your affiliation with a person or entity</li>
                <li>Use the service to harvest or collect user content or information</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">8. Disclaimer of Warranties</h2>
              <p>
                The service is provided "as is" and "as available" without warranties of any kind, either express or implied. 
                We do not guarantee the accuracy, completeness, or reliability of any analyses, content, or results provided 
                through the service.
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">9. Limitation of Liability</h2>
              <p>
                In no event shall we be liable for any indirect, incidental, special, consequential, or punitive damages, including 
                without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to 
                or use of or inability to access or use the service.
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">10. Changes to Terms</h2>
              <p>
                We reserve the right to modify or replace these Terms of Service at any time. It is your responsibility to check these Terms 
                of Service periodically for changes. Your continued use of the service following the posting of any changes constitutes 
                acceptance of those changes.
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">11. Governing Law</h2>
              <p>
                These Terms of Service shall be governed by and construed in accordance with the laws of the United States and the State of 
                California, without regard to its conflict of law provisions.
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">12. Contact Information</h2>
              <p>
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <p className="font-medium">
                Email: legal@youtubeanalyzer.com<br />
                Address: 123 Analysis Street, San Francisco, CA 94103, United States
              </p>
              
              <p className="mt-8 text-gray-600">
                Last updated: April 1, 2025
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}