export async function parseRequestBody(
  request: Request
): Promise<Record<string, unknown>> {
  const contentType = request.headers.get('content-type') ?? ''

  // JSON 요청 처리
  if (contentType.includes('application/json')) {
    return (await request.json()) as Record<string, unknown>
  }

  // FormData 요청 처리
  if (contentType.includes('multipart/form-data')) {
    const formData = await request.formData()
    const body: Record<string, unknown> = {}

    formData.forEach((value, key) => {
      body[key] = value
    })

    return body
  }

  // fallback
  try {
    return (await request.json()) as Record<string, unknown>
  } catch {
    return {}
  }
}
