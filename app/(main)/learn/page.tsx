import { redirect } from "next/navigation";

//import { Promo } from "@/components/promo";
//import { Quests } from "@/components/quests";
import { FeedWrapper } from "@/components/feed_wrapper";
import { UserProgress } from "@/components/user_progress";
import { StickyWrapper } from "@/components/sticky_wrapper";
import { lessons, units as unitsSchema } from "@/db/schema";
import { 
  //getCourseProgress, 
  //getLessonPercentage, 
  getUnits, 
  getUserProgress,
  //getUserSubscription
} from "@/db/queries";

// import { Unit } from "./unit";
import { Header } from "./header";


  const LearnPage = async () => {
  const userProgressData = getUserProgress();
  
 const [
    userProgress,
  ] = await Promise.all([
    userProgressData,
    
  ]);

  if (!userProgress || !userProgress.activeCourse) {
    redirect("/courses");
  }

    return (
          <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={false}/>
        </StickyWrapper>
        <FeedWrapper>
        <Header title={userProgress.activeCourse.title} />
        </FeedWrapper>
      </div>
    );
  };
  
  export default LearnPage;