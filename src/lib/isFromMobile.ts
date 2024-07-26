export const isFromMobile = (userAgent: string) => {
  if (
    /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
      userAgent,
    )
  ) {
    return true;
  }

  return false;
};
