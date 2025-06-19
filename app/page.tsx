// "use client";

// import { navItems } from "@/data";

// import Hero from "@/components/Hero";
// import Grid from "@/components/Grid";
// import Footer from "@/components/Footer";
// //import Clients from "@/components/Clients";
// import Approach from "@/components/Approach";
// import Experience from "@/components/Experience";
// import RecentProjects from "@/components/RecentProjects";
// import { FloatingNav } from "@/components/ui/FloatingNavbar";

// const Home = () => {
//   return (
//     <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
//       <div className="max-w-7xl w-full">
//         <FloatingNav navItems={navItems} />
//         <Hero />
//         <Grid />
//         {/* <RecentProjects /> */}
//         {/* <Clients /> */}
//         {/* <Experience /> */}
//         {/* <Approach /> */}
//         {/* <Footer /> */}
//       </div>
//     </main>
//   );
// };

// export default Home;

// In app/page.tsx
import { FloatingNav } from "@/components/ui/FloatingNavbar";
import { navItems } from "@/data";
import Hero from "@/components/Hero";
// DO NOT import Grid here anymore
// import Grid from "@/components/Grid";
import Footer from "@/components/Footer";
// import Clients from "@/components/Clients";
import Approach from "@/components/Approach";
import Experience from "@/components/Experience";
import RecentProjects from "@/components/RecentProjects";

// 1. Import 'dynamic' from 'next/dynamic'
import dynamic from "next/dynamic";

// 2. Create a dynamic version of the Grid component
const Grid = dynamic(() => import("@/components/Grid"), {
  ssr: false, // 3. This is the crucial part: ssr: false
});

const Home = () => {
  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      <div className="max-w-7xl w-full">
        <FloatingNav navItems={navItems} />
        <Hero />
        <Grid /> {/* 4. Use it just like a normal component */}
        <RecentProjects />
        {/* <Clients /> */}
        <Experience />
        <Approach />
        {/* <Footer /> */}
      </div>
    </main>
  );
};

export default Home;
