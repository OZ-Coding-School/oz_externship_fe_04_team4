export function TableDataNone({ length }: { length: number }) {
  return (
    <tr>
      <td colSpan={length} className="px-4 py-8 text-center text-gray-500">
        데이터가 없습니다
      </td>
    </tr>
  )
}
