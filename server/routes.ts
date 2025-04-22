import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { mockContent, mockCategories } from "../client/src/lib/mockData";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all content
  app.get("/api/content", (_req, res) => {
    res.json(mockContent);
  });

  // Get content by ID
  app.get("/api/content/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const content = mockContent.find(item => item.id === id);
    
    if (!content) {
      return res.status(404).json({ message: "Content not found" });
    }
    
    res.json(content);
  });

  // Get all categories
  app.get("/api/categories", (_req, res) => {
    res.json(mockCategories);
  });

  // Get content by category
  app.get("/api/categories/:id/content", (req, res) => {
    const categoryId = parseInt(req.params.id);
    const category = mockCategories.find(cat => cat.id === categoryId);
    
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    
    // In a real app, this would filter based on the content_to_categories table
    // For mock purposes, we'll just filter by genre that matches category name
    const filteredContent = mockContent.filter(content => 
      content.genres?.includes(category.name)
    );
    
    res.json(filteredContent);
  });

  // Search content
  app.get("/api/search", (req, res) => {
    const query = req.query.q?.toString().toLowerCase() || "";
    
    if (!query) {
      return res.json([]);
    }
    
    const searchResults = mockContent.filter(content => {
      const searchTerms = query.split(" ");
      const contentTitle = content.title.toLowerCase();
      const contentDescription = content.description?.toLowerCase() || "";
      const contentGenres = content.genres?.join(" ").toLowerCase() || "";
      
      return searchTerms.some(term => 
        contentTitle.includes(term) || 
        contentDescription.includes(term) || 
        contentGenres.includes(term)
      );
    });
    
    res.json(searchResults);
  });

  // Get series episodes
  app.get("/api/series/:id/episodes", (req, res) => {
    const seriesId = parseInt(req.params.id);
    const series = mockContent.find(item => item.id === seriesId && item.type === "series");
    
    if (!series) {
      return res.status(404).json({ message: "Series not found" });
    }
    
    const episodes = mockContent.filter(
      item => item.type === "episode" && item.seriesId === seriesId
    );
    
    res.json(episodes);
  });

  const httpServer = createServer(app);
  return httpServer;
}
