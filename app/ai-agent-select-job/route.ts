export async function POST(request: Request) {
  const { threadId, selectedJobIndex } = await request.json();
  const requestBody = { threadId, selectedJobIndex };

  const response = await fetch(
    `${process.env.AGENT_URL}/api/resume/selectJob`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    },
  );

  const result = await response.json();

  return new Response(JSON.stringify(result), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-cache",
    },
  });
}
