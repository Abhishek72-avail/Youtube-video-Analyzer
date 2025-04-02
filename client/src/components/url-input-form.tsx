import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel 
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { X, Search } from "lucide-react";
import { analyzeVideo } from "@/lib/api";
import { extractVideoId } from "@/lib/utils";

const formSchema = z.object({
  videoUrl: z
    .string()
    .url("Please enter a valid URL")
    .refine(
      (url) => {
        try {
          return extractVideoId(url) !== null;
        } catch (e) {
          return false;
        }
      },
      { message: "Please enter a valid YouTube video URL" }
    ),
  commentCount: z.enum(["100", "250", "500", "1000"]),
  deepAnalysis: z.boolean().default(false),
});

type FormData = z.infer<typeof formSchema>;

interface UrlInputFormProps {
  onSubmit: (videoId: string) => void;
  onError: (error: Error) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

export default function UrlInputForm({ 
  onSubmit, 
  onError, 
  isLoading, 
  setIsLoading 
}: UrlInputFormProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      videoUrl: "",
      commentCount: "100",
      deepAnalysis: false,
    },
  });

  const handleClear = () => {
    form.setValue("videoUrl", "");
    form.setFocus("videoUrl");
  };

  const handleSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);
      const videoId = await analyzeVideo(data.videoUrl, {
        commentCount: parseInt(data.commentCount),
        deepAnalysis: data.deepAnalysis,
      });
      onSubmit(videoId);
    } catch (error) {
      onError(error as Error);
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
          Analyze YouTube Video
        </h2>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="videoUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>YouTube Video URL</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg
                          className="h-5 w-5 text-gray-400"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                        </svg>
                      </div>
                      <Input
                        {...field}
                        placeholder="https://www.youtube.com/watch?v=..."
                        className="pl-10 pr-10"
                      />
                      {field.value && (
                        <div 
                          className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                          onClick={handleClear}
                        >
                          <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormDescription>
                    Enter a complete YouTube video URL to analyze its sentiment and metrics
                  </FormDescription>
                </FormItem>
              )}
            />
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2">
              <FormField
                control={form.control}
                name="deepAnalysis"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="!mt-0">
                      Enable deep analysis (more accurate but slower)
                    </FormLabel>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="commentCount"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Select comment count" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="100">Analyze 100 comments</SelectItem>
                          <SelectItem value="250">Analyze 250 comments</SelectItem>
                          <SelectItem value="500">Analyze 500 comments</SelectItem>
                          <SelectItem value="1000">Analyze 1000 comments</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full sm:w-auto" 
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2" />
                  Processing...
                </div>
              ) : (
                <div className="flex items-center">
                  <Search className="mr-2 h-5 w-5" />
                  Analyze
                </div>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
