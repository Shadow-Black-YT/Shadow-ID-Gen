import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
    document.title = "Page Not Found — Shadow ID Gen";
  }, [location.pathname]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <article className="text-center max-w-md">
        <h1 className="text-8xl font-black gradient-text mb-4">404</h1>
        <h2 className="text-xl font-bold text-foreground mb-2">Page Not Found</h2>
        <p className="text-muted-foreground mb-8">
          The page you're looking for doesn't exist. Let's get you back to creating ID cards.
        </p>
        <div className="flex gap-3 justify-center">
          <Button asChild className="gradient-primary text-primary-foreground shadow-neon gap-2">
            <Link to="/"><Home className="w-4 h-4" /> Go Home</Link>
          </Button>
          <Button asChild variant="outline" className="gap-2">
            <Link to="/create"><ArrowLeft className="w-4 h-4" /> Create ID Card</Link>
          </Button>
        </div>
      </article>
    </main>
  );
};

export default NotFound;
