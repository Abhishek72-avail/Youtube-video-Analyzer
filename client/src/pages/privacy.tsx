import Header from "@/components/header";
import Footer from "@/components/footer";

export default function Privacy() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-gradient-to-b from-red-50 to-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h1 className="text-3xl font-bold mb-8 text-gray-900">Privacy Policy</h1>
            
            <div className="prose max-w-none">
              <p className="text-lg mb-6">
                At YouTube Video Analyzer, we take your privacy seriously. This Privacy Policy explains how we collect, 
                use, disclose, and safeguard your information when you use our service.
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">1. Information We Collect</h2>
              <p className="mb-4">We collect several types of information from and about users of our service, including:</p>
              <ul className="list-disc pl-8 mb-6">
                <li>
                  <strong>Personal Information:</strong> If you create an account, we may collect your name, email address, 
                  and other contact details.
                </li>
                <li>
                  <strong>Usage Data:</strong> We collect information on how you interact with our service, such as the videos 
                  you analyze, features you use, and time spent on the platform.
                </li>
                <li>
                  <strong>Device Information:</strong> We may collect information about your device, including your IP address, 
                  browser type, operating system, and device identifiers.
                </li>
              </ul>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">2. How We Use Your Information</h2>
              <p className="mb-4">We use the information we collect to:</p>
              <ul className="list-disc pl-8 mb-6">
                <li>Provide, maintain, and improve our service</li>
                <li>Process and complete your requests for analysis</li>
                <li>Communicate with you about your account or use of our service</li>
                <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities</li>
                <li>Analyze usage patterns to enhance user experience</li>
                <li>Comply with legal obligations</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">3. YouTube API Services</h2>
              <p>
                Our service uses YouTube API Services to retrieve data about videos. The YouTube API Services are governed by 
                Google's Privacy Policy which can be found at: 
                <a href="https://policies.google.com/privacy" className="text-red-600 hover:underline" target="_blank" rel="noopener noreferrer">
                  https://policies.google.com/privacy
                </a>
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">4. Cookies and Tracking Technologies</h2>
              <p>
                We use cookies and similar tracking technologies to track activity on our service and hold certain information. 
                Cookies are files with a small amount of data which may include an anonymous unique identifier. You can instruct 
                your browser to refuse all cookies or to indicate when a cookie is being sent.
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">5. Data Storage and Security</h2>
              <p>
                We implement appropriate security measures to protect your personal information. However, no method of 
                transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>
              <p>
                Your YouTube video analysis data is processed in real-time and only stored temporarily on our servers. We do not 
                permanently store the content of the videos or comments you analyze unless you choose to save your analysis results.
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">6. Third-Party Services</h2>
              <p>
                Our service may contain links to third-party websites or services that are not owned or controlled by us. 
                We have no control over and assume no responsibility for the content, privacy policies, or practices of any 
                third-party websites or services.
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">7. Children's Privacy</h2>
              <p>
                Our service is not intended for children under the age of 13. We do not knowingly collect personal information 
                from children under 13. If we become aware that we have collected personal information from a child under 13, 
                we will take steps to delete that information.
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">8. International Data Transfers</h2>
              <p>
                Your information may be transferred to and maintained on computers located outside of your state, province, 
                country, or other governmental jurisdiction where the data protection laws may differ from those in your jurisdiction.
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">9. Your Data Rights</h2>
              <p className="mb-4">Depending on your location, you may have certain rights regarding your personal information, including:</p>
              <ul className="list-disc pl-8 mb-6">
                <li>The right to access your personal information</li>
                <li>The right to correct inaccurate or incomplete information</li>
                <li>The right to delete your personal information</li>
                <li>The right to restrict or object to the processing of your personal information</li>
                <li>The right to data portability</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">10. Changes to This Privacy Policy</h2>
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new 
                Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy 
                periodically for any changes.
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">11. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <p className="font-medium">
                Email: privacy@youtubeanalyzer.com<br />
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