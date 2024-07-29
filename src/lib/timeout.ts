export const timeout = async (timeout: number) => {
  await new Promise((res) => setTimeout(() => res("complete"), timeout));
};
