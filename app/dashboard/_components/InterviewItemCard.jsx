import { Button } from '@/components/ui/button'
import React from 'react'
import { useRouter } from 'next/navigation'


function InterviewItemCard({ interview }) {
  const router = useRouter();

  const onStart = () => {
    router.push('/dashboard/interview/' + interview.mockId + '/start');
  }

  const onFeedback = () => {
    router.push('/dashboard/interview/' + interview.mockId + '/feedback');
  }

  return (
    <div className="border shadow rounded-xl p-5 bg-white flex flex-col justify-between h-full">
      <div>
        <h2 className="font-bold text-primary text-lg mb-1">{interview?.jobPosition}</h2>
        <h3 className="text-sm text-gray-600 mb-1">{interview?.jobExperience} Years of Experience</h3>
        <h4 className="text-xs text-gray-400 mb-3">Created At: {interview.createdAt}</h4>
      </div>
      <div className="flex gap-3 mt-4">
        <Button
          size="sm"
          variant="outline"
          className="flex-1"
          onClick={onFeedback}
        >
          Feedback
        </Button>
        <Button
          size="sm"
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
          onClick={onStart}
        >
          Start
        </Button>
      </div>
    </div>
  )
}

export default InterviewItemCard
