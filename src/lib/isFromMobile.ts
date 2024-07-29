export const isFromMobile = (userAgent: string | null) => {
  if (userAgent === null) throw new Error("User agent not valid");

  if (
    /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
      userAgent,
    )
  ) {
    return true;
  }

  return false;
};
