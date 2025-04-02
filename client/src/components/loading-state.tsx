import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface LoadingStateProps {
  progress: number;
}

export default function LoadingState({ progress }: LoadingStateProps) {
  const stageMessages = [
    "Fetching video details...",
    "Retrieving comments...",
    "Analyzing sentiment...",
    "Processing engagement metrics...",
    "Generating final recommendation...",
  ];

  const getLoadingMessage = () => {
    if (progress < 20) return stageMessages[0];
    if (progress < 40) return stageMessages[1];
    if (progress < 60) return stageMessages[2];
    if (progress < 80) return stageMessages[3];
    return stageMessages[4];
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-col items-center justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">Analyzing Video</h3>
          <div className="text-sm text-gray-500 mb-4">{getLoadingMessage()}</div>
          
          <div className="w-full max-w-md mb-2">
            <Progress value={progress} className="h-2" />
          </div>
          
          <div className="flex justify-between w-full max-w-md mt-2">
            <span className={`text-xs ${progress >= 20 ? 'text-primary' : 'text-gray-500'}`}>
              Fetching data
            </span>
            <span className={`text-xs ${progress >= 60 ? 'text-primary' : 'text-gray-500'}`}>
              Analyzing sentiment
            </span>
            <span className={`text-xs ${progress >= 90 ? 'text-primary' : 'text-gray-500'}`}>
              Generating report
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
