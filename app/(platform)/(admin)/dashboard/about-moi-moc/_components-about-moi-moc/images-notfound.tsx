import {motion} from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ImageOff, RefreshCcw, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ImagesNotfound = () => {
  return (
    <div className="flex items-center justify-center h-full w-full">
    <Card className="w-full max-w-md border-none">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">
          No Images Found
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center space-y-6"
        >
          <div className="relative w-40 h-40">
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
            <ImageOff className="absolute inset-0 w-full h-full text-gray-400 p-10" />
          </div>
          <span className="text-center text-gray-600 max-w-md">
            We couldn't find any images matching your criteria.
            Try adjusting your search, uploading new images, or
            check out our suggestions.
          </span>
        </motion.div>
      </CardContent>
      <CardFooter className="flex justify-center space-x-4">
        <Button variant="outline" onClick={() => {}}>
          <RefreshCcw className="w-4 h-4 mr-2" />
          Refresh
        </Button>
        <Button onClick={() => {}}>
          <Upload className="w-4 h-4 mr-2" />
          Upload Images
        </Button>
      </CardFooter>
    </Card>
  </div>
  )
};
