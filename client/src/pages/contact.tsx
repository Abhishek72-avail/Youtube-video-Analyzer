import Header from "@/components/header";
import Footer from "@/components/footer";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { 
  Mail, 
  MessageSquare, 
  Phone, 
  MapPin 
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  subject: z.string().min(5, {
    message: "Subject must be at least 5 characters.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

type FormData = z.infer<typeof formSchema>;

export default function Contact() {
  const { toast } = useToast();
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  function onSubmit(data: FormData) {
    console.log(data);
    toast({
      title: "Message sent",
      description: "Thank you for your message. We'll get back to you soon.",
    });
    form.reset();
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-gradient-to-b from-red-50 to-white">
        {/* Hero Section */}
        <section className="pt-16 pb-10 px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-extrabold mb-6 text-gray-900">
              Get in 
              <span className="bg-gradient-to-r from-red-700 to-red-900 bg-clip-text text-transparent"> Touch</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Have questions about our YouTube Video Analyzer? We're here to help.
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="pb-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-gray-900">Send us a message</h2>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="your.email@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subject</FormLabel>
                          <FormControl>
                            <Input placeholder="What is this regarding?" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Tell us how we can help you..." 
                              className="min-h-[150px]" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-red-700 to-red-900 hover:from-red-800 hover:to-red-950"
                    >
                      Send Message
                    </Button>
                  </form>
                </Form>
              </div>
              
              {/* Contact Information */}
              <div>
                <div className="bg-gradient-to-r from-red-700 to-red-900 p-8 rounded-lg shadow-md text-white mb-8">
                  <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <Mail className="h-6 w-6 mt-1" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium">Email</h3>
                        <p className="mt-1">support@youtubeanalyzer.com</p>
                        <p className="mt-1">info@youtubeanalyzer.com</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <Phone className="h-6 w-6 mt-1" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium">Phone</h3>
                        <p className="mt-1">+1 (555) 123-4567</p>
                        <p className="mt-1">Mon-Fri, 9am-5pm EST</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <MapPin className="h-6 w-6 mt-1" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium">Office</h3>
                        <p className="mt-1">
                          123 Analysis Street<br />
                          San Francisco, CA 94103<br />
                          United States
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-8 rounded-lg shadow-md">
                  <h2 className="text-2xl font-bold mb-6 text-gray-900">Frequently Asked Questions</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">How does the analyzer work?</h3>
                      <p className="mt-1 text-gray-600">
                        Our analyzer uses advanced AI to process user comments, engagement metrics, and other data 
                        to determine if a video is worth watching based on audience reception.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">Is my search history private?</h3>
                      <p className="mt-1 text-gray-600">
                        Yes, your search history is stored locally on your device for your convenience. 
                        We do not track or store your search history on our servers.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">Can I analyze any YouTube video?</h3>
                      <p className="mt-1 text-gray-600">
                        Yes, you can analyze any public YouTube video that has comments enabled. 
                        Videos with more comments will provide more accurate analysis results.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}