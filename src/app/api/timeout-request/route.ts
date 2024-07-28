export const POST = async (req: Request) => {
  const { timeout } = await req.json();
  await new Promise((res) =>
    setTimeout(() => res("complete"), parseInt(timeout)),
  );
  return Response.json({ status: "success" });
};
