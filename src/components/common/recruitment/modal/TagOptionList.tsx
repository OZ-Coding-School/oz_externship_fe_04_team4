import { Check } from 'lucide-react'

const tags = [
  'React',
  'Vue.js',
  'Angular',
  'JavaScript',
  'TypeScript',
  'Spring Boot',
  'Node.js',
  'Express',
  'NextJS',
  'Java',
  'Python',
  'Django',
  'FastAPI',
  'Flask',
  'PHP',
  'Docker',
  'Kubernetes',
  'AWS',
  'Azure',
  'GCP',
  'FrontEnd',
  'Backend',
  'Full Stack',
  'DevOps',
  'AI',
  'ML',
  '데이터분석',
  '데이터사이언스',
  '웹개발',
  '모바일',
  '실무',
  '프로젝트',
  '포트폴리오',
  '취업',
  '신입',
  '경력',
  '온라인',
  '오프라인',
  '주말',
  '평일',
]

export default function TagOptionList() {
  return (
    <div className="h-96 w-full overflow-scroll border-b border-[#E5E7EB] p-6">
      <div className="flex flex-wrap justify-between">
        {tags.map((el) => (
          <div
            key={el}
            className="mb-2 flex h-[38px] w-[202px] cursor-pointer items-center justify-between rounded-lg border border-[#D1D5DB] px-2 py-3 hover:border-[#FDE047] hover:bg-[#FEF9C3] hover:text-[#854D0E] active:font-bold"
          >
            {el}
            <Check className="w-4 text-[#CA8A04]" />
          </div>
        ))}
      </div>
    </div>
  )
}
