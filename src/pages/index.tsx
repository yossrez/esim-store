import Destinations from "@/components/destinations";
import TabFilter from "@/components/filters/tab-filter";
import BaseLayout from "@/components/layout/base-layout";
import ContentLayout from "@/components/layout/content-layout";
import Nav from "@/components/nav/indext";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const destinationTab = {
  filters: ["Populars", "Countries", "Regionals"],
  paramKey: "destination",
  fallback: "populars",
};

export default function PageMain() {
  return (
    <BaseLayout title="Home">
      <Nav />
      <ContentLayout>
        <main>
          <div className="flex items-center justify-center mt-6 rounded-lg h-96 bg-[linear-gradient(to_bottom,rgba(15,23,42,0.95),rgba(15,23,42,0.6)),url('/assets/images/hero/hero-bg.jpg')] bg-cover bg-center bg-no-repeat">
            <div className="flex flex-col items-center justify-center gap-12 h-full w-full p-5">
              <h1 className="lg:text-5xl sm:text-4xl text-2xl text-center font-semibold text-white">
                Find the best travel eSIM
                <br />
                for your next trip
              </h1>
              <Button
                variant="outline"
                className="h-11 w-full max-w-120 gap-5 cursor-text bg-gray-50"
                onClick={() => console.log("search")}
              >
                <span className="text-gray-600 font-medium sm:text-base text-xs">
                  Search for destination
                </span>
                <Search />
              </Button>
            </div>
          </div>
          <section>
            <TabFilter {...destinationTab} />
            <Destinations
              paramKey={destinationTab.paramKey}
              fallback={destinationTab.fallback}
            />
          </section>
        </main>
      </ContentLayout>
      <footer className="relative max-md:flex max-md:justify-center max-sm:hidden">
        <div className="bottom-0 absolute pt-2 pb-3 w-full px-10">
          <div className="flex md:flex-row flex-col justify-between items-center gap-3 lg:gap-7 max-ws">
            <span className="text-gray-800 md:text-base">
              &copy; 2026 eSIM-APP. All Rights Reserved.
            </span>
            <div className="flex gap-7 text-gray-800 md:text-base">
              {/*<Link href="#">*/}
              <span>Privacy</span>
              {/*</Link>*/}
              {/*<Link href="#">*/}
              <span>Terms</span>
              {/*</Link>*/}
            </div>
          </div>
        </div>
      </footer>
    </BaseLayout>
  );
}
