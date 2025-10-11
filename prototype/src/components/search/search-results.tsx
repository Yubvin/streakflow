import { motion, AnimatePresence } from "motion/react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { FileText, Target, Search } from "lucide-react";

interface SearchResult {
  id: string;
  title: string;
  type: "habit" | "report";
  description?: string;
  streak?: number;
  icon?: string;
}

interface SearchResultsProps {
  query: string;
  results: SearchResult[];
  onClose: () => void;
}

export function SearchResults({ query, results, onClose }: SearchResultsProps) {
  if (!query.trim() && results.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.95 }}
        transition={{ 
          duration: 0.2,
          type: "spring",
          stiffness: 300,
          damping: 30
        }}
        className="absolute top-full left-0 right-0 mt-2 z-50"
      >
        <Card className="p-2 shadow-xl border-border backdrop-blur-sm bg-card/95 max-h-96 overflow-y-auto">
          {results.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Search className="w-8 h-8 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">No results found</p>
              <p className="text-xs text-muted-foreground mt-1">
                Try searching for habits or reports
              </p>
            </div>
          ) : (
            <div className="space-y-1">
              {/* Group by type */}
              {results.some(r => r.type === "habit") && (
                <div>
                  <div className="px-2 py-1 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    Habits
                  </div>
                  {results
                    .filter(r => r.type === "habit")
                    .map((result) => (
                      <motion.div
                        key={result.id}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/60 cursor-pointer transition-all duration-200 group"
                        whileHover={{ scale: 1.02, x: 4 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={onClose}
                      >
                        <div className="flex items-center gap-2">
                          {result.icon && (
                            <span className="text-lg group-hover:scale-110 transition-transform">
                              {result.icon}
                            </span>
                          )}
                          <Target className="w-4 h-4 text-primary group-hover:text-primary/80 transition-colors" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate group-hover:text-foreground/90">
                            {result.title}
                          </p>
                          <p className="text-xs text-muted-foreground group-hover:text-muted-foreground/80">
                            {result.description}
                          </p>
                        </div>
                        {result.streak !== undefined && (
                          <Badge variant="secondary" className="text-xs group-hover:bg-secondary/80 transition-colors">
                            {result.streak} day streak
                          </Badge>
                        )}
                      </motion.div>
                    ))}
                </div>
              )}

              {results.some(r => r.type === "report") && (
                <div>
                  <div className="px-2 py-1 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    Reports
                  </div>
                  {results
                    .filter(r => r.type === "report")
                    .map((result) => (
                      <motion.div
                        key={result.id}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/60 cursor-pointer transition-all duration-200 group"
                        whileHover={{ scale: 1.02, x: 4 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={onClose}
                      >
                        <FileText className="w-4 h-4 text-secondary group-hover:text-secondary/80 transition-colors" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate group-hover:text-foreground/90">
                            {result.title}
                          </p>
                          <p className="text-xs text-muted-foreground group-hover:text-muted-foreground/80">
                            {result.description}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                </div>
              )}
            </div>
          )}
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}