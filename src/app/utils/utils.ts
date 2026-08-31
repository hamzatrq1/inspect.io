export function isAtTop(): boolean {
  const threshold = 15;
  const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
  return scrollY <= threshold;
}

export function isAtBottom(): boolean {
  const threshold = 20;
  const windowHeight = window.innerHeight;
  const scrollY = window.scrollY || document.documentElement.scrollTop;
  const documentHeight = document.documentElement.scrollHeight;

  return windowHeight + scrollY >= documentHeight - threshold;
}

export function goToPage(isTransitioning: boolean, router: any, navigateTo: string): void {
  if (isTransitioning) {
    return;
  }

  setTimeout(() => {
    router.navigate([navigateTo]);
  }, 400);
}
