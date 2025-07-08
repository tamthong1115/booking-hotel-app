import { tailChase } from "ldrs";
tailChase.register();

interface PageSectionProps {
    isLoading: boolean;
}

export default function LoadingComponent({ isLoading }: PageSectionProps) {
    const renderLoadingState = () => {
        if (isLoading) {
            return (
                <div>
                    <l-tail-chase size="100" speed="1.75" color="black"></l-tail-chase>{" "}
                </div>
            );
        }
        return null;
    };

    return <div aria-busy={isLoading}>{renderLoadingState()}</div>;
}
