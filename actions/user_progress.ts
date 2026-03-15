"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

import db from "@/db/drizzle";
import { getCourseById, getUserProgress } from "@/db/queries";
import { userProgress } from "@/db/schema";
import { auth, currentUser } from "@clerk/nextjs/server";

export async function upsertUserProgress(courseId: number) {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId || !user) {
    throw new Error("Unauthorized");
  }

  const course = await getCourseById(courseId);
  if (!course) {
    throw new Error("Course not found");
  }

  const existingUserProgress = await getUserProgress();

  const values = {
    activeCourseId: courseId,
    userName: user.firstName || "User",
    userImageSrc: user.imageUrl || "/mascot.svg",
  };

  if (existingUserProgress) {
    await db.update(userProgress)
      .set(values)
      .where(eq(userProgress.userId, userId));
  } else {
    await db.insert(userProgress).values({
      userId,
      ...values,
    });
  }

  revalidatePath("/courses");
  revalidatePath("/learn");
  redirect("/learn");
}
