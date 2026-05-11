"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Briefcase, Baby, BookOpen, Heart, Clock, Users } from "lucide-react";
import Navigation from '@/components/Navigation';

export default function CareerAndParentingPage() {
  const [jobSearch, setJobSearch] = useState("");
  const [parentingTopic, setParentingTopic] = useState("");

  const handleJobSearch = () => {
    alert(`Searching for jobs related to: ${jobSearch}`);
  };

  const handleParentingTopicSelect = (topic: string) => {
    setParentingTopic(topic);
    alert(`Selected parenting topic: ${topic}`);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Hero Section */}
      <Navigation />
      <br />
      <br />
      <div className="text-center">
        <h1 className="text-4xl font-bold text-pink-600 mb-4">
          Empower Your Career and Parenting Journey
        </h1>
        <p className="text-lg text-gray-600">
          All-in-one resources for career growth and effective parenting.
        </p>
      </div>

      {/* Career Guidance Section */}
      <Card className="bg-white shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2 text-black">
            <Briefcase className="w-6 h-6 text-pink-600 " />
            Career Guidance
          </CardTitle>
          <CardDescription>
            Tools and resources to help you grow in your career.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Job Search */}
          <div className="space-y-2">
            
            <Label className="text-lg text-black" >Job Search</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Enter job title or keyword"
                value={jobSearch}
                onChange={(e) => setJobSearch(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleJobSearch} className="bg-pink-600 hover:bg-pink-700">
                Search
              </Button>
            </div>
          </div>

          {/* Freelancing Opportunities */}
          <div className="space-y-2">
            <Label className="text-lg text-black">Freelancing Opportunities</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-4 hover:shadow-md transition-shadow">
                <h3 className="font-semibold">Graphic Design</h3>
                <p className="text-sm text-gray-600">Find freelance design projects.</p>
              </Card>
              <Card className="p-4 hover:shadow-md transition-shadow">
                <h3 className="font-semibold">Content Writing</h3>
                <p className="text-sm text-gray-600">Explore writing gigs.</p>
              </Card>
              <Card className="p-4 hover:shadow-md transition-shadow">
                <h3 className="font-semibold">Web Development</h3>
                <p className="text-sm text-gray-600">Build websites for clients.</p>
              </Card>
            </div>
          </div>

          {/* Resume Building */}
          <div className="space-y-2">
            <Label className="text-lg text-black"></Label>
            <Button className="bg-pink-600 hover:bg-pink-700">
              <BookOpen className="w-4 h-4 mr-2" />
              Build Your Resume
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Parenting Resources Section */}
      <Card className="bg-white shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2 text-black">
            <Baby className="w-6 h-6 text-blue-600" />
            Parenting Resources
          </CardTitle>
          <CardDescription>
            Tips and tools to help you navigate parenthood.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Parenting Topics */}
          <div className="space-y-2">
            <Label className="text-lg text-black">Select a Parenting Topic</Label>
            <Select onValueChange={handleParentingTopicSelect}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose a topic" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newborn-care">Newborn Care</SelectItem>
                <SelectItem value="toddler-tips">Toddler Tips</SelectItem>
                <SelectItem value="school-age">School-Age Children</SelectItem>
                <SelectItem value="teen-parenting">Teen Parenting</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Parenting Tips Accordion */}
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg text-black">
                <Heart className="w-4 h-4 mr-2 text-blue-600" />
                Parenting Tips
              </AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc list-inside space-y-2 text-black">
                  <li>Establish a consistent routine for your child.</li>
                  <li>Encourage open communication with your child.</li>
                  <li>Set boundaries and enforce them gently but firmly.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-lg text-black">
                <Clock className="w-4 h-4 mr-2 text-blue-600" />
                Work-Life Balance
              </AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc list-inside space-y-2 text-black">
                  <li>Prioritize tasks and delegate when possible.</li>
                  <li>Set aside quality time for family activities.</li>
                  <li>Practice self-care to avoid burnout.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-pink-600 mb-4">
          Start Your Journey Today
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          Explore our resources and take the next step in your career and parenting journey.
        </p>
        <Button className="bg-pink-600 hover:bg-pink-700">
          <Users className="w-4 h-4 mr-2" />
          Join Our Community
        </Button>
      </div>
    </div>
  );
}