export async function POST(request: Request) {
  const { resumeText, job, jobType, jobLocation } = await request.json();
  const requestBody = { resumeText, job, jobType, jobLocation };

  const response = await fetch(
    `${process.env.AGENT_URL}/api/resume/startAgent`,
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

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const threadId = searchParams.get("threadId");

  const response = await fetch(
    `${process.env.AGENT_URL}/api/resume/getAgentStatus?threadId=${threadId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
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
