import AppRouter from '@/app/router'
import Button from '@/components/common/Button'
import './App.css'

export default function App() {
  return (
    <>
      <AppRouter />
      <Button variant="close">닫기</Button>
      <Button variant="delete">삭제하기</Button>
      <Button variant="cancel">취소</Button>
      <Button variant="custom" className="bg-primary-green text-white">
        복구
      </Button>
      <Button variant="custom" className="bg-primary-blue text-white">
        수정하기
      </Button>
      <Button variant="custom" className="bg-primary-yellow text-white">
        적용하기
      </Button>
    </>
  )
}
