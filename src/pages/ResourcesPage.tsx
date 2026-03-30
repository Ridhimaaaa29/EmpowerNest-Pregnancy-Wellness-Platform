
import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Briefcase, Brain, Baby, Users } from 'lucide-react';
import Navigation from '@/components/Navigation';
import PageTransition from '@/components/PageTransition';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const ResourcesPage = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Mock resource data
  const resources = [
    {
      id: 1,
      title: "Work-Life Balance for New Parents",
      description: "Strategies to maintain a healthy balance between work responsibilities and parenthood.",
      category: "work",
      image: "/placeholder.svg",
      tags: ["time management", "productivity", "stress reduction"]
    },
    {
      id: 2,
      title: "Postpartum Mental Health Guide",
      description: "Understanding and navigating the emotional challenges after childbirth.",
      category: "mental",
      image: "/placeholder.svg",
      tags: ["depression", "anxiety", "self-care"]
    },
    {
      id: 3,
      title: "Infant Development Milestones",
      description: "What to expect in your baby's first year of physical and cognitive development.",
      category: "baby",
      image: "/placeholder.svg",
      tags: ["milestones", "growth", "development"]
    },
    {
      id: 4,
      title: "Co-Parenting Strategies",
      description: "Effective communication and collaboration between parents for child wellbeing.",
      category: "family",
      image: "/placeholder.svg",
      tags: ["communication", "teamwork", "consistency"]
    },
    {
      id: 5,
      title: "Remote Work Options for Parents",
      description: "Finding flexible employment opportunities that accommodate family needs.",
      category: "work",
      image: "/placeholder.svg",
      tags: ["remote jobs", "freelancing", "flexible schedule"]
    },
    {
      id: 6,
      title: "Navigating Maternity Leave",
      description: "Understanding your rights and planning for a smooth transition to and from leave.",
      category: "work",
      image: "/placeholder.svg",
      tags: ["legal rights", "planning", "career"]
    },
  ];
  
  // Filter resources based on active tab and search query
  const filteredResources = resources.filter(resource => {
    const matchesCategory = activeTab === "all" || resource.category === activeTab;
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <PageTransition>
      <Navigation />
      
      <main className="container max-w-6xl pt-24 pb-16 px-4 md:px-6">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Resources Hub</h1>
          <p className="text-muted-foreground text-lg">
            Discover articles, guides, and tools to support your parenthood journey.
          </p>
        </div>
        
        <div className="mb-6">
          <Input
            type="search"
            placeholder="Search resources..."
            className="max-w-md"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full md:w-auto md:inline-flex grid-cols-3 md:grid-cols-5 mb-8">
            <TabsTrigger value="all" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span className="hidden md:inline">All</span>
            </TabsTrigger>
            <TabsTrigger value="work" className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              <span className="hidden md:inline">Work-Life</span>
            </TabsTrigger>
            <TabsTrigger value="mental" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              <span className="hidden md:inline">Mental Health</span>
            </TabsTrigger>
            <TabsTrigger value="baby" className="flex items-center gap-2">
              <Baby className="h-4 w-4" />
              <span className="hidden md:inline">Baby Care</span>
            </TabsTrigger>
            <TabsTrigger value="family" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden md:inline">Family</span>
            </TabsTrigger>
          </TabsList>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.length > 0 ? (
              filteredResources.map(resource => (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="h-full flex flex-col">
                    <div className="aspect-video relative bg-muted">
                      <img
                        src={resource.image}
                        alt={resource.title}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <CardHeader className="flex-grow">
                      <CardTitle className="text-xl">{resource.title}</CardTitle>
                      <CardDescription>{resource.description}</CardDescription>
                    </CardHeader>
                    <CardFooter className="flex flex-wrap gap-2 pt-0">
                      {resource.tags.map(tag => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs rounded-full bg-secondary text-secondary-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </CardFooter>
                  </Card>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full flex justify-center py-12">
                <p className="text-muted-foreground">No resources found matching your criteria.</p>
              </div>
            )}
          </div>
        </Tabs>
      </main>
    </PageTransition>
  );
};

export default ResourcesPage;
