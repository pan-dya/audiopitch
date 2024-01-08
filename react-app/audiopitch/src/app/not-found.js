import ErrorLayout from "@/components/layout/Error";
export default function NotFound() {
    return (
        <ErrorLayout code="404" message="Page not Found" href="/"/>
    )
}