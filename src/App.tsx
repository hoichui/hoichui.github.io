import { Route, Switch } from "wouter";
import Home from "@/pages/Home";
import MovieDetail from "@/pages/MovieDetail";
import SeriesDetail from "@/pages/SeriesDetail";
import Categories from "@/pages/Categories";
import Search from "@/pages/Search";
import NotFound from "@/pages/not-found";
import { Toaster } from "@/components/ui/toaster";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/movie/:id" component={MovieDetail} />
      <Route path="/series/:id" component={SeriesDetail} />
      <Route path="/categories" component={Categories} />
      <Route path="/search" component={Search} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <>
      <Router />
      <Toaster />
    </>
  );
}

export default App;
