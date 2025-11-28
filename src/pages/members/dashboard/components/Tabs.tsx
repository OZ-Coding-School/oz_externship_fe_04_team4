interface TabItem {
  key: string
  label: string
}

interface TabsProps {
  items: TabItem[]
  activeKey: string
  onChange: (key: string) => void
}

export default function Tabs({ items, activeKey, onChange }: TabsProps) {
  return (
    <div className="relative inline-flex gap-1 rounded-lg bg-[#F3F4F6] p-1">
      {items.map((item) => (
        <button
          key={item.key}
          onClick={() => onChange(item.key)}
          className={`${activeKey === item.key ? 'bg-white text-[#CA8A04] opacity-100' : 'pacity-60 text-[#4B5563]'} animate-fade-slide-left cursor-pointer rounded-lg px-4 py-2 text-sm shadow`}
        >
          {item.label}
        </button>
      ))}
    </div>
  )
}
