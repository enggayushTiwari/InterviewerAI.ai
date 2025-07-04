"use client"
import { useUser } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'
import { MockInterview } from '@/utils/schema';
import { desc, eq } from 'drizzle-orm';
import { db } from '@/utils/db';
import InterviewItemCard from './InterviewItemCard';

function InterviewList() {
  const { user } = useUser();
  const [interviewList, setInterviewList] = useState([]);

  useEffect(() => {
    if (user) GetInterviewList();
    // eslint-disable-next-line
  }, [user]);

  const GetInterviewList = async () => {
    const result = await db.select()
      .from(MockInterview)
      .where(eq(MockInterview.createdBy, user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(MockInterview.id));
    setInterviewList(result);
  }

  return (
    <div>
      <h2 className="font-semibold text-xl mb-4">Previous Mock Interviews</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {interviewList && interviewList.length > 0 ? (
          interviewList.map((interview, index) => (
            <InterviewItemCard interview={interview} key={index} />
          ))
        ) : (
          <div className="col-span-full text-gray-400 text-center py-8">
            No previous interviews found.
          </div>
        )}
      </div>
    </div>
  )
}

export default InterviewList
