"use client";
import Image from "next/image";
import { useState } from "react";
import { Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";

export const ProductDetailContent = () => {
  return (
    <TabsContent value="details" className="mt-6">
      <Card>
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-4">Product Details</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>Premium quality blazer jacket</li>
            <li>Material: 80% wool, 20% polyester</li>
            <li>Fully lined with inner pockets</li>
            <li>Suitable for both formal and casual occasions</li>
            <li>Dry clean only</li>
          </ul>
          <h4 className="text-lg font-semibold mt-6 mb-2">Size Guide</h4>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Size</th>
                <th className="border p-2">Chest (inches)</th>
                <th className="border p-2">Waist (inches)</th>
                <th className="border p-2">Hips (inches)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2">S</td>
                <td className="border p-2">34-36</td>
                <td className="border p-2">28-30</td>
                <td className="border p-2">34-36</td>
              </tr>
              <tr>
                <td className="border p-2">M</td>
                <td className="border p-2">38-40</td>
                <td className="border p-2">32-34</td>
                <td className="border p-2">38-40</td>
              </tr>
              <tr>
                <td className="border p-2">L</td>
                <td className="border p-2">42-44</td>
                <td className="border p-2">36-38</td>
                <td className="border p-2">42-44</td>
              </tr>
            </tbody>
          </table>
        </CardContent>
      </Card>
    </TabsContent>
  );
};
