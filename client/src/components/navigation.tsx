import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";

export function Navigation() {
  const [location] = useLocation();
  const { isAuthenticated, user, logout } = useAuth();

  const isActive = (path: string) => location === path;

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" data-testid="link-home">
              <h1 className="text-xl font-bold gradient-text cursor-pointer">
                Sports Talent Assessment
              </h1>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link href="/" data-testid="link-home-nav">
                <span className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-muted transition-colors cursor-pointer ${
                  isActive('/') ? 'bg-muted' : ''
                }`}>
                  Home
                </span>
              </Link>
              {isAuthenticated && (
                <Link href="/features" data-testid="link-features">
                  <span className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-muted transition-colors cursor-pointer ${
                    isActive('/features') ? 'bg-muted' : ''
                  }`}>
                    Features
                  </span>
                </Link>
              )}
              {!isAuthenticated ? (
                <Link href="/login" data-testid="link-login">
                  <span className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-muted transition-colors cursor-pointer ${
                    isActive('/login') ? 'bg-muted' : ''
                  }`}>
                    Login
                  </span>
                </Link>
              ) : (
                <button
                  onClick={logout}
                  data-testid="button-logout"
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-muted transition-colors"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
