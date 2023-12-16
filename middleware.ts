export { default } from "next-auth/middleware";
export const config = {
  matcher: ["/stories/new", "/stories/edit/:id+"],
};
